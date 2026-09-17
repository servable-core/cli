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

import * as dotenv from 'dotenv'
import search from './search.js'
import getById from './getById.js'
import askForGeneric from '../../utils/askForGeneric.js'
dotenv.config()

export default async (props) => {
    const { toolbox, payload } = props
    // const u = "https://api.registry.servablecommunity.com"

    const communityProtocolIdToImport = await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'autocomplete',
            name: 'communityProtocolIdToImport',
            suggestOnly: false,
            message: 'Community protocol to import',
            searchText: 'Searching...',
            emptyText: 'Nothing found!',
            source: search,
            pageSize: 4,
            validate(val) {
                return val ? true : 'Type something!'
            },
            transformer: (name,) => {
                if (!name) {
                    return name
                }

                return name
            }
        }
    })

    const item = await getById({ id: communityProtocolIdToImport })
    payload.existingProtocol = item
}
