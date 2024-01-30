/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import validateNonMandatory from "../../../../lib/validateNonMandatory.js"
import license from "../../../../prompts/license/index.js"
import askForFeatureId from "../../../../prompts/transverse/askForFeatureId.js"
import askForGenericBulk from "../../../../prompts/utils/askForGenericBulk.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.featureIndex) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Feature readme`,
        subTitle: ``
    })

    await askForFeatureId(props)
    await askForGenericBulk({
        ...props, items: [
            {
                name: 'featureName',
                validate: validateNonMandatory
            },
            {
                name: 'featureDescription',
                validate: validateNonMandatory
            },
            {
                name: 'featureHomepageUrl',
                validate: validateNonMandatory
            },
            {
                name: 'featureHowTo',
                validate: validateNonMandatory
            },
            {
                name: 'featureDefaultSlug',
                validate: validateNonMandatory
            },
            {
                name: 'featureIconUrl',
                validate: validateNonMandatory
            },
            {
                name: 'featureServableEngineVersion',
                validate: validateNonMandatory
            },
            {
                name: 'authorName',
                validate: validateNonMandatory
            },
            {
                name: 'authorEmail',
                validate: validateNonMandatory
            },
            {
                name: 'authorUrl',
                validate: validateNonMandatory
            },
            {
                name: 'authorGithubUrl',
                validate: validateNonMandatory
            },
        ]
    })

    await license(props)

    payload.promptGroupsPassed.featureIndex = true
}
