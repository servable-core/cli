export default async () => {
  const domain = CliNext.env.SERVABLE_API_HOST
  const username = CliNext.payload.registryUsername
  const password = CliNext.payload.registryPassword
  const sessionToken = CliNext.payload.sessionToken

  return {
    username,
  }

}
