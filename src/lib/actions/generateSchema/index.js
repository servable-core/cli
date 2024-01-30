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
        if (!servableConfig.features) {
            servableConfig.features = {}
        }
        servableConfig.features.local = [
            `${appPath}/lib/features`
            // path.resolve(__dirname, `./features`)
        ]
        servableConfig.rootFeaturePayload = {
            type: 'app',
            id: 'app',
            // path: path.resolve(__dirname, "./app")
            path: `${appPath}/lib/features`
        }

        const schema = await buildSchema({ servableConfig })
        return schema

    } catch (e) {
        console.error(e)
        return null
    }
}

