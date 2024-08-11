import loginIfNecessary from "../../../lib/newlib/auth/login/loginIfNecessary.js"
import chalk from 'chalk'
import ChunkSubmit from '../../../lib/chunks/protocol/submit/index.js'
export default ({
  _clinextType: 'command',
  name: 'submit',
  description: `Submit a protocol`,
  questions: [
    {
      name: 'protocolPath',
      message: "Protocol to submit",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'registryUpdate',
      type: 'boolean',
      message: "Update protocol in registry",
      promptType: 'confirm',
      defaultValue: false,
    },

    {
      name: 'registrySubmitMode',
      type: 'string',
      message: 'Registry submit mode (create or update)',
      promptType: 'list',
      defaultValue: 'create',
      choices: [
        "create",
        "update",
      ],
    },
    {
      name: 'registryUniqueRef',
      type: 'string',
      message: 'Registry unique reference',
      promptType: 'input',
    }

  ],
  handler: async () => {
    const isLoggedIn = await loginIfNecessary()
    if (!isLoggedIn) {
      console.log(`🔴`, chalk.bold.red(`You are not logged in.`))
      return
    }

    await CliNext.prompt.ask([
      {
        // root: `${CliNext.payload.appPath}/lib/protocols`,
        name: 'protocolPath',
      },
    ])

    if ((await ChunkSubmit.ask())) {
      await ChunkSubmit.write()
    }
  }
})
