import ChunkIndex from '../index/index.js'
import ChunkTriggers from '../../triggers/index.js'

export default async (props) => {
  await CliNext.prompt.ask([
    {
      name: 'protocolPath',
    },
  ])

  let passes = false

  passes = await ChunkIndex.ask()
  // The protocolLoader (v1.1.0.js) reads owned classes from models/<name>/, not classes/<name>/.
  CliNext.payload.destination = `${CliNext.payload.protocolPath}/models/${CliNext.payload.className.toLowerCase()}`

  passes = await ChunkTriggers.ask()

  // await CliNext.prompt.ask([
  //   {
  //     name: 'classBootstrapFiles',
  //     promptType: 'confirm',
  //   },
  // ])

  return passes
}
