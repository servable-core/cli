import buildPayload from './buildPayload.js'
import post from './api/post.js'

export default async (props) => {
  const { path, mode, uniqueRef } = props

  try {
    const apiPayload = await buildPayload({ path, })
    if (!apiPayload) {
      throw ({ message: "No payload" })
    }
    const result = await post({
      payload: apiPayload,
      username: CliNext.payload.registryUsername,
      password: CliNext.payload.registryPassword,
      mode,
      uniqueRef,
      // sessionToken: payload.sessionToken,
    })
    return result
  } catch (e) {
    console.error(e)
  }

  return null
}

