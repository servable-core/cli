/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawTitle from "../../lib/draw/drawTitle.js"
// import notify from "./notify.js"

export default async (props) => {
    const { toolbox, payload, toolboxs } = props

    drawTitle({
        toolbox,
        title: `WELCOME TO THE SERVABLE GENERATOR 🚀 🐻🚀 🐻🚀 🐻🚀 🐻🚀 🐻`,
        // subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        // subTitle: quote()
    })

    // await notify(props)

    const toolboxType = toolbox.options['toolboxType']
    if (toolboxType) {
        const _toolbox = toolboxs.find(g => g.aliases.indexOf(toolboxType) !== -1)
        if (_toolbox) {
            payload.type = _toolbox.id
        } else {
            toolbox.log("Invalid extension type: " + toolboxType + '\nPossible types are: ' + toolboxs.map(g => g.aliases.join(', ')).join(', '))
            toolbox.abort = true
        }
    } else {
        const choices = []
        for (const g of toolboxs) {
            // (new inquirer.Separator()),
            const name = g.name
            if (name) {
                choices.push({
                    name,
                    value: g.id
                })
            }
        }
        payload.type = (await toolbox.prompt({
            type: 'list',
            name: 'type',
            message: 'What do you want to do?',
            pageSize: choices.length,
            choices
        })).type
    }
}
