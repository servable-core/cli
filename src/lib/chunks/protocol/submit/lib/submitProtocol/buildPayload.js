/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import { documentProtocol, ManifestEnums, extractProtocol } from '@servable/tools'
import protocolIndex from '../../../../../lib/protocolIndex.js'

export default async (props) => {
  try {
    const { path, } = props
    // console.log(cccomputeSchema)

    const index = await protocolIndex(path)

    const manifest = await extractProtocol({
      path,
      dataTemplateType: ManifestEnums.DataTemplateType.Protocol
    })

    const documentation = await documentProtocol({ path, write: false })

    // toolbox.log('payload', { manifest, documentation, index })
    return { manifest, documentation, index }
  } catch (e) {
    console.error(e)
  }
  return null
}

