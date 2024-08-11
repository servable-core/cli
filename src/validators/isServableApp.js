import isFolderServableAppSync from '../lib/lib/isFolderServableAppSync.js'

export default ({
  id: "isServableApp",
  handler: async ({ input, params }) => {
    return {
      isValid: input ? isFolderServableAppSync(input) : false,
      message: 'Not a protocol folder'
    }
  }
})
