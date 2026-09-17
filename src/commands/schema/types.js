import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { generateSchemaTypes } from '@servable/tools'
import readArtifact from '../../lib/schema/readArtifact.js'
import { ARTIFACT_FILENAME } from '../../lib/schema/loadServableConfig.js'

export const TYPES_FILENAME = 'servable.schema.types.d.ts'

// lucide (PEAKUB DX initiative), sibling to unischema (PEAKUB-321): servable.schema.json
// already fully describes every class and field - this reads the committed artifact (no
// database, no protocol re-resolution, same "local files only" contract as plan/build/apply)
// and emits a .d.ts interface per class, so `object.get('caption')`/`object.set(...)` gets
// real autocomplete and a typo in a field name gets flagged.
//
// Reads the *committed* artifact deliberately, not a fresh build: this command's only job is
// turning already-agreed-upon schema into types, the same way `plan`'s drift check treats the
// committed artifact as the thing to compare against, not something to silently recompute.
// Run `servable schema build` first if the artifact is out of date - `schema plan --ci` catches
// that regardless.
export default ({
  _clinextType: 'command',
  name: 'types',
  description: `Generate TypeScript interfaces (${TYPES_FILENAME}) for every class in the committed schema artifact 🧬`,
  questions: [
  ],
  example: '$0 schema types',
  handler: async () => {
    const artifact = readArtifact()
    if (!artifact) {
      console.error(chalk.bold.red(`✗ No ${ARTIFACT_FILENAME} found.`), `Run 'servable schema build' first.`)
      process.exit(1)
      return
    }

    const types = generateSchemaTypes(artifact)
    const outPath = path.resolve(process.cwd(), TYPES_FILENAME)
    fs.writeFileSync(outPath, types)

    console.log(chalk.bold.green(`✓ ${TYPES_FILENAME} written`), chalk.dim(`(${artifact.classes.length} classes)`))
  },
})
