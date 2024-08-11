/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderServableApp from "./lib/isFolderServableApp.js"
import isFolderServableAppSync from "./lib/isFolderServableAppSync.js"
import getServablePackage from "./lib/getServablePackage.js"
import path from "path"
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload, } = props

    let value = toolbox.options['targetApp']
    if (value) {
        payload.targetApp = value
        return
    }

    // payload.targetApp = 'standalone'

    if (toolbox.options['quick']) {
        return
    }

    const originalDestinationPath = toolbox.originalDestinationPath

    if (await isFolderServableApp(originalDestinationPath)) {
        const config = await getServablePackage(originalDestinationPath)
        payload.desiredWriteDestinationPathAbsolute = originalDestinationPath
        payload.desiredWriteDestinationPath = payload.desiredWriteDestinationPathAbsolute.split(path.sep).pop()

        toolbox.log(chalk.italic(`→ No app choice required. The protocol will be added servable app in the current folder (${payload.appName}).\n`))
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `App choice 🚀`,
        subTitle: `Choose the app you want to add a protocol to.`
    })

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "desiredWriteDestinationPathAbsolute",
            message: "Choose a servable app",
            onlyShowDir: true,
            root: originalDestinationPath,
            onlyShowValid: true,
            hideRoot: true,
            // onlyShowValid: true,
            // validate: name => {
            //     return (name && name.length && !['.'].includes(name[0]))
            // }
            validate: (name,) => {
                if (!name || !name.length) {
                    return false
                }
                const isServable = isFolderServableAppSync(name)
                return isServable
            },
            transformer: (name,) => {
                if (!name || !name.length) {
                    return name
                }

                const _name = name.split(path.sep).pop()
                //const isServable = (_name && _name.length && !['.'].includes(_name[0]))
                const isServable = isFolderServableAppSync(name)
                return isServable ? `${_name} (Servable project) ` : `${_name} ('N/A')`
            }
        }
    })

    payload.desiredWriteDestinationPath = payload.desiredWriteDestinationPathAbsolute.split(path.sep).pop()

}
