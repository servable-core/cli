
export default ({
  _clinextType: "option",
  name: 'featureDescription',
  type: 'string',
  promptType: 'input',
  message: 'Feature description',
  defaultValue: '',
  transformers: {
    display: ["capitalizeFirstLetter"],
    out: ["capitalizeFirstLetter"]
  }
})
