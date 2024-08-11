/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import path from "path"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"

export default (props) => {
    const { payload,
    } = props

    payload.targetProtocolPath = props.path
    payload.targetProtocol = payload.targetProtocolPath.split(path.sep).pop()
    payload.protocolName = capitalizeFirstLetter(payload.targetProtocol)
}


