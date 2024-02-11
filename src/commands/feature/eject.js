import ChunkShell from '../../lib/chunks/feature/shell/index.js'
import fillPayloadWithFeatureIndex from '../../lib/newactions/fillPayloadWithFeatureIndex.js'
import removeEjectedFeature from '../../lib/newactions/removeEjectedFeature/index.js'
import updatePackageForEjectedFeature from '../../lib/newactions/updatePackageForEjectedFeature/index.js'


export default ({
  _clinextType: "command",
  name: 'eject',
  description: 'Eject a feature 🐝',
  questions: [
    {
      name: 'appPath',
      message: "App to eject from",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'featurePath',
      message: "Feature to eject",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'destination',
      message: "Where to eject",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'featureDescription',
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
  example: "$0 feature eject",
  handler: async () => {
    await CliNext.prompt.ask([
      {
        name: 'appPath',
      },
    ])

    await CliNext.prompt.ask([
      {
        root: `${CliNext.payload.appPath}/lib/features`,
        name: 'featurePath',
      },
    ])

    await fillPayloadWithFeatureIndex({ featurePath: CliNext.payload.featurePath })

    await CliNext.prompt.ask([
      {
        name: 'destination',
      },
    ])

    CliNext.payload.destination = `${CliNext.payload.destination}/${CliNext.payload.featureId}`


    let pass = await ChunkShell.ask()

    if (!pass) {
      return
    }

    await ChunkShell.write()

    await CliNext.fs.copyWithRootSource({
      destination: `${CliNext.payload.destination}/src`,
      source: `${CliNext.payload.featurePath}/**/*`,
      rootSource: `${CliNext.payload.featurePath}`,
      render: false
    })


    await CliNext.prompt.ask([
      {
        name: 'updateApp',
      },
    ])
    if (CliNext.payload.updateApp) {
      await updatePackageForEjectedFeature({})
      await removeEjectedFeature({})
    }
  },
})
