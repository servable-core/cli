/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "../../lib/projectPackageJson.js"

export default async (props) => {
    const { toolbox, payload, } = props

    const projectFolder = payload.desiredWriteDestinationPathAbsolute

    const packageJson = await projectPackageJson(projectFolder)
    if (!packageJson) {
        return
    }

    const existingProtocol = payload.existingProtocol

    existingProtocol.packages.forEach(item => {
        const { id, description, type, uri, version = 'latest' } = item
        const _version = uri ? uri : version
        if (packageJson.dependencies[id]) {
            delete packageJson.dependencies[id]
        }
        packageJson.dependencies = {
            ...(packageJson.dependencies ? packageJson.dependencies : {}),
            [id]: _version
        }
    })

    const packageJsonPath = `${projectFolder}/package.json`
    toolbox.fs.writeJSON(toolbox.destinationPath(packageJsonPath), packageJson)
}
