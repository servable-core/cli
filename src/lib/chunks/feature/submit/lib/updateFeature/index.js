/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import featureIndex from "../../../../../newactions/featureIndex.js"

export default async () => {

  try {
    const index = await featureIndex(CliNext.payload.featurePath)
    index.registry = {
      id: CliNext.payload.registryUniqueRef
    }
    const targetPath = `${CliNext.payload.featurePath}/index.json`
    await CliNext.fs.writeJSON({ destination: targetPath, text: index })
    return true
  } catch (e) {
    console.error(e)
  }

  return false
}

