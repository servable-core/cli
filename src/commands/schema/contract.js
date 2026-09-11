import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { compileArtifact, plan as computePlan } from '@servable/tools'
import loadServableConfig, { ARTIFACT_FILENAME } from '../../lib/schema/loadServableConfig.js'
import readArtifact from '../../lib/schema/readArtifact.js'

// The only command in this whole surface allowed to remove anything - see decision #1 in
// .docs/technical/unischema-plan.md. A field/class can only be contracted if it was already
// marked `deprecated: true` in the schema.json it's being removed from (checked against the
// PREVIOUS committed artifact, `before` - not the fresh build, since the point is "this had
// already been flagged for a prior release," not "I just flagged it and I'm removing it in the
// same breath"). `--force` bypasses that check for a field known to be safe regardless (e.g.
// added and removed within the same release, never actually deployed) - every contract still
// requires --reason regardless of --force.
//
// This is the one command that bumps compatibilityFloor - it's the whole point of the floor
// (decision #1/#7): a pod built against the old, larger schema is no longer safe to boot once
// this runs, and the floor is what makes it refuse to, instead of booting and silently
// misbehaving against fields that no longer exist.
//
// The bump is written into servable.schema.json only - this command never touches a database.
// The running server reads compatibilityFloor off the committed artifact at boot and is what
// actually persists it to ServableSchemaState (server-unischema's own boot check does both the
// refuse-if-too-old comparison and the write, in one place, rather than splitting "decide" and
// "record" between a CLI tool and the server).
export default ({
  _clinextType: 'command',
  name: 'contract',
  description: 'Remove a deprecated field/class and bump the compatibility floor - the only destructive command ⚠️',
  questions: [
    {
      name: 'reason',
      type: 'string',
      description: 'Why this removal is safe now (recorded in the artifact for CI/review)',
    },
    {
      name: 'force',
      type: 'boolean',
      description: 'Allow removing a field/class that was never marked deprecated',
    },
  ],
  example: "$0 schema contract --reason=\"superseded by nature, deprecated since 2026-08\"",
  handler: async ({ reason, force } = {}) => {
    if (!reason) {
      console.error(chalk.bold.red(`✖ --reason is required - every contraction is recorded, not silent.`))
      process.exit(1)
    }

    const servableConfig = await loadServableConfig()
    const before = readArtifact()
    if (!before) {
      console.error(chalk.bold.red(`✖ No ${ARTIFACT_FILENAME} committed yet - nothing to contract against. Run 'schema build' first.`))
      process.exit(1)
    }

    const after = await compileArtifact({ servableConfig })
    const result = computePlan({ before, after })

    if (!result.breaking.length && !result.breakingDeprecated.length) {
      console.log(chalk.dim('No breaking changes to contract - nothing to do (use `schema apply` for additive changes).'))
      return
    }

    if (result.breaking.length && !force) {
      console.error(chalk.bold.red(`\n✖ ${result.breaking.length} removal(s) were never marked deprecated - contract refuses by default:`))
      result.breaking.forEach(c => console.error('  ' + chalk.red(`${c.className}${c.fieldName ? '.' + c.fieldName : ''}`)))
      console.error(chalk.dim(`\nMark them "deprecated": true in a prior release first, or pass --force if you're certain (e.g. never actually deployed).`))
      process.exit(1)
    }

    const allRemovals = [...result.breaking, ...result.breakingDeprecated]

    const outPath = path.resolve(process.cwd(), ARTIFACT_FILENAME)
    const annotated = {
      ...after,
      breakingChanges: [
        ...(before.breakingChanges || []),
        ...allRemovals.map(c => ({
          className: c.className,
          fieldName: c.fieldName || null,
          kind: c.kind,
          reason,
          // Only ever true for an item that reached here via --force (result.breaking is
          // exactly the not-pre-deprecated set; breakingDeprecated items were legitimately
          // eligible without --force at all).
          forced: result.breaking.includes(c),
          appliedAt: new Date().toISOString(),
        })),
      ],
    }
    const newFloor = (before.compatibilityFloor || 0) + 1
    annotated.compatibilityFloor = newFloor
    fs.writeFileSync(outPath, JSON.stringify(annotated, null, 2) + '\n')

    console.log(chalk.bold.yellow(`✓ Contracted ${allRemovals.length} item(s). compatibilityFloor -> ${newFloor} (recorded in ${ARTIFACT_FILENAME}). Deploying this makes any pod older than the new floor refuse to boot - see server-unischema's boot check.`))
  },
})
