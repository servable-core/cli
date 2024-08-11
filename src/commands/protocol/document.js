import { documentProtocol } from '@servable/tools'

export default ({
  _clinextType: "command",
  name: 'document',
  description: 'Generate protocol documentation 🐝',
  questions: [
    {
      name: 'protocolPath',
      message: "Protocol to document",
    },
  ],
  example: "$0 protocol eject",
  handler: async () => {
    await CliNext.prompt.ask([
      {
        name: 'protocolPath',
      },
    ])
    await documentProtocol({
      path: CliNext.payload.protocolPath,
      write: true
    })
  },
})
