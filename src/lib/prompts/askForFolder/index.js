/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload,
    } = props

    // if (toolbox._destinationRoot) {
    //     payload.targetFolder = toolbox._destinationRoot
    //     return
    // }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Target folder 🚀`,
        subTitle: `Choose the folder in your filesystem.`
    })

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "targetFolder",
            message: "Choose the folder in your filesystem",
            onlyShowDir: true,
            enableGoUpperDirectory: true,
            // root: toolbox._destinationRoot,
            // onlyShowValid: true,
            hideRoot: false,
            default: toolbox._destinationRoot
        }
    })
}
