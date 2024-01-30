import capitalizeFirstLetter from '../../lib/newlib/capitalizeFirstLetter.js'

export default ({
  type: "tranformer",
  position: "out",
  id: "capitalizeFirstLetter",
  handler: ({ input, }) => {
    return capitalizeFirstLetter(input)
  }
})
