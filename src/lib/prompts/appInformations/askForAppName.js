/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import path from "path";
import askForGeneric from "../utils/askForGeneric.js";

export default async (props) => {
    const { toolbox, payload } = props

    let defaultValue = toolbox.options['destination'] ? path.basename(toolbox.destinationPath()) : '';
    // if (!defaultValue) {
    //     defaultValue = randomName()
    // }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appName',
            defaultValue
        }
    })
}
