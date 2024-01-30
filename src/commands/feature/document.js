import { documentFeature } from '@servable/tools'

export default ({
  _clinextType: "command",
  name: 'document',
  description: 'Generate feature documentation 🐝',
  options: [
    {
      name: 'featurePath',
      message: "Feature to document",
    },
  ],
  example: "$0 feature eject",
  handler: async () => {
    await CliNext.prompt.ask([
      {
        name: 'featurePath',
      },
    ])
    await documentFeature({
      path: CliNext.payload.featurePath,
      write: true
    })
  },
})
