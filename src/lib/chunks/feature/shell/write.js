import ChunkIndex from '../index/index.js'
import ChunkReleaseType from '../../releaseType/index.js'
import ChunkPackageManager from '../../packageManager/index.js'
import ChunkGit from '../../gitInit/index.js'

export default async (props = {}) => {
  const {
    destination = CliNext.payload.destination,
    askIndex = false
  } = props
  CliNext.payload.author = CliNext.payload.author ? CliNext.payload.author : ''

  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })

  if (askIndex) {
    await ChunkIndex.write({ destination: `${destination}/src` })
  }

  await ChunkReleaseType.write({ destination })
  await ChunkPackageManager.write({ destination })
  if (CliNext.payload.gitInit) {
    await ChunkGit.write({
      destination,
      useDefaultGitgnore: false
    })
  }
  return true
}
