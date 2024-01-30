import path from "path"
import chalk from 'chalk'
import isFolderServableAppSync from "../../lib/lib/isFolderServableAppSync.js"

export default ({
  type: "tranformer",
  position: "display",
  id: "isFolderServableApp",
  handler: ({ toolbox, input, item }) => {
    if (!input || !input.length) {
      return input
    }

    const name = input.split(path.sep).pop()
    const isServable = isFolderServableAppSync(input)
    return isServable ? `${chalk.underline(name)} 🐻` : `${name}`
  }
})
