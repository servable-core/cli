/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../utils/askForGeneric.js"

/**
 * */
export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.gitInit) {
        return
    }

    await askForGeneric({
        ...props,
        options: {
            ...props.options,
            type: "confirm",
            name: "gitInit",
        }
    })

    payload.promptGroupsPassed.gitInit = true
}
