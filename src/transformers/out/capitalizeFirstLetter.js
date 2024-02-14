import capitalizeFirstLetter from '../../lib/newlib/capitalizeFirstLetter.js'

export default ({
  type: "tranformer",
  modes: ["out"],
  id: "capitalizeFirstLetter",
  handler: ({ input, }) => {
    return capitalizeFirstLetter(input)
  }
})
