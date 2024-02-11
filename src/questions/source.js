import path from "path"

export default ({
  _clinextType: "option",
  type: 'string',
  alias: 'd',
  message: "Choose a source",
  promptType: "file-tree-selection",
  name: "source",
  onlyShowDir: true,
  root: "./",
  onlyShowValid: false,
  enableGoUpperDirectory: true,
  hideRoot: false,
  hideChildrenOfValid: false,
  hideValidationErrorMessage: true,
  transformer: (name,) => {
    if (!name || !name.length) {
      return ''
    }

    const _name = name.split(path.sep).pop()
    return `${_name}`
  }
})
