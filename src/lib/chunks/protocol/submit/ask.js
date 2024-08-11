import protocolIndex from "../../../newactions/protocolIndex.js"
import create from "./lib/create.js"
import update from './lib/update.js'

export default async () => {

  await CliNext.prompt.ask([
    {
      name: 'protocolPath',
    },
  ])

  const index = await protocolIndex(CliNext.payload.protocolPath)
  CliNext.payload._protocolIndex = index

  if (!index || !index.registry || !index.registry.id) {
    return create({ index })
  }

  console.log(`Your protocol ${index.id} has already been submitted as ${index.registry.id}`)
  if ((await CliNext.prompt.ask({
    name: 'registryUpdate',
  }

  ))) {
    return update({ index })
  }

  return false
}
