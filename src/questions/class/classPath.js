
export default ({
  _clinextType: "question",
  type: 'string',
  message: "Choose a class",
  promptType: "file-tree-selection",
  name: "classPath",
  onlyShowDir: true,
  root: "./",
  onlyShowValid: false,
  enableGoUpperDirectory: true,
  hideRoot: false,
  hideChildrenOfValid: true,
  hideValidationErrorMessage: true,
  validators: [{
    id: 'isClass'
  }],
  transformers: [
    {
      modes: ['out', 'display'],
      id: 'isFolderClass'
    }
  ]
})

