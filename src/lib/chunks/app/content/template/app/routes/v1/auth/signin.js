export default ({
  method: "function",
  path: 'signin',
  rateLimiting: {
    type: "fixedByIp",
    params: {
      limit: 1,
      window: 1 * 1000,
      message: 'Too many requests'
    }
  },
  schema: {
    queryString: {
      username: { type: 'string' },
      password: { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {

        }
      }
    }
  },
  handler: async ({ request }) => {
    try {
      const { query } = request
      const { password, username } = query
      if (!password || !username) {
        throw ({
          message: "No username or password provided.",
          code: 404
        })
      }

      const user = await Servable.App.User.logIn(username, password)
      let result = user.toJSON()
      return {
        sessiontoken: user.getSessionToken(),
        firstname: user.get('firstname'),
        lastname: user.get('lastname'),
        emailVerified: user.get('emailVerified'),
        email: user.email,
      }
    } catch (e) {
      Servable.Console.error(e)
      throw ({
        message: "Could not login",
        code: 404
      })
    }
  }
})
