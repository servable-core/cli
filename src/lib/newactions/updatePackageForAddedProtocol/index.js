/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "../../newlib/projectPackageJson.js"

export default async (props = {}) => {
  const { appPath = CliNext.payload.appPath } = props

  const packageJson = await projectPackageJson(appPath)
  if (!packageJson) {
    return
  }

  const existingProtocol = CliNext.payload._communityProtocolToUse

  const { id, version = 'latest' } = existingProtocol.index
  if (packageJson.dependencies[id]) {
    delete packageJson.dependencies[id]
  }
  packageJson.dependencies = {
    ...(packageJson.dependencies ? packageJson.dependencies : {}),
    [id]: version
  }


  const packageJsonPath = `${appPath}/package.json`
  CliNext.fs.writeJSON({ destination: packageJsonPath, text: packageJson })
}
