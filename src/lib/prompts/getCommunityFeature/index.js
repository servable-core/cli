/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForFeature from "./askForFeature/index.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.existingFeature) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Choose a feature`,
        subTitle: ``
    })

    await askForFeature(props)
    payload.promptGroupsPassed.existingFeature = true
}
