export default ({
  method: "function",
  path: '/auth/me',
  cache: {
    type: "inMemory",
    params: {
      window: 10
    }
  },
  logLevel: 'warn',
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
      'sessiontoken': { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          objectId: { type: 'string' }
        }
      }
    }
  },
  requireUser: true,
  handler: async ({ user, }) => {
    return {
      firstname: user.get('firstname'),
      lastname: user.get('lastname'),
      emailVerified: user.get('emailVerified'),
      email: user.email,
    }
  }
})
