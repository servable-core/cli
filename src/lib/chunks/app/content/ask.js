import search from './lib/api/search.js'
import getById from './lib/api/getById.js'

export default async () => {

  CliNext.ui.drawSectionHeader({
    type: 'h2',
    title: `App informations 🚀`,
    subTitle: `Servable required general informations.`
  })

  await CliNext.prompt.ask([
    {
      name: 'appPort',
    },
    {
      name: 'destination',
    },
    {
      name: 'appName',
    },
    {
      name: 'license',
    },
    {
      name: 'packageManager',
    },
    {
      name: 'gitInit',
    },
  ])

  await CliNext.prompt.ask({
    name: 'bridgeframeworkId',
    suggestOnly: false,
    searchText: 'Searching...',
    emptyText: 'Nothing found!',
    source: search,
    pageSize: 10,
  })

  const item = await getById({ id: CliNext.payload['bridgeframeworkId'], })
  if (!item) {
    console.log('Could not find adapter in registry.')
    return false
  }

  CliNext.payload._adapter = item
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




