import chalk from 'chalk'
import { compileArtifact, plan as computePlan } from '@servable/tools'
import loadServableConfig, { ARTIFACT_FILENAME } from '../../lib/schema/loadServableConfig.js'
import readArtifact from '../../lib/schema/readArtifact.js'

// Diffs the committed servable.schema.json (the "before") against what `schema build` would
// produce right now (the "after") - no database involved, which is what makes this usable as a
// CI gate (decision #2: run in .husky/pre-push locally, and in
// scripts/docker/{staging,production}/build.sh server-side, both calling this same command).
//
// `--ci` exits non-zero on any breaking change with no exception, for the build-script use.
// Without it, this is just a report - `schema apply` (at boot) is what actually decides whether
// to proceed, and it always refuses breaking changes regardless of how this was invoked.
const describeChange = (c) => {
  const where = c.className + (c.fieldName ? `.${c.fieldName}` : c.indexName ? ` (index ${c.indexName})` : '')
  switch (c.kind) {
    case 'classAdded': return `+ ${c.className}`
    case 'classRemoved': return `- ${c.className}`
    case 'added': return `+ ${where}`
    case 'removed': return `- ${where}${c.deprecated ? ' (was deprecated)' : ''}`
    case 'typeChanged': return `~ ${where}  ${c.from} → ${c.to}`
    case 'targetClassChanged': return `~ ${where}  targetClass ${c.from} → ${c.to}`
    case 'becameRequired': return `~ ${where}  became required`
    case 'deprecationFlagChanged': return `~ ${where}  deprecated flag changed`
    case 'indexAdded': return `+ index ${where}`
    case 'indexRemoved': return `- index ${where}`
    case 'indexChanged': return `~ index ${where}`
    case 'classLevelPermissionsChanged': return `~ ${c.className}  classLevelPermissions changed`
    default: return `? ${c.kind} ${where}`
  }
}

export default ({
  _clinextType: 'command',
  name: 'plan',
  description: 'Diff the committed schema artifact against the current protocol sources 🔍',
  questions: [
    {
      name: 'ci',
      type: 'boolean',
      description: 'Exit non-zero on any breaking change (for use in a build/CI step)',
    },
  ],
  example: "$0 schema plan --ci",
  // clinext does NOT pass flags as top-level handler args - it passes { toolbox }, with the parsed
  // flags under toolbox.payload (confirmed by logging the real argument on 2026-09-14). The
  // previous `({ ci } = {})` destructuring therefore always read undefined: `--ci` never reached this
  // handler, so the build-script gate never failed on anything - not drift, not even breaking changes.

  /**
   * @param {{ toolbox?: { payload?: { ci?: boolean } } }} [props] - the real shape
   *  @clinext/sdk calls handlers with; see this file's own comment above for why.
   */
  handler: async ({ toolbox } = {}) => {
    const { ci } = toolbox?.payload || {}
    const servableConfig = await loadServableConfig()
    const before = readArtifact()
    const after = await compileArtifact({ servableConfig })

    const result = computePlan({ before, after })

    if (!result.hashChanged) {
      console.log(chalk.dim('No schema changes.'))
      return
    }

    if (result.safe.length) {
      console.log(chalk.bold.green(`\nSAFE (${result.safe.length}) - applies automatically:`))
      result.safe.forEach(c => console.log('  ' + chalk.green(describeChange(c))))
    }

    if (result.breakingDeprecated.length) {
      console.log(chalk.bold.yellow(`\nBREAKING, pre-deprecated (${result.breakingDeprecated.length}) - eligible for 'schema contract':`))
      result.breakingDeprecated.forEach(c => console.log('  ' + chalk.yellow(describeChange(c))))
    }

    if (result.breaking.length) {
      console.log(chalk.bold.red(`\nBREAKING, not deprecated (${result.breaking.length}) - never applied automatically:`))
      result.breaking.forEach(c => console.log('  ' + chalk.red(describeChange(c))))
    }

    console.log('')

    // ANY change reaching this line means the committed artifact no longer matches the sources -
    // the `!result.hashChanged` early return above already covered the only in-sync case. That
    // mismatch is precisely what the server's boot check (checkSchemaCompatibility.js) hard-fails
    // on, safe or breaking alike, so CI has to refuse it too: an image whose artifact disagrees
    // with its own sources cannot start, and letting it build only moves the failure from the
    // build to the rollout, after every check has already gone green.
    //
    // "Safe vs breaking" is the right question for `apply` (may this be written automatically?)
    // and the wrong question here (can this image boot at all?). Gating on breaking changes alone
    // is what let a safe, unbuilt `+ _User.idiom` through a real production build on 2026-09-14;
    // only the operator aborting the run by hand kept the stale artifact out of production.
    if (ci) {
      if (result.hasBreakingChanges) {
        console.error(chalk.bold.red(`✖ ${result.breaking.length + result.breakingDeprecated.length} breaking change(s), failing.`))
      } else {
        console.error(chalk.bold.red(`✖ ${ARTIFACT_FILENAME} is out of date - run 'servable schema apply' and commit the result.`))
        console.error(chalk.red(`  Every change above is safe, but the server refuses to boot on ANY mismatch, so this build could not start.`))
      }
      process.exit(1)
    }
  },
})
