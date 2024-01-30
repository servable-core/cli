/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import askForGeneric from "./askForGeneric.js"
import getPortOrRandom from "../../lib/ports/getPortOrRandom.js"
import getPortNear from "../../lib/ports/getPortNear.js"

export default async ({ toolbox, payload, options: {
    port,
    ..._options
} }) => {

    const { value, type } = port
    let _port = value
    switch (type) {
        case 'random': {
            _port = await getPortOrRandom({ port: _port })
        } break
        case 'near':
        default: {
            _port = await getPortNear({ port: _port })
            break
        }
    }

    return askForGeneric({
        toolbox,
        payload,
        options: {
            ..._options,
            defaultValue: _port
        }
    })
}
