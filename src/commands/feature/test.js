
export default ({
  _clinextType: "command",
  name: 'test',
  description: 'Test a feature',
  options: [
    {
      name: 'featurePath',
      message: "Feature to add a model to",
      // validators: [{ id: 'nonempty' }]
    },
    {
      name: 'className',
      validators: [{
        id: 'nonEmpty'
      }]
    },
    {
      name: 'classDescription',
      validators: [{
        id: 'nonEmpty'
      }]
    },
    {
      name: 'license',
    },
  ],
  example: "$0 class new",
  handler: async () => {

  },
})
