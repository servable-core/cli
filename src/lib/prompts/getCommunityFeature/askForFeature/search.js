/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-toolbox')} toolbox
* @param {Object} payload
*/

import * as dotenv from 'dotenv'
import axios from "axios"
dotenv.config()


export default async (answers, input = '') => {
  const searchTerm = input
  const page = 0

  const url = `${CliNext.env.SERVABLE_API_HOST}/feature/search`

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
        // Where: JSON.stringify({ "post": { "$inQuery": { "where": { "image": { "$exists": true } }, "className": "Post" } } })
      }
    })

    return result.data
  } catch (e) {
    console.error(e)
  }

  return null
}
