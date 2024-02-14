
export default ({
  _clinextType: "option",
  name: 'classDescription',
  type: 'string',
  promptType: 'input',
  message: 'Class description',
  defaultValue: '',
  transformers: [
    {
      modes: ['out', 'display'],
      id: "capitalizeFirstLetter",
    }
  ]
})


