/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForGenericPort from "../utils/askForGenericPort.js"
import validateNumber from "../../lib/validateNumber.js"
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.distribution) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `Distribution ⠕`,
        subTitle: `Servable can use an arbiter.`
    })

    await askForGeneric({
        ...props,
        options: {
            type: 'list',
            name: 'appDistributionType',
            choices: [{
                name: 'Standalone',
                value: 'standalone',
                checked: true,
            }, {
                name: 'Distributed (requires a separate replicated mongo database deployment)',
                value: 'distributed',
            },]
        }
    })

    switch (payload.appDistributionType) {
        default: {
            payload.utilsDatabaseURI =
                `mongodb://root:DATABASE_PASSWORD_TO_CHANGE@localhost:${payload.appDatabasePort}/utils?authSource=admin&readPreference=primary&ssl=false`
            payload.promptGroupsPassed.distribution = true
            return
        }
        case 'distributed': break
    }

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appUtilsDatabasePort',
            message: 'App utils database port?',
            port: { value: 27018, },
            validate: validateNumber
        }
    })

    payload.utilsDatabaseURI = `mongodb://root:DATABASE_PASSWORD_TO_CHANGE@localhost:${payload.appUtilsDatabasePort}/utils?replicaSet=rs0&authSource=admin&readPreference=primary&ssl=false&directConnection=true`
    payload.promptGroupsPassed.distribution = true
}
