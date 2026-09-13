import ChunkIndex from '../index/index.js'
import ChunkTriggers from '../../triggers/index.js'

export default async (props = {}) => {
  const { destination = CliNext.payload.destination } = props

  CliNext.payload.protocolDescription = CliNext.payload.protocolDescription ? CliNext.payload.protocolDescription : ''
  CliNext.payload.author = CliNext.payload.author ? CliNext.payload.author : ''

  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })

  await ChunkIndex.write({ destination })
  // Triggers a protocol contributes to its host class belong under target/triggers/,
  // not the protocol root - confirmed against @servable/tools's protocolLoader (v1.1.0.js),
  // which only reads target/triggers/ and models/<name>/triggers/, never a bare root triggers/.
  await ChunkTriggers.write({ destination: `${destination}/target` })
}
