import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { compileArtifact, plan as computePlan } from '@servable/tools'
import loadServableConfig, { ARTIFACT_FILENAME } from '../../lib/schema/loadServableConfig.js'
import readArtifact from '../../lib/schema/readArtifact.js'

// `apply` never talks to Parse's schema API, and never touches a database - the running server
// does both itself at boot (Parse's own additive convergence, and the compatibilityFloor
// bookkeeping - see .docs/technical/unischema-plan.md and server-unischema's own boot check).
// This command is purely local: refuse if the artifact contains ANY breaking change (apply is
// additive-only, unconditionally), then rewrite servable.schema.json. compatibilityFloor and
// breakingChanges are carried forward untouched - only `schema contract` ever changes them.
export default ({
  _clinextType: 'command',
  name: 'apply',
  description: 'Build and commit a schema artifact - refuses any breaking change 🚀',
  questions: [
  ],
  example: "$0 schema apply",
  handler: async () => {
    const servableConfig = await loadServableConfig()
    const before = readArtifact()
    const after = await compileArtifact({ servableConfig })
    const result = computePlan({ before, after })

    if (result.hasBreakingChanges) {
      console.error(chalk.bold.red(`✖ Breaking changes present - apply only ever applies safe, additive changes. Run 'schema plan' to see them, and 'schema contract' if a removal was already deprecated.`))
      process.exit(1)
    }

    const outArtifact = {
      ...after,
      compatibilityFloor: before?.compatibilityFloor || 0,
      breakingChanges: before?.breakingChanges || [],
    }

    const outPath = path.resolve(process.cwd(), ARTIFACT_FILENAME)
    fs.writeFileSync(outPath, JSON.stringify(outArtifact, null, 2) + '\n')

    console.log(chalk.bold.green(`✓ Applied - ${result.safe.length} safe change(s), hash ${outArtifact.hash.slice(0, 12)}`))
  },
})
