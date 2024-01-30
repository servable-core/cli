/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGenericBulk from "../../../../../prompts/utils/askForGenericBulk.js"
import login from "../lib/login.js"

import getValueFromStore from "../../../../../lib/store/get.js"
import saveValueToStore from "../../../../../lib/store/save.js"

export default async (props) => {
    const { toolbox, payload, initiate = true } = props
    const domain = "servable.app"
    toolbox.log('domain', domain)
    const username = await getValueFromStore({
        key: 'username',
        domain
    })
    const password = await getValueFromStore({
        key: 'password',
        domain
    })
    let sessionToken = await getValueFromStore({
        key: 'sessionToken',
        domain
    })
    toolbox.log('username', username,)
    if (username && password && sessionToken) {
        payload.registryUsername = username
        payload.registryPassword = password
        payload.sessionToken = sessionToken

        // await login({
        //     username: payload.registryUsername,
        //     password: payload.registryPassword
        // })


        return true
    }

    const hasValues = await askForGenericBulk({
        ...props, items: [
            {
                name: 'registryUsername',
                defaultValue: username
            },
            {
                name: 'registryPassword',
                type: 'password',
                defaultValue: password
            },
        ]
    })

    if (!hasValues) {
        return false
    }

    if (!initiate) {
        return true
    }

    const result = await login({
        username: payload.registryUsername,
        password: payload.registryPassword
    })

    if (!result) {
        toolbox.log(`Could not connect to the Servable registry. Please try again later`)
        return false
    }

    payload.sessionToken = result.sessionToken

    await saveValueToStore({
        key: 'username',
        domain,
        value: payload.registryUsername
    })

    await saveValueToStore({
        key: 'password',
        domain,
        value: payload.registryPassword
    })
    await saveValueToStore({
        key: 'sessionToken',
        domain,
        value: payload.sessionToken
    })

    return true
}



