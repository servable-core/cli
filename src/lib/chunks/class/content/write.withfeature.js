/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import updateFeatureClasses from "../../../../../actions/updateFeatureClasses/index.js"
import featureSchemaVersion from "../../../../../prompts/classInformations/lib/featureSchemaVersion.js"
import pureClass from './index.js'

export default async (props) => {

    const { toolbox, payload, targetFeaturePath, className, upgradeFeatureSchemaVersion = false } = props
    toolbox.log('index.withfeature', targetFeaturePath, className, upgradeFeatureSchemaVersion)
    const targetRootPath = `${targetFeaturePath}/classes/${className.toLowerCase()}`
    const schema = await updateFeatureClasses({ className, targetFeaturePath })
    await pureClass({ ...props, targetRootPath })

    if (upgradeFeatureSchemaVersion) {
        const version = await featureSchemaVersion(targetFeaturePath)
        if (version) {
            const targetSchemaPath = `${targetFeaturePath}/schema/${version}/index.json`
            toolbox.fs.writeJSON(toolbox.destinationPath(targetSchemaPath), schema)
        }
    }
}
