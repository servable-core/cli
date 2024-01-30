import loginIfNecessary from "../../../lib/newlib/auth/login/loginIfNecessary.js"
import chalk from 'chalk'

export default ({
  _clinextType: 'command',
  name: 'list',
  description: `List features`,
  options: [
  ],
  handler: async () => {
    const isLoggedIn = await loginIfNecessary()
    if (!isLoggedIn) {
      console.log(`🔴`, chalk.bold.red(`You are not logged in.`))
      return
    }


  }
})

