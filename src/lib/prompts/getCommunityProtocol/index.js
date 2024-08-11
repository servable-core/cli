/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForProtocol from "./askForProtocol/index.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.existingProtocol) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Choose a protocol`,
        subTitle: ``
    })

    await askForProtocol(props)
    payload.promptGroupsPassed.existingProtocol = true
}
