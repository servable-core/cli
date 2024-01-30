/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "../../newlib/projectPackageJson.js"

export default async (props) => {

  const {
    appPath = CliNext.payload.appPath,
    destination = CliNext.payload.destination,
    featureId = CliNext.payload.featureId,
  } = props

  const packageJson = await projectPackageJson(appPath)
  if (!packageJson) {
    return
  }

  packageJson.dependencies = {
    ...(packageJson.dependencies ? packageJson.dependencies : {}),
    [featureId]: `file:${destination}`
  }

  const packageJsonPath = `${appPath}/package.json`
  return CliNext.fs.writeJSON({ text: packageJson, destination: packageJsonPath })
}
