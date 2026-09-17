import ChunkIndex from '../index/index.js'
import ChunkReleaseType from '../../releaseType/index.js'
import ChunkPackageManager from '../../packageManager/index.js'
import ChunkGit from '../../gitInit/index.js'

export default async ({ askIndex = false } = {}) => {
  // Not all of these Chunk*.ask() calls actually return a boolean (found via checkJs) -
  // `passes` is last-write-wins regardless (each assignment replaces the previous one, never
  // combined), so this was already effectively "return whatever the last chunk resolves to".
  // `any` here is honest about that, rather than a per-line suppression pretending each
  // assignment is individually meaningful.
  /** @type {any} */
  let passes = false

  if (askIndex) {
    passes = await ChunkIndex.ask()
  }

  passes = await ChunkReleaseType.ask()
  passes = await ChunkPackageManager.ask()
  passes = await ChunkGit.ask()
  return passes
}
