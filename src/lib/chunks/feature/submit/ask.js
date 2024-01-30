import featureIndex from "../../../newactions/featureIndex.js"
import create from "./lib/create.js"
import update from './lib/update.js'

export default async () => {

  await CliNext.prompt.ask([
    {
      name: 'featurePath',
    },
  ])

  const index = await featureIndex(CliNext.payload.featurePath)
  CliNext.payload._featureIndex = index

  if (!index || !index.registry || !index.registry.id) {
    return create({ index })
  }

  console.log(`Your feature ${index.id} has already been submitted as ${index.registry.id}`)
  if ((await CliNext.prompt.ask({
    name: 'registryUpdate',
  }

  ))) {
    return update({ index })
  }

  return false
}
