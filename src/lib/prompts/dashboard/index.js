/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import validateNumber from "../../lib/validateNumber.js"
import askForGeneric from "../utils/askForGeneric.js"
import askForGenericPort from "../utils/askForGenericPort.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props

    if (!force && payload.promptGroupsPassed.dashboard) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Servable dashboard 🚀`,
        subTitle: `Servable dashboard helps you visualize and edit the app's data and configuration.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'appUseDashboard'
            }
        })
    }
    else {
        payload.appUseDashboard = true
    }

    if (!payload.appUseDashboard) {
        return
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appDashboardMainPassword'
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appDashboardMainUsername'
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appDashboardPort',
            port: { value: 4040, },
            validate: validateNumber,
        }
    })

    // payload.appDashboardPort = 4040

    payload.promptGroupsPassed.dashboard = true
}
