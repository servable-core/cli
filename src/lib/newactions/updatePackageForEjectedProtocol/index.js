/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "../../newlib/projectPackageJson.js"

export default async (props) => {

  const {
    appPath = CliNext.payload.appPath,
    destination = CliNext.payload.destination,
    protocolId = CliNext.payload.protocolId,
  } = props

  const packageJson = await projectPackageJson(appPath)
  if (!packageJson) {
    return
  }

  packageJson.dependencies = {
    ...(packageJson.dependencies ? packageJson.dependencies : {}),
    [protocolId]: `file:${destination}`
  }

  const packageJsonPath = `${appPath}/package.json`
  return CliNext.fs.writeJSON({ text: packageJson, destination: packageJsonPath })
}
