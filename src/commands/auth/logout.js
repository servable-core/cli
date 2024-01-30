import * as dotenv from 'dotenv'
import axios from "axios"
dotenv.config()

export default ({
  _clinextType: 'command',
  name: 'logout',
  description: `Logout 🐻`,
  options: [
    {
      name: 'registryConfirmLogout',
      message: "Logout of Servable",
      promptType: 'confirm',
      defaultValue: false,
      type: 'boolean'
    },
  ],
  example: "$0 registry auth logout",
  handler: async ({ toolbox, }) => {

    const domain = toolbox.env.SERVABLE_API_HOST

    const username = await toolbox.store.get({
      key: 'registryUsername',
      domain
    })
    let sessionToken = await toolbox.store.get({
      key: 'registrySessionToken',
      domain
    })

    if (!username || !sessionToken) {
      console.log("You are not currently logged in. Quitting")
      return true
    }

    await toolbox.prompt.ask([
      {
        name: 'registryConfirmLogout',
      },
    ])

    if (!toolbox.payload.registryConfirmLogout) {
      console.log("Quitting")
      return
    }

    console.log("Logging out")
    const result = await doLogout({
      username: toolbox.payload.registryUsername,
      sessionToken: toolbox.payload.registrySessionToken
    })

    if (!result) {
      toolbox.print.info(`Could not connect to the Servable registry. Please try again later`)
      return false
    }

    toolbox.payload.registrySessionToken = null
    toolbox.payload.registryPassword = null
    toolbox.payload.registryUsername = null

    await toolbox.store.save({
      key: 'registryUsername',
      domain,
      value: null
    })
    await toolbox.store.save({
      key: 'registrySessionToken',
      domain,
      value: null
    })
    await toolbox.store.save({
      key: 'registryPassword',
      domain,
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
