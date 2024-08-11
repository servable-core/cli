import path from "path"
import chalk from 'chalk'
import isFolderProtocolSync from "../../lib/lib/isFolderProtocolSync.js"

export default ({
  type: "tranformer",
  modes: ["display"],
  id: "isFolderProtocol",
  handler: ({ toolbox, input, item }) => {
    if (!input || !input.length) {
      return input
    }

    const _name = input.split(path.sep).pop()
    const isServable = isFolderProtocolSync(input)
    return isServable ? `${chalk.underline(_name)} 🐝 ` : `${_name}`
  }
})
