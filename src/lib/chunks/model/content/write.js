import fs from 'fs'
import ChunkIndex from '../index/index.js'
import ChunkTriggers from '../../triggers/index.js'
import updateProtocolClasses from '../../../actions/updateProtocolClasses/index.js'

export default async (props = {}) => {
  const {
    destination = CliNext.payload.destination,
    targetProtocolPath = CliNext.payload.protocolPath,
    className = CliNext.payload.className,
  } = props

  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })


  await ChunkIndex.write({ destination })
  await ChunkTriggers.write({ destination })

  // Register the new class in the target protocol's schema.json - unconditional, there's no
  // "version" left to conditionally upgrade under unischema (see
  // .docs/technical/unischema-plan.md and updateProtocolClasses/index.js). This used to live in
  // a separate write.withprotocol.js variant, gated behind an `upgradeProtocolSchemaVersion`
  // flag nothing ever actually set, and which itself wrote to the now-deleted
  // schema/<version>/index.json path - that file was silently orphaned by a chunk-wiring change
  // that pointed here instead, so `model add` scaffolded a class's files but never registered
  // it. Folded the real behavior into this one live write path rather than keeping two.
  if (targetProtocolPath) {
    const schema = await updateProtocolClasses({ className, targetProtocolPath })
    fs.writeFileSync(`${targetProtocolPath}/schema.json`, JSON.stringify(schema, null, 2) + '\n')
  }
}
