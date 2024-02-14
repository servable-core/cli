
export default ({
  _clinextType: "question",
  name: 'featureDescription',
  type: 'string',
  promptType: 'input',
  message: 'Feature description',
  defaultValue: '',
  transformers: [
    {
      modes: ['out', 'display'],
      id: "capitalizeFirstLetter"
    }
  ]
})
