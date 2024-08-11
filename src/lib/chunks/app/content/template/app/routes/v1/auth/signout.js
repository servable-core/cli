export default ({
  method: "function",
  path: 'signout',
  rateLimiting: {
    type: "fixedByIp",
    params: {
      limit: 10,
      window: 100,
      message: 'Too many requests'
    }
  },
  schema: {
    queryString: {
      sessiontoken: { type: 'string' },
    },
    response: {
      200: {
        type: 'object',
        properties: {

        }
      }
    }
  },
  handler: async ({ request, user }) => {
    const { headers } = request
    const sessiontoken = headers['x-servable-session-token']
    if (!sessiontoken) {
      throw ({
        message: "No username or password provided.",
        code: 404
      })
    }

    const query = new Servable.App.Query('_Session')
      .equalTo("user", user)
      .equalTo("sessionToken", sessiontoken)

    const session = await query.first({ useMasterKey: true })
    if (!session) {
      return {}
    }

    await session.destroy({ useMasterKey: true })
    return {}
  }
})
