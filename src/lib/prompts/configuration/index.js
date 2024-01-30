/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForConfigurations from "./askForConfigurations.js"
// import askForState from "./askForState.js"

export default async (props) => {
  const { toolbox, payload, options: { force = false } = {} } = props
  if (!force && payload.promptGroupsPassed.configuration) {
    return
  }

  toolbox.ui.drawSectionHeader({
    toolbox,
    title: `Configurations ⚙`,
    subTitle: `Servable can be used in a staging or production configurations, or both at the same time.`
  })

  // await askForState(props)
  await askForConfigurations(props)
  payload.promptGroupsPassed.configuration = true
}
