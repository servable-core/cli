import * as dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export default async ({ username, password, }) => {
  const url = `${CliNext.env.SERVABLE_API_HOST}/userlogin`

  try {
    const result = await axios({
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      data: {
        username,
        password,
      }
    })

    return result.data
  } catch (e) {
    console.error(e)
  }

  return null
}
