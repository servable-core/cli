import ChunkShell from '../../lib/chunks/feature/shell/index.js'

export default ({
  _clinextType: "command",
  name: 'new',
  description: 'Create a feature project 🐝',
  questions: [
    {
      name: 'featureId',
      validators: [{
        id: 'nonEmpty'
      }]
    },
    {
      name: 'destination',
      message: "Where to create",
      transformers: [{
        modes: ['out'],
        template: `<%= destination %>/<%= featureId %>`
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
      name: 'featureDescription',
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
  example: "$0 feature eject",
  handler: async () => {

    await CliNext.prompt.ask([
      {
        name: 'featureId',
      },
    ])

    await CliNext.prompt.ask([
      {
        name: 'destination',

      },
    ])

    // CliNext.payload.destination = `${CliNext.payload.destination}/${CliNext.payload.featureId}`


    let pass = await ChunkShell.ask({ askIndex: true })

    if (!pass) {
      return
    }

    await ChunkShell.write({ askIndex: true })
  },
})
