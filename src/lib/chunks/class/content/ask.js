import ChunkIndex from '../index/index.js'
import ChunkTriggers from '../../triggers/index.js'

export default async (props) => {
  await CliNext.prompt.ask([
    {
      name: 'featurePath',
    },
  ])

  let passes = false

  passes = await ChunkIndex.ask()
  CliNext.payload.destination = `${CliNext.payload.featurePath}/classes/${CliNext.payload.className.toLowerCase()}`

  passes = await ChunkTriggers.ask()

  // await CliNext.prompt.ask([
  //   {
  //     name: 'classBootstrapFiles',
  //     promptType: 'confirm',
  //   },
  // ])

  return passes
}
