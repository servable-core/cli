/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import buildCompleteProtocolID from "../../lib/buildCompleteProtocolID.js"
import askForGeneric from "../utils/askForGeneric.js"


export default async (props) => {
    const { payload } = props

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'protocolId',
        }
    })

    payload.completedProtocolId = buildCompleteProtocolID(payload.protocolId)
}
