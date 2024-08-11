/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import path from "path"
import chalk from "chalk"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"
import askForGeneric from "../utils/askForGeneric.js"
import protocolSchemaOwnClasses from "./lib/protocolSchemaOwnClasses.js"

export default async (props) => {
    const { toolbox, payload, options = {} } = props

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Class informations 🚀`,
        subTitle: `Servable required class informations.`
    })

    const ownClasses = await protocolSchemaOwnClasses(payload.targetProtocolPath)

    const nameFromFolder = toolbox.options['destination'] ? path.basename(toolbox.destinationPath()) : ''

    await askForGeneric({
        ...props, options: {
            ...options,
            type: 'input',
            name: 'className',
            default: nameFromFolder,
            validate: (name,) => {
                const classNames = ownClasses.map(c => c.className.toLowerCase())
                if (classNames.includes(name.toLowerCase())) {
                    toolbox.log(chalk.red(chalk.italic(`\n${name} class is already present.`)))
                    return false
                }
                return true
            },
            transformer: (name,) => {
                if (!name) {
                    return name
                }

                return capitalizeFirstLetter(name)
            }
        }
    })

    payload.className = capitalizeFirstLetter(payload.className)
    payload.classDescription = ''
}
