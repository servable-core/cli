/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload } = props
    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'confirm',
            name: 'launchLocalInfraDocker',
            message: 'Add a local docker infrastructure?',
            defaultValue: false
        }
    })
}
