/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
// @ts-nocheck - lucide (PEAKUB DX initiative): dead code, found via checkJs. Confirmed
// unreachable (no importer anywhere in this package) and depends on 'yeoman-toolbox', which
// isn't a real dependency of this package either - an abandoned prompt-flow attempt.

/**
 * @param {import('yeoman-toolbox')} toolbox
 * @param {object} payload
 */

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
        // Where: JSON.stringify({ "post": { "$inQuery": { "where": { "image": { "$exists": true } }, "className": "Post" } } })
      }
    })

    return result.data
  } catch (e) {
    console.error(e)
  }

  return null
}
