import * as dotenv from 'dotenv'
import axios from "axios"
dotenv.config()

export default async (answers, input = '') => {
  const searchTerm = input
  const page = 0

  const url = `${CliNext.env.SERVABLE_API_HOST}/protocol/search`

  try {
    const result = await axios({
      method: "GET",
      url,
      headers: {
        "content-type": "application/json"
      },
      params: {
        searchTerm,
        page
      }
    })

    if (!result.data || !result.data.length) {
      return []
    }
    return result.data.map(res => ({
      value: res.index.id,
      description: res.index.description,
    }))
  } catch (e) {
    // console.info("Error searching for protocol", e.message)
  }

  return []
}
