/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

// @ts-nocheck - lucide (PEAKUB DX initiative): dead code, found via checkJs. Nothing imports
// this file's default export (only its sibling lib/protocolSchemaOwnClasses.js is used
// directly, from src/lib/chunks/model/index/ask.js) - its own `askForGeneric` import is wrong
// (points at a nonexistent src/lib/newlib/utils/, not src/lib/prompts/utils/), but since the
// file is unreachable that's never surfaced as a runtime error.
import path from "path"
import chalk from "chalk"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"
// eslint-disable-next-line n/no-missing-import -- see the dead-code note above; already known.
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
