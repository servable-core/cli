import path from "path"
import chalk from 'chalk'
import isFolderFeatureSync from "../../lib/lib/isFolderFeatureSync.js"

export default ({
  type: "tranformer",
  modes: ["display"],
  id: "isFolderFeature",
  handler: ({ toolbox, input, item }) => {
    if (!input || !input.length) {
      return input
    }

    const _name = input.split(path.sep).pop()
    const isServable = isFolderFeatureSync(input)
    return isServable ? `${chalk.underline(_name)} 🐝 ` : `${_name}`
  }
})
