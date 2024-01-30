/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../utils/askForGeneric.js"
import askForGenericPort from "../utils/askForGenericPort.js"
import validateNumber from "../../lib/validateNumber.js"

export default async (props) => {
  const { toolbox, payload, options: { force = false } = {} } = props

  if (!force && payload.promptGroupsPassed.appCache) {
    return
  }

  toolbox.ui.drawSectionHeader({
    toolbox,
    title: `App redis cache 🚀`,
    subTitle: `Servable can launch with a dedicated cache server in REDIS.`
  })

  if (!force) {
    await askForGeneric({
      ...props, options: {
        ...props.options,
        type: 'confirm',
        name: 'appUseCache',
        message: 'Use app cache?',
        defaultValue: true
      }
    })
  }
  else {
    payload.appUseCache = true
  }

  if (!payload.appUseCache) {
    return
  }

  await askForGenericPort({
    ...props, options: {
      ...props.options,
      type: 'number',
      name: 'appCachePort',
      message: 'App cache port?',
      port: { value: 6379, },
      validate: validateNumber,
      // when: payload.useLiveQueryServer
    }
  })

  payload.promptGroupsPassed.appCache = true
}
