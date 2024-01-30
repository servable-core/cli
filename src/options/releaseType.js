export default ({
  name: 'releaseType',
  type: 'string',
  promptType: 'list',
  alias: 'p',
  defaultValue: 'none',
  message: "Continuous release provider",
  choices: [
    {
      name: 'None',
      value: 'none'
    }, {
      name: 'Github actions',
      value: 'github'
    },
    {
      name: 'Gitlab CI',
      value: 'gitlab'
    },
  ]
})
