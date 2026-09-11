import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { compileArtifact } from '@servable/tools'
import loadServableConfig, { ARTIFACT_FILENAME } from '../../lib/schema/loadServableConfig.js'
import readArtifact from '../../lib/schema/readArtifact.js'

// This is the correctly-written implementation the previously-orphaned
// src/lib/actions/generateSchema/index.js was meant to be - see decision #6 in
// .docs/technical/unischema-plan.md. That file called buildSchema() correctly but was never
// imported by any command; this command supersedes it.
export default ({
  _clinextType: 'command',
  name: 'build',
  description: `Compile the app's schema artifact (${ARTIFACT_FILENAME}) from every protocol's schema.json 🏗️`,
  questions: [
  ],
  example: "$0 schema build",
  handler: async () => {
    const servableConfig = await loadServableConfig()
    const previous = readArtifact()
    const artifact = await compileArtifact({ servableConfig })

    // compatibilityFloor and breakingChanges are persistent state, not derived schema content -
    // they are not part of compileArtifact()'s hash (see schema/artifact/index.js) and must be
    // carried forward across ordinary rebuilds. Only `schema contract` ever changes the floor;
    // a plain `build` (or `apply`) preserves whatever was already committed.
    const outArtifact = {
      ...artifact,
      compatibilityFloor: previous?.compatibilityFloor || 0,
      breakingChanges: previous?.breakingChanges || [],
    }

    const outPath = path.resolve(process.cwd(), ARTIFACT_FILENAME)
    fs.writeFileSync(outPath, JSON.stringify(outArtifact, null, 2) + '\n')

    console.log(chalk.bold.green(`✓ ${ARTIFACT_FILENAME} written`), chalk.dim(`(${artifact.classes.length} classes, hash ${artifact.hash.slice(0, 12)})`))
  },
})
