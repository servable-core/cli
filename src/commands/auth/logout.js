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


// Real bug, found via checkJs (lucide, PEAKUB DX initiative): this destructured `{ username,
// password }`, but the caller above has never had a password to give it (it's a session-token
// logout, not a login) - it passes `sessionToken`, which this function silently dropped, so
// every logout request has always sent `{ username, password: undefined }` and never actually
// identified the session being ended. Sending the session token as a Bearer header is the
// standard shape for this and an improvement over "not sent at all", but this hasn't been
// verified against what SERVABLE_API_HOST's /user/logout route actually expects - flagging
// rather than asserting this is now fully correct.
const doLogout = async ({ username, sessionToken }) => {
  const url = `${CliNext.env.SERVABLE_API_HOST}/user/logout`

  try {
    const result = await axios({
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
        ...(sessionToken ? { authorization: `Bearer ${sessionToken}` } : {}),
      },
      data: {
        username,
      }
    })

    return result.data
  } catch (e) {
    console.info(e)
  }

  return null
}
