import Chunk from '../../lib/chunks/class/content/index.js'

export default ({
  _clinextType: "command",
  name: 'add',
  description: 'Add an empty model to a feature 🐝',
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
    let pass = await Chunk.ask()

    if (!pass) {
      return
    }

    await Chunk.write()
  },
})
