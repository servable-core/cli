/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
// @ts-nocheck - lucide (PEAKUB DX initiative): dead code, found via checkJs. Confirmed
// unreachable (no importer anywhere in this package) and depends on 'yeoman-toolbox', which
// isn't a real dependency of this package either - an abandoned prompt-flow attempt.

/**
 * @param {import('yeoman-toolbox')} toolbox
 * @param {object} payload
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
