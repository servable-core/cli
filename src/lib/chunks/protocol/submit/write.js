import submitProtocol from "./lib/submitProtocol/index.js"
import updateProtocol from "./lib/updateProtocol/index.js"

export default async (props) => {


  const path = CliNext.payload.protocolPath

  switch (CliNext.payload.registrySubmitMode) {
    case 'update': {

    } break
    case 'create': {

    } break
  }

  const submitted = await submitProtocol({
    path,
    mode: CliNext.payload.registrySubmitMode,
    uniqueRef: CliNext.payload.registryUniqueRef
  })

  if (!submitted) {
    return false
  }

  return updateProtocol()
}

