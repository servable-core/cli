/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderFeature from "./lib/isFolderFeature.js"
// import getServablePackage from "./lib/getServablePackage.js"
import targetApp from "../targetApp/index.js"
import path from "path"
import isFolderFeatureSync from "./lib/isFolderFeatureSync.js"
import askForGeneric from "../utils/askForGeneric.js"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"
import featuresInFolder from "./lib/featuresInFolder.js"

export default async (props) => {
    const { toolbox, payload,
        includeAppFeature = true,
        appFeatureMessage = `Use app feature?`
    } = props

    let value = toolbox.options['targetFeature']
    if (value) {
        payload.targetFeature = value
        payload.targetFeaturePath = null
        return true
    }

    if (toolbox.options['quick']) {
        return true
    }

    const originalDestinationPath = toolbox.originalDestinationPath

    if (await isFolderFeature(originalDestinationPath)) {
        payload.targetFeaturePath = originalDestinationPath
        payload.targetFeature = payload.targetFeaturePath.split(path.sep).pop()

        // const config = await getServablePackage(originalDestinationPath)
        // payload.desiredWriteDestinationPath = ''
        toolbox.log(chalk.italic(`→ The class will be added to the feature in the current folder.\n`))
        return true
    }

    await targetApp(props)

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Feature choice 🚀`,
        subTitle: `Choose a feature`
    })

    if (includeAppFeature) {
        await askForGeneric({
            ...props, options: {
                ...(props.options ? props.options : {}),
                type: 'confirm',
                name: 'useAppFeature',
                message: appFeatureMessage,
                // message: `Add class to ${payload.targetApp} app feature?`,
                defaultValue: true
            }
        })

        if (payload.useAppFeature) {
            payload.targetFeaturePath = `${payload.desiredWriteDestinationPathAbsolute}/lib/app`
            payload.targetFeature = payload.targetFeaturePath.split(path.sep).pop()
            return true
        }

    }

    const root = `${payload.desiredWriteDestinationPathAbsolute}/lib/features`
    const items = await featuresInFolder(root)
    if (!items || !items.length) {
        toolbox.log('No features found in this app')
        return false
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "targetFeaturePath",
            // message: "Choose a local feature",
            onlyShowDir: true,
            root,
            onlyShowValid: true,
            hideRoot: true,
            validate: (name,) => {
                if (!name || !name.length) {
                    return false
                }
                return isFolderFeatureSync(name)
            },
        }
    })

    payload.targetFeature = payload.targetFeaturePath.split(path.sep).pop()
    payload.featureName = capitalizeFirstLetter(payload.targetFeature)
    return true
}
