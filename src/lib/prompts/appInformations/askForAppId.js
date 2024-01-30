/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import validateAppId from "../../lib/validateAppId.js"
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { payload } = props

    let defaultValue = null
    if (payload.appName) {
        defaultValue = payload.appName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appId',
            defaultValue,
            validate: validateAppId
        }
    })
}
