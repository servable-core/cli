
export default ({
  _clinextType: "question",
  type: 'string',
  message: "Choose a Servable app",
  promptType: "file-tree-selection",
  name: "appPath",
  onlyShowDir: true,
  root: "./",
  onlyShowValid: false,
  enableGoUpperDirectory: true,
  hideRoot: false,
  hideChildrenOfValid: true,
  hideValidationErrorMessage: true,
  validators: [{
    id: 'isServableApp'
  }],
  transformers:
    [{
      id: 'isFolderServableApp',
      modes: ['display'],
    }]
})
