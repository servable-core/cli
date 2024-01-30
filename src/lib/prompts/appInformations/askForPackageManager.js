/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import askForGeneric from "../utils/askForGeneric.js";


export default async (props) => askForGeneric({
    ...props, options: {
        ...props.options,
        type: 'list',
        name: 'packageManager',
        choices: [{
            name: 'yarn',
            value: 'yarn'
        },
        {
            name: 'npm',
            value: 'npm'
        }, {
            name: 'pnpm',
            value: 'pnpm'
        }]
    }
})
