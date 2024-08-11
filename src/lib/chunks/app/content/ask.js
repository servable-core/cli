import search from './lib/api/search.js'
import getEngineById from './lib/api/getById.js'

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
    name: 'engineId',
    suggestOnly: false,
    searchText: 'Searching...',
    emptyText: 'Nothing found!',
    source: search,
    pageSize: 10,
  })

  const engine = await getEngineById({
    id: CliNext.payload['engineId'],
  })

  if (!engine) {
    console.log('Could not find adapter in registry.')
    return false
  }

  CliNext.payload._adapter = engine
  const { index } = engine
  const hasUsage = (
    engine
    && engine.index
    && engine.index.usage
    && engine.index.usage.parameters
    && engine.index.usage.parameters.length
  )

  if (hasUsage) {
    CliNext.ui.drawSectionHeader({
      title: `${index.id} parameters`,
      subTitle: `Fill this framework specific parameters.`
    })
    await CliNext.prompt.ask(engine.index.usage.parameters)
    CliNext.ui.drawSectionHeader({
      title: `---`,
    })
  }

  return true
}
