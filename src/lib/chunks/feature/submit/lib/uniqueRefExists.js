import * as dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export default async ({ featureId, }) => {
  const url = `${CliNext.env.SERVABLE_API_HOST}/feature/byuniqueref`

  try {
    const result = await axios({
      method: "GET",
      url,
      headers: {
        "content-type": "application/json",
      },
      params: {
        uniqueRef: featureId,
      }
    })

    return result.data
  } catch (e) {
    console.error(e)
  }

  return null
}
