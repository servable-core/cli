import ChunkIndex from '../index/index.js'
import ChunkReleaseType from '../../releaseType/index.js'
import ChunkPackageManager from '../../packageManager/index.js'
import ChunkGit from '../../gitInit/index.js'

export default async ({ askIndex = false } = {}) => {
  let passes = false

  if (askIndex) {
    passes = await ChunkIndex.ask()
  }

  passes = await ChunkReleaseType.ask()
  passes = await ChunkPackageManager.ask()
  passes = await ChunkGit.ask()
  return passes
}
