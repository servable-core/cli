import path from "path"
import chalk from 'chalk'
import isFolderClassSync from "../../lib/newlib/isFolderClassSync.js"


export default ({
  type: "tranformer",
  position: "display",
  id: "isFolderClass",
  handler: ({ toolbox, input, item }) => {
    if (!input || !input.length) {
      return input
    }

    const _name = input.split(path.sep).pop()
    const isCandidate = isFolderClassSync(input)
    return isCandidate ? `${chalk.underline(_name)} 🌸 ` : `${_name}`
  }
})
