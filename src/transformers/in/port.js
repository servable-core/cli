import getPortOrRandom from "../../lib/port/getPortOrRandom.js"
import getPortNear from "../../lib/port/getPortNear.js"

export default ({
  type: "tranformer",
  position: "in",
  id: "getPort",
  handler: async ({ toolbox, question, item }) => {
    const { params = {} } = item
    const { type = 'near' } = params
    const value = question.defaultValue
    let _port = value ? value : 5000
    switch (type) {
      case 'random': {
        _port = await getPortOrRandom({ port: _port })
      } break
      case 'near':
      default: {
        _port = await getPortNear({ port: _port })
        break
      }
    }

    return {
      ...question,
      defaultValue: _port
    }
  }
})
