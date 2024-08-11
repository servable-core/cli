import ChunkShell from '../../lib/chunks/protocol/shell/index.js'
import fillPayloadWithProtocolIndex from '../../lib/newactions/fillPayloadWithProtocolIndex.js'
import removeEjectedProtocol from '../../lib/newactions/removeEjectedProtocol/index.js'
import updatePackageForEjectedProtocol from '../../lib/newactions/updatePackageForEjectedProtocol/index.js'


export default ({
  _clinextType: "command",
  name: 'eject',
  description: 'Eject a protocol 🐝',
  questions: [
    {
      name: 'appPath',
      message: "App to eject from",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'protocolPath',
      message: "Protocol to eject",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'destination',
      message: "Where to eject",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'protocolDescription',
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
    {
      name: 'updateApp',
      type: 'boolean',
      promptType: 'confirm',
      defaultValue: true,
      message: 'Update app after ejection'
    }
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
        root: `${CliNext.payload.appPath}/lib/protocols`,
        name: 'protocolPath',
      },
    ])

    await fillPayloadWithProtocolIndex({ protocolPath: CliNext.payload.protocolPath })

    await CliNext.prompt.ask([
      {
        name: 'destination',
      },
    ])

    CliNext.payload.destination = `${CliNext.payload.destination}/${CliNext.payload.protocolId}`


    let pass = await ChunkShell.ask()

    if (!pass) {
      return
    }

    await ChunkShell.write()

    await CliNext.fs.copyWithRootSource({
      destination: `${CliNext.payload.destination}/src`,
      source: `${CliNext.payload.protocolPath}/**/*`,
      rootSource: `${CliNext.payload.protocolPath}`,
      render: false
    })


    await CliNext.prompt.ask([
      {
        name: 'updateApp',
      },
    ])
    if (CliNext.payload.updateApp) {
      await updatePackageForEjectedProtocol({})
      await removeEjectedProtocol({})
    }
  },
})
