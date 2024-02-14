
export default ({
  _clinextType: "question",
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


