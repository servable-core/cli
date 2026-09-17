import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { buildSchema, buildProtocolResources, generateProtocolResourceTypes } from '@servable/tools'
import loadServableConfig from '../../lib/schema/loadServableConfig.js'

export const PROTOCOL_TYPES_FILENAME = 'servable.protocols.types.d.ts'

// lucide 0.6 (protocol-resources), PEAKUB DX initiative - sibling to `schema types`, but reads
// live protocol files (services/, jobs/) rather than the committed servable.schema.json
// artifact. Unlike classes, a protocol's services/jobs aren't part of that artifact at all (there
// was never a reason to put them there - nothing at runtime needs a precomputed list of them,
// they're discovered by wireSchema at boot the same way this command discovers them here) - so
// this command runs a real (but boot-cheap, CLI-only, never-at-server-boot) `buildSchema()` call
// itself, purely to get its `protocols` array (each with `.loader.path`), then does its own
// separate services/jobs scan over that - see @servable/tools' buildProtocolResources() for why
// this is deliberately NOT folded into buildSchema()/servable.schema.json itself.
export default ({
  _clinextType: 'command',
  name: 'protocol-types',
  description: `Generate TypeScript interfaces (${PROTOCOL_TYPES_FILENAME}) for every protocol's services/jobs 🔌`,
  questions: [
  ],
  example: '$0 schema protocol-types',
  handler: async () => {
    const servableConfig = await loadServableConfig()
    const { protocols } = await buildSchema({ servableConfig })
    const resources = await buildProtocolResources({ protocols })

    const types = generateProtocolResourceTypes(resources)
    const outPath = path.resolve(process.cwd(), PROTOCOL_TYPES_FILENAME)
    fs.writeFileSync(outPath, types)

    const serviceCount = Object.values(resources).reduce((sum, r) => sum + r.services.length, 0)
    const jobCount = Object.values(resources).reduce((sum, r) => sum + r.jobs.length, 0)
    console.log(
      chalk.bold.green(`✓ ${PROTOCOL_TYPES_FILENAME} written`),
      chalk.dim(`(${serviceCount} services, ${jobCount} jobs across ${Object.keys(resources).length} protocols)`)
    )
  },
})
