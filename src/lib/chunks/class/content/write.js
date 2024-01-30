import ChunkIndex from '../index/index.js'
import ChunkTriggers from '../../triggers/index.js'


export default async (props = {}) => {
  const { destination = CliNext.payload.destination } = props

  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })


  await ChunkIndex.write({ destination })
  await ChunkTriggers.write({ destination })
}
