/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import buildCompleteFeatureID from "../../lib/buildCompleteFeatureID.js"
import askForGeneric from "../utils/askForGeneric.js"


export default async (props) => {
    const { payload } = props

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'featureId',
        }
    })

    payload.completedFeatureId = buildCompleteFeatureID(payload.featureId)
}
