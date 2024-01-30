/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-toolbox')} toolbox
* @param {Object} payload
*/

import askForGeneric from '../utils/askForGeneric.js'

export default async (props) => askForGeneric({
    ...props, options: {
        ...props.options,
        type: 'list',
        name: 'appConfigurations',
        choices: [
            {
                name: 'Production (mandatory)',
                value: 'production',
                checked: true,
            }, {
                name: 'Staging (experimental)',
                value: 'staging',
            },
            // (new inquirer.Separator())
        ]
    }
})
