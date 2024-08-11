
export default ({
  _clinextType: "question",
  name: 'protocolDescription',
  type: 'string',
  promptType: 'input',
  message: 'Protocol description',
  defaultValue: '',
  transformers: [
    {
      modes: ['out', 'display'],
      id: "capitalizeFirstLetter"
    }
  ]
})
