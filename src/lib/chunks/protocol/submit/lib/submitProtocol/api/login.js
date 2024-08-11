import * as dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export default async ({ protocolId, }) => {
  const url = `${CliNext.env.SERVABLE_API_HOST}/protocol/byuniqueref`

  try {
    const result = await axios({
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      params: {
        protocolId,
      }
    })

    return result.data
  } catch (e) {
    console.error(e)
  }

  return null
}
