/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { payload, repositoryName } = props

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'githubUsername',
        }
    })

    const _repositoryName = repositoryName ? repositoryName : payload.completedProtocolId

    payload.repositoryUrl = `https://github.com/${payload.githubUsername}/${_repositoryName}`
}
