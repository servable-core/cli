import ChunkProtocolContent from '../../lib/chunks/protocol/content/index.js'

export default ({
  _clinextType: "command",
  name: 'schema',
  description: 'Generate schema documentation 🐝',
  questions: [
    {
      name: 'appPath',
      message: "App to add a protocol to",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'protocolId',
      validators: [{
        id: 'nonEmpty'
      }]
    },
    {
      name: 'protocolDescription',
    },

    {
      name: 'license',
    },
  ],
  example: "$0 protocol eject",
  handler: async () => {
    await CliNext.prompt.ask([
      {
        name: 'appPath',
      },
    ])

    await CliNext.prompt.ask([
      {
        name: 'protocolId',
      },
    ])

    CliNext.payload.destination = `${CliNext.payload.appPath}/protocols/${CliNext.payload.protocolId}`

    let pass = await ChunkProtocolContent.ask()

    if (!pass) {
      return
    }

    await ChunkProtocolContent.write()
  },
})
