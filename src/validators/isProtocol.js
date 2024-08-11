import isFolderProtocolSync from '../lib/lib/isFolderProtocolSync.js'

export default ({
  id: "isProtocol",
  handler: async ({ input, params }) => {
    return {
      isValid: input ? isFolderProtocolSync(input) : false,
      message: 'Not a protocol folder'
    }
  }
})
