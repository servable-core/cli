/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderClass from "./lib/isFolderClass.js"
// import getServablePackage from "./lib/getServablePackage.js"
import path from "path"
import targetFeature from "../targetFeature/index.js"
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload,
        includeCoreClasses = true,
        appFeatureMessage = `Add class to app feature?`,
        includeFeatureAsAClass = false,
        forFeatures = 'Do you want to target features or classes'
    } = props

    let value = toolbox.options['targetClass']
    if (value) {
        payload.targetClass = value
        payload.targetClassPath = null
        return
    }

    if (toolbox.options['quick']) {
        return
    }

    const originalDestinationPath = toolbox.originalDestinationPath

    if (await isFolderClass(originalDestinationPath)) {
        payload.targetClassPath = originalDestinationPath
        payload.targetClass = payload.targetClassPath.split(path.sep).pop()

        // const config = await getServablePackage(originalDestinationPath)
        // payload.desiredWriteDestinationPath = ''
        toolbox.log(chalk.italic(`→ The class will be added to the feature in the current folder.\n`))
        return
    }

    if (includeFeatureAsAClass) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'forFeatures',
                message: forFeatures,
                // message: `Add class to ${payload.targetApp} app feature?`,
                defaultValue: true
            }
        })

        if (payload.forFeatures) {
            payload.targetClassPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/app`
            payload.targetClass = payload.targetFeaturePath.split(path.sep).pop()
            return
        }
    }

    await targetFeature(props)
    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Class choice 🚀`,
        subTitle: `Choose the class.`
    })

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "targetClassPath",
            message: "Choose the class to add a feature to",
            onlyShowDir: true,
            root: `${payload.targetFeaturePath}/classes`,
            onlyShowValid: true,
            hideRoot: true,
            // validate: (name,) => {
            //     if (!name || !name.length) {
            //         return false
            //     }
            //     // return true
            //     return isFolderClassSync(name)
            // },
        }
    })

    // const folderPath = path.resolve(toolbox.destinationPath(), destination)
    // this.destinationRoot(folderPath)

    payload.targetClass = payload.targetFeaturePath.split(path.sep).pop()
}
