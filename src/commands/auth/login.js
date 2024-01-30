import loginIfNecessary from '../../lib/newlib/auth/login/loginIfNecessary.js'

export default ({
  _clinextType: 'command',
  name: 'login',
  description: `Login 🐻`,
  options: [
    {
      name: 'registryUsername',
      storeValue: true,
      loadFromStoreOnInit: true,
      storeDomain: CliNext.env.SERVABLE_API_HOST
    },
    {
      name: 'registryPassword',
      storeDomain: CliNext.env.SERVABLE_API_HOST
    },
    {
      name: 'registrySessionToken',
      storeValue: true,
      loadFromStoreOnInit: true,
      storeDomain: CliNext.env.SERVABLE_API_HOST
    },
  ],
  example: "$0 registry auth login",
  handler: async () => {
    await loginIfNecessary()
  }
})
