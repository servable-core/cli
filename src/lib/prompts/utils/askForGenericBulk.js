/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import Bluebird from "bluebird"
import askForGeneric from "./askForGeneric.js"
import _ from 'underscore'

export default async (props) => {
    const {
        items } = props

    return Bluebird.Promise.mapSeries(
        items,
        async item => {
            const _item = _.isObject(item) ? item : { name: item }
            return askForGeneric({
                ...props,
                options: {
                    ...props.options,
                    ..._item
                }
            })
        })
}
