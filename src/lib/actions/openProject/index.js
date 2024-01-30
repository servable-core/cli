/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import which from "which"
import askForGeneric from "../../prompts/utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload, } = props

    if (!toolbox.options['open'] && !toolbox.options['quick']) {
        const cdLocation = toolbox.options['destination'] || payload.appName
        toolbox.log('To start editing with Visual Studio Code, use the following commands:')
        toolbox.log('')
        toolbox.log('     code ' + cdLocation)
        toolbox.log('')
        return
    }

    const codeStableLocation = await which('code').catch(() => undefined)
    if (!codeStableLocation) {
        return
    }

    const choices = []
    choices.push({
        name: "Open with `code`",
        value: codeStableLocation
    })
    choices.push({
        name: "Skip",
        value: 'skip'
    })
    const answer = await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "list",
            name: "openWith",
            // message: "Do you want to open the new folder with Visual Studio Code?",
            choices
        }
    })

    if (answer && answer.openWith && answer.openWith !== 'skip') {
        toolbox.log(`Opening ${toolbox.destinationPath()} in Visual Studio Code...`)
        toolbox.spawn(answer.openWith, [toolbox.destinationPath()])
    }
}
