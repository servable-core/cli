// import loginIfNecessary from "../../../lib/newlib/auth/login/loginIfNecessary.js"
// import chalk from 'chalk'
import ChunkFeatureUse from '../../../lib/chunks/feature/use/index.js'

export default ({
  _clinextType: 'command',
  name: 'use',
  description: `Use a feature`,
  questions: [
    {
      name: 'featureIdAutoComplete',
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
      message: "Class to add the feature to",
    },
  ],
  example: "$0 feature community use'",
  handler: async () => {
    // const isLoggedIn = await loginIfNecessary()
    // if (!isLoggedIn) {
    //   console.log(`🔴`, chalk.bold.red(`You are not logged in.`))
    //   return
    // }


    const passed = await ChunkFeatureUse.ask()
    if (!passed) {
      return
    }

    await ChunkFeatureUse.write()
  }
})
