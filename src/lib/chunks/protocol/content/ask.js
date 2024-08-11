import ChunkIndex from '../index/index.js'
import ChunkTriggers from '../../triggers/index.js'

export default async (props) => {
  let passes = false

  passes = await ChunkIndex.ask()
  passes = await ChunkTriggers.ask()
  return passes
}




