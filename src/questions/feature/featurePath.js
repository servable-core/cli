
export default ({
  _clinextType: "question",
  type: 'string',
  message: "Choose a feature",
  promptType: "file-tree-selection",
  name: "featurePath",
  onlyShowDir: true,
  root: "./",
  onlyShowValid: false,
  enableGoUpperDirectory: true,
  hideRoot: false,
  hideChildrenOfValid: true,
  hideValidationErrorMessage: true,
  validators: [{
    id: 'isFeature'
  }],
  transformers: [
    {
      modes: ['display'],
      id: "isFolderFeature"
    }
  ]
})

