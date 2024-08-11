import ChunkShell from '../../lib/chunks/protocol/shell/index.js'

export default ({
  _clinextType: "command",
  name: 'new',
  description: 'Create a protocol project 🐝',
  questions: [
    {
      name: 'protocolId',
      validators: [{
        id: 'nonEmpty'
      }]
    },
    {
      name: 'destination',
      message: "Where to create",
      transformers: [{
        modes: ['out'],
        template: `<%= destination %>/<%= protocolId %>`
      }]
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'packageManager',
    },
    {
      name: 'installDependencies',
    },
    {
      name: 'license',
    },
    {
      name: 'gitInit',
    },
    {
      name: 'protocolDescription',
    },
    // {
    //   name: 'homepageUrl',
    // },
    // {
    //   name: 'authorName',
    // },
    // {
    //   name: 'authorEmail',
    // },
    // {
    //   name: 'authorUrl',
    // },
    // {
    //   name: 'authorGithubUrl',
    // },
    {
      name: 'releaseType',
    },

  ],
  example: "$0 protocol eject",
  handler: async () => {

    await CliNext.prompt.ask([
      {
        name: 'protocolId',
      },
    ])

    await CliNext.prompt.ask([
      {
        name: 'destination',

      },
    ])

    // CliNext.payload.destination = `${CliNext.payload.destination}/${CliNext.payload.protocolId}`


    let pass = await ChunkShell.ask({ askIndex: true })

    if (!pass) {
      return
    }

    await ChunkShell.write({ askIndex: true })
  },
})
