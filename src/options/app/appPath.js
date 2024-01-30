
export default ({
  _clinextType: "option",
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
  transformers: {
    display: [{
      id: 'isFolderServableApp'
    }]
  }
})
