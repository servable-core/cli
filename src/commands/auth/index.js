import isLoggedIn from "../../lib/newlib/auth/login/isLoggedIn.js"
import chalk from 'chalk'

export default ({
  _clinextType: 'command',
  position: 0,
  name: 'auth',
  description: `Authentication`,
  options: [
  ],
  handler: async () => {
    const _isLoggedIn = await isLoggedIn()
    if (!_isLoggedIn) {
      console.log(`🔴`, chalk.bold.red(`You are not logged in.\n servable auth login`))
      return
    }

    console.log(`🟢`, chalk.bold.green(`You are logged in.\n servable auth logout`))
  }
})

