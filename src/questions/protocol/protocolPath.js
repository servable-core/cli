
export default ({
  _clinextType: "question",
  type: 'string',
  message: "Choose a protocol",
  promptType: "file-tree-selection",
  name: "protocolPath",
  onlyShowDir: true,
  root: "./",
  onlyShowValid: false,
  enableGoUpperDirectory: true,
  hideRoot: false,
  hideChildrenOfValid: true,
  hideValidationErrorMessage: true,
  validators: [{
    id: 'isProtocol'
  }],
  transformers: [
    {
      modes: ['display'],
      id: "isFolderProtocol"
    }
  ]
})

