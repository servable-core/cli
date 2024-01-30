
export default ({
  _clinextType: 'command',
  name: 'servable',
  description: 'Servable Framework CLI 🐻',
  options: [
    {
      name: 'quick',
      type: 'boolean',
      alias: 'q',
      description: 'Quick mode, skip all optional prompts and use defaults',
      global: true
    },
    {
      name: 'verbose',
      type: 'boolean',
      alias: 'v',
      description: 'Be more verbose',
      global: true
    },
    {
      name: 'dry-run',
      type: 'boolean',
      alias: 'n',
      description: 'Dry run',
      global: true
    },
  ],
  example: "$0",
  handler: async () => {

  },
})
