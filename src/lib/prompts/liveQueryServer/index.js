/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../utils/askForGeneric.js"
import askForGenericPort from "../utils/askForGenericPort.js"


import validateNumber from "../../lib/validateNumber.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props

    if (!force && payload.promptGroupsPassed.liveQueryServer) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Live query server ⚡️`,
        subTitle: `A distinct live query server can drastically improve the app's performance for live queries.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'useLiveQueryServer',
                message: 'Use Live Query server?',
                defaultValue: true
            }
        })
    }
    else {
        payload.useLiveQueryServer = true
    }

    if (!payload.useLiveQueryServer) {
        return
    }

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appLiveQueryServerPort',
            message: 'Livequery cache port?',
            port: { value: 1392, },
            validate: validateNumber,
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appLiveQueryCachePort',
            message: 'Livequery cache port?',
            port: { value: 6380, },
            validate: validateNumber,
        }
    })

    // payload.appLiveQueryServerPort = 1392
    // payload.appLiveQueryCachePort = 6380

    payload.promptGroupsPassed.liveQueryServer = true
}
