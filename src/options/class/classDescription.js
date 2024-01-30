
export default ({
  _clinextType: "option",
  name: 'classDescription',
  type: 'string',
  promptType: 'input',
  message: 'Class description',
  defaultValue: '',
  transformers: {
    display: ["capitalizeFirstLetter"],
    out: ["capitalizeFirstLetter"]
  }
})


