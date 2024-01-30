/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForGeneric from "../utils/askForGeneric.js"


export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.packageManager) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Package manager 🧳`,
        subTitle: `Package manager for the project.`
    })

    await askForGeneric({
        ...props,
        options: {
            type: 'list',
            name: 'packageManager',

            choices: [{
                name: 'npm',
                value: 'npm'
            }, {
                name: 'yarn',
                value: 'yarn'
            }, {
                name: 'pnpm',
                value: 'pnpm'
            }]
        }
    })

    payload.promptGroupsPassed.packageManager = true
}
