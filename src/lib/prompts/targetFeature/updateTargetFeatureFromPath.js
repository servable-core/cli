/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import path from "path"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"

export default (props) => {
    const { payload,
    } = props

    payload.targetFeaturePath = props.path
    payload.targetFeature = payload.targetFeaturePath.split(path.sep).pop()
    payload.featureName = capitalizeFirstLetter(payload.targetFeature)
}


