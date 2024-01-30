import submitFeature from "./lib/submitFeature/index.js"
import updateFeature from "./lib/updateFeature/index.js"

export default async (props) => {


  const path = CliNext.payload.featurePath

  switch (CliNext.payload.registrySubmitMode) {
    case 'update': {

    } break
    case 'create': {

    } break
  }

  const submitted = await submitFeature({
    path,
    mode: CliNext.payload.registrySubmitMode,
    uniqueRef: CliNext.payload.registryUniqueRef
  })

  if (!submitted) {
    return false
  }

  return updateFeature()
}

