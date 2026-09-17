import submitProtocol from "./lib/submitProtocol/index.js"
import updateProtocol from "./lib/updateProtocol/index.js"

export default async (props) => {


  const path = CliNext.payload.protocolPath

  // A `switch (registrySubmitMode) { case 'update': {} case 'create': {} }` used to sit here -
  // both branches were empty no-ops, and `registrySubmitMode` is already passed straight through
  // to `submitProtocol()` below regardless of which branch would have matched, so the whole
  // switch had no effect either way; removed (found via eslint's `no-empty`, lucide/PEAKUB DX
  // initiative).
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

