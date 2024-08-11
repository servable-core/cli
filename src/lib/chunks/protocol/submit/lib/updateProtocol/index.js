/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolIndex from "../../../../../newactions/protocolIndex.js"

export default async () => {

  try {
    const index = await protocolIndex(CliNext.payload.protocolPath)
    index.registry = {
      id: CliNext.payload.registryUniqueRef
    }
    const targetPath = `${CliNext.payload.protocolPath}/index.json`
    await CliNext.fs.writeJSON({ destination: targetPath, text: index })
    return true
  } catch (e) {
    console.error(e)
  }

  return false
}

