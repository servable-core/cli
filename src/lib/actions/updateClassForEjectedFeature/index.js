/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import getClassFeatures from "../../lib/classFeatures/get.js"
import updateClassFeatures from "../../lib/classFeatures/update.js"
import askForTemplateParameter from "../../prompts/utils/askForTemplateParameter.js"
import Bluebird from "bluebird"


export default async (props) => {
    const { toolbox, payload, } = props

    let existingFeatures = await getClassFeatures(payload.targetClassPath)
    if (!existingFeatures) {
        existingFeatures = []
    }

    const { id, usage, } = payload.existingFeature



    let feature = {
        id,
        metadata: {
            toolboxVersion: toolbox.version,
            updatedAt: (new Date()),
        }
    }

    if (usage && usage.template && usage.template.params) {
        const { params, slug, name, id } = usage.template
        feature = {
            ...feature,
            name,
            id,
            slug,
            params
        }
    }

    let isTemplate = false
    if (usage && usage.parameters && usage.parameters.length) {
        await Bluebird.Promise.mapSeries(
            usage.parameters,
            async parameter => askForTemplateParameter({
                ...props,
                parameter,
                feature: payload.existingFeature
            }))

        isTemplate = true
    }

    existingFeatures.push(feature)

    await updateClassFeatures({
        ...props,
        folder: payload.targetClassPath,
        toolbox,
        items: existingFeatures,
        isTemplate
    })
}
