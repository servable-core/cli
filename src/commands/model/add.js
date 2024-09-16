import Chunk from '../../lib/chunks/model/content/index.js'

export default ({
  _clinextType: "command",
  name: 'add',
  description: 'Add an empty model to a protocol 🐝',
  questions: [
    {
      name: 'protocolPath',
      message: "Protocol to add a model to",
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
  example: "$0 model new",
  handler: async () => {
    let pass = await Chunk.ask()

    if (!pass) {
      return
    }

    await Chunk.write()
  },
})
