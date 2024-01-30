export default async () => {
  const domain = CliNext.env.SERVABLE_API_HOST
  const username = CliNext.payload.registryUsername
  const password = CliNext.payload.registryPassword
  const sessionToken = CliNext.payload.sessionToken

  // await CliNext.store.save({
  //   key: 'registrySessionToken',
  //   domain,
  //   value: CliNext.payload.registrySessionToken
  // })
  if (username && password && sessionToken) {
    CliNext.payload.registryUsername = username
    CliNext.payload.registryPassword = password
    CliNext.payload.sessionToken = sessionToken
    return true
  }

  return false
}
