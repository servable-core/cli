/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "./askForGeneric.js"
import _ from 'underscore'

export default async props => {
    const { parameter, protocol } = props
    if (!parameter || !parameter.prompt) {
        return
    }
    const {
        id,
        prompt: {
            type,
            message,
            defaultValue,
            vacuity = "mandatory",
            validators } } = parameter
    const defaultValidation = defaultValidationForVacuity(vacuity)

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type,
            name: id,
            message: `[${protocol.name}] → ${message} (${labelForVacuity(vacuity)})`,
            defaultValue: parameter.prompt.default,
            validate: v => {
                const isEmpty = _.isEmpty(v)

                const _default = (() => {
                    switch (vacuity) {
                        case "mandatory": return !isEmpty
                        default: return true
                    }
                })()

                if (!validators || !validators.length) {
                    return _default
                }

                // for (var i = 0; i < validators.length; i++) {
                //     if (!validators[i](v)) {
                //         return false
                //     }
                // }
                return _default
            }
        }
    })
}


const defaultValidationForVacuity = (vacuity) => {
    switch (vacuity) {
        case "mandatory": return false
        default: return true
    }
}

const labelForVacuity = (vacuity) => {
    switch (vacuity) {
        default: return vacuity
    }
}
