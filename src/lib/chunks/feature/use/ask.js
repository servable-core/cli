import search from './lib/api/search.js'
import getById from './lib/api/getById.js'

export default async () => {
  await CliNext.prompt.ask([
    {
      name: 'appPath',
    },
  ])

  await CliNext.prompt.ask([
    {
      name: 'classPath',
      root: `${CliNext.payload.appPath}`
    },
  ])

  await CliNext.prompt.ask({
    name: 'featureIdAutoComplete',
    suggestOnly: false,
    searchText: 'Searching...',
    emptyText: 'Nothing found!',
    source: search,
    pageSize: 10,
  })

  const item = await getById({ id: CliNext.payload['featureIdAutoComplete'], })
  if (!item) {
    console.log('Could not find feature in registry.')
    return false
  }

  CliNext.payload._communityFeatureToUse = item
  const { index } = item
  const hasUsage = (item && item.index && item.index.usage && item.index.usage.parameters && item.index.usage.parameters.length)
  if (hasUsage) {
    CliNext.ui.drawSectionHeader({
      title: `${index.id} parameters`,
      subTitle: `Fill this framework specific parameters.`
    })
    await CliNext.prompt.ask(item.index.usage.parameters)
    CliNext.ui.drawSectionHeader({
      title: `---`,
    })
  }

  return true
}




