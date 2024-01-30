import uniqueRefExists from './uniqueRefExists.js'

export default async (props) => {
  const { index } = props
  CliNext.payload.registrySubmitMode = 'create'

  const { id } = index

  const exists = await uniqueRefExists({ featureId: id })
  if (exists) {
    console.log(`A feature with the id ${index.id} has already been submitted. Please change the feature id.`)
    return false
  }

  CliNext.payload.registryUniqueRef = id
  return true
}
