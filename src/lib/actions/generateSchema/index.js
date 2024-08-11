/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { buildSchema } from '@servable/tools'


export default async (props) => {
    const { toolbox, payload } = props
    // console.log(cccomputeSchema)

    const appPath = payload.desiredWriteDestinationPathAbsolute

    try {
        const configPath = `${appPath}/servable.config.js`
        const servableConfig = (await import(configPath)).default
        // const servableConfig = JSON.parse(configRawdata)
        if (!servableConfig) {
            return
        }
        if (!servableConfig.protocols) {
            servableConfig.protocols = {}
        }
        servableConfig.protocols.local = [
            `${appPath}/lib/protocols`
            // path.resolve(__dirname, `./protocols`)
        ]
        servableConfig.rootProtocolPayload = {
            type: 'app',
            id: 'app',
            // path: path.resolve(__dirname, "./app")
            path: `${appPath}/lib/protocols`
        }

        const schema = await buildSchema({ servableConfig })
        return schema

    } catch (e) {
        console.error(e)
        return null
    }
}

