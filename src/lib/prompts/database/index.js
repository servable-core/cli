/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForGenericPort from "../utils/askForGenericPort.js"

import validateNumber from "../../lib/validateNumber.js"
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { toolbox, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.database) {
        return
    }

    toolbox.ui.drawSectionHeader({
        toolbox,
        title: `App database 💿`,
        subTitle: `Servable handles both mongodb and PostGreSQL databases.`
    })

    await askForGeneric({
        ...props,
        options: {

            type: 'list',
            name: 'appDatabaseType',
            choices: [{
                name: 'Mongo DB (required for standalone distribution)',
                value: 'mongodb',
            }, {
                name: 'PostGresQL',
                value: 'postGresQL',
                checked: true,
            },]
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appDatabasePort',
            message: 'App database port?',
            port: { value: 27017, },
            validate: validateNumber
        }
    })


    payload.databaseURI = `mongodb://root:DATABASE_PASSWORD_TO_CHANGE@localhost:${payload.appDatabasePort}/app?authSource=admin&readPreference=primary&ssl=false`
    payload.promptGroupsPassed.database = true
}
