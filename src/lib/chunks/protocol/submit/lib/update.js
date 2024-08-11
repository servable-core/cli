import uniqueRefExists from './uniqueRefExists.js'

export default async (props) => {
  const { index } = props
  CliNext.payload.registrySubmitMode = 'update'

  if (!index || !index.registry || !index.registry.id) {
    return true
  }

  CliNext.payload.registryUniqueRef = index.registry.id

  const exists = await uniqueRefExists({ protocolId: CliNext.payload.registryUniqueRef })
  if (!exists) {
    console.log(`The protocol with the id ${index.id} has already been submitted but can't be found. Please retry later.`)
    return false
  }

  return true
}
