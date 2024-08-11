import isLoggedIn from "./isLoggedIn.js"
import doLogin from "./doLogin.js"

export default async () => {
  if ((await isLoggedIn())) {
    return false
  }

  await CliNext.prompt.ask([
    {
      name: 'registryUsername',
      defaultValue: CliNext.payload.registryUsername,
      store: true
    },
    {
      name: 'registryPassword',
      defaultValue: CliNext.payload.registryPassword,
      store: true
    },
  ])

  const result = await doLogin({
    username: CliNext.payload.registryUsername,
    password: CliNext.payload.registryPassword
  })

  if (!result) {
    CliNext.print.info(`Could not connect to the Servable registry. Please try again later`)
    return false
  }

  CliNext.payload.registrySessionToken = result.sessionToken

  await CliNext.store.save({
    key: 'registrySessionToken',
    value: CliNext.payload.registrySessionToken
  })

  return true
}
