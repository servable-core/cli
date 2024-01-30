import isFolderFeatureSync from '../lib/lib/isFolderFeatureSync.js'

export default ({
  id: "isFeature",
  handler: async ({ input, params }) => {
    return {
      isValid: input ? isFolderFeatureSync(input) : false,
      message: 'Not a feature folder'
    }
  }
})
