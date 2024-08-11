/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "./lib/projectPackageJson.js"

export default async (props) => {
  const { toolbox, } = props

  const projectFolder = toolbox.payload.appPath
  const protocolTargetFolder = toolbox.payload.destination
  const protocolId = toolbox.payload.protocolId

  const packageJson = await projectPackageJson(projectFolder)
  if (!packageJson) {
    return
  }

  packageJson.dependencies = {
    ...(packageJson.dependencies ? packageJson.dependencies : {}),
    [protocolId]: `file:${protocolTargetFolder}`
  }

  const packageJsonPath = `${projectFolder}/package.json`
  toolbox.fs.writeJSON(toolbox.destinationPath(packageJsonPath), packageJson)
}
