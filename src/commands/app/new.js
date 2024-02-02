import ChunkAppContent from '../../lib/chunks/app/content/index.js'

export default ({
  _clinextType: 'command',
  name: 'new',
  position: 0,
  description: `Create a Servable app 🐻`,
  options: [
    {
      name: 'appName',
      type: 'string',
      promptType: 'input',
      alias: 'n',
      defaultValue: 'MyAppName',
      message: 'App name',
      validators: [{ id: 'nonempty', params: { maxParams: 12 } }]

    },
    {
      name: 'appDescription',
      type: 'string',
      promptType: 'input',
      defaultValue: 'A Servable app',
      message: 'App description',
      validators: [{ id: 'nonempty', params: { maxParams: 12 } }]
    },
    {
      name: 'bridgeframeworkId',
      message: 'Engine to use',
      validators: [{ id: 'nonempty', params: { maxParams: 12 } }]
    },
    {
      name: 'installDependencies',
      message: 'Install dependencies'
    }, {
      name: 'license',
    },
    {
      name: 'packageManager',
    },
    {
      name: 'gitInit',
    },
    {
      name: 'destination',
    },
    {
      name: 'appPort',
      type: 'number',
      prompt: {
        type: 'input',
      },
      defaultValue: 1387,
      message: 'App port',
      validators: [{
        id: 'nonEmpty', params: { maxParams: 12 }
      },
      {
        id: 'isnumber', params: { maxParams: 12 }
      },],
      transformers: {
        in: [{
          id: "getPort"
        }],
        // out: [{
        //   id: "theme"
        // },
        // {
        //   template: "New value: <%= value %>",
        // }]
      },
    },
    // {
    //   name: 'appId',
    //   type: 'string',
    // promptType: 'input',
    //   alias: 'n',
    //   defaultValue: 'MyAppID',
    //   message: 'App name',
    //   validators: [{ type: 'nonEmpty', params: { maxParams: 12 } }]
    // },
  ],
  example: "$0 app new --appName='MyApp' --adapter='@servable/cli'",
  handler: async () => {
    const passed = await ChunkAppContent.ask()
    if (!passed) {
      return
    }

    await ChunkAppContent.write()
  },
})
