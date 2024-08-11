import * as dotenv from 'dotenv'
import axios from "axios"
dotenv.config()

export default ({
  _clinextType: 'command',
  name: 'logout',
  description: `Logout 🐻`,
  questions: [
    {
      name: 'registryConfirmLogout',
      message: "Logout of Servable",
      promptType: 'confirm',
      defaultValue: false,
      type: 'boolean'
    },
  ],
  example: "$0 registry auth logout",
  handler: async () => {
    const username = await CliNext.store.get({
      key: 'registryUsername',
    })

    let sessionToken = await CliNext.store.get({
      key: 'registrySessionToken',
    })

    if (!username || !sessionToken) {
      console.log("You are not currently logged in. Quitting")
      return true
    }

    await CliNext.prompt.ask([
      {
        name: 'registryConfirmLogout',
      },
    ])

    if (!CliNext.payload.registryConfirmLogout) {
      console.log("Quitting")
      return
    }

    console.log("Logging out")
    const result = await doLogout({
      username: CliNext.payload.registryUsername,
      sessionToken: CliNext.payload.registrySessionToken
    })

    if (!result) {
      CliNext.print.info(`Could not connect to the Servable registry. Please try again later`)
      return false
    }

    CliNext.payload.registrySessionToken = null
    CliNext.payload.registryPassword = null
    CliNext.payload.registryUsername = null

    await CliNext.store.save({
      key: 'registryUsername',
      value: null
    })
    await CliNext.store.save({
      key: 'registrySessionToken',
      value: null
    })
    await CliNext.store.save({
      key: 'registryPassword',
      value: null
    })

    return true
  },
})


const doLogout = async ({ username, password, }) => {
  const url = `${CliNext.env.SERVABLE_API_HOST}/user/logout`

  try {
    const result = await axios({
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      data: {
        username,
        password,
      }
    })

    return result.data
  } catch (e) {
    console.info(e)
  }

  return null
}
