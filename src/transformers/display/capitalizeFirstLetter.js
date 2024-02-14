import capitalizeFirstLetter from '../../lib/newlib/capitalizeFirstLetter.js'

export default ({
  type: "tranformer",
  modes: ["display"],
  id: "capitalizeFirstLetter",
  handler: ({ input, }) => {
    if (!input || !input.length) {
      return input
    }
    return capitalizeFirstLetter(input)
  }
})
