/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import { documentFeature, ManifestEnums, extractFeature } from '@servable/tools'
import featureIndex from '../../../../../lib/featureIndex.js'

export default async (props) => {
  try {
    const { path, } = props
    // console.log(cccomputeSchema)

    const index = await featureIndex(path)

    const manifest = await extractFeature({
      path,
      dataTemplateType: ManifestEnums.DataTemplateType.Feature
    })

    const documentation = await documentFeature({ path, write: false })

    // toolbox.log('payload', { manifest, documentation, index })
    return { manifest, documentation, index }
  } catch (e) {
    console.error(e)
  }
  return null
}

