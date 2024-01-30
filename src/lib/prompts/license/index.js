/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props

    if (!force && payload.promptGroupsPassed.license) {
        return
    }

    await askForGeneric({
        ...props,
        options: {
            ...props.options,
            type: "list",
            name: "license",
            choices: [
                "Apache 2.0",
                "MIT",
                "Mozilla Public License 2.0",
                "BSD 2-Clause (FreeBSD) License",
                "BSD 3-Clause (FreeBSD) License",
                "Internet Systems Consortium (ISC) License",
                "GNU AGPL 3.0",
                // (new inquirer.Separator()),
            ],
        }
    })
    props.payload.promptGroupsPassed.license = true
}
