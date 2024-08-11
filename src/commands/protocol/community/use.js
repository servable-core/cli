// import loginIfNecessary from "../../../lib/newlib/auth/login/loginIfNecessary.js"
// import chalk from 'chalk'
import ChunkProtocolUse from '../../../lib/chunks/protocol/use/index.js'

export default ({
  _clinextType: 'command',
  name: 'use',
  description: `Use a protocol`,
  questions: [
    {
      name: 'protocolIdAutoComplete',
      validators: [{
        id: 'nonEmpty'
      }]
    },
    {
      name: 'appPath',
      message: "App from",
    },
    {
      name: 'classPath',
      message: "Class to add the protocol to",
    },
  ],
  example: "$0 protocol community use'",
  handler: async () => {
    // const isLoggedIn = await loginIfNecessary()
    // if (!isLoggedIn) {
    //   console.log(`🔴`, chalk.bold.red(`You are not logged in.`))
    //   return
    // }


    const passed = await ChunkProtocolUse.ask()
    if (!passed) {
      return
    }

    await ChunkProtocolUse.write()
  }
})
