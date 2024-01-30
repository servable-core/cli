/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "./lib/projectPackageJson.js"

export default async (props) => {
  const { toolbox, } = props

  const projectFolder = toolbox.payload.appPath
  const featureTargetFolder = toolbox.payload.destination
  const featureId = toolbox.payload.featureId

  const packageJson = await projectPackageJson(projectFolder)
  if (!packageJson) {
    return
  }

  packageJson.dependencies = {
    ...(packageJson.dependencies ? packageJson.dependencies : {}),
    [featureId]: `file:${featureTargetFolder}`
  }

  const packageJsonPath = `${projectFolder}/package.json`
  toolbox.fs.writeJSON(toolbox.destinationPath(packageJsonPath), packageJson)
}
