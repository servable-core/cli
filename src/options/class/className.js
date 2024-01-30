// import capitalizeFirstLetter from "../../lib/newlib/capitalizeFirstLetter"

export default ({
  _clinextType: "option",
  name: 'className',
  type: 'string',
  promptType: 'input',
  message: 'Classname',
  transformers: {
    display: [{
      handler: ({ input }) => capitalizeFirstLetter(input)
    }],
    out: [{
      handler: async ({ input }) => capitalizeFirstLetter(input)
    }]
  }
})

const capitalizeFirstLetter = (string) => {
  if (!string || string.length === 0) {
    return string
  }
  let hasUnderscore = string.charAt(0) === "_"
  if (hasUnderscore && string.length === 1) {
    return string
  }
  const firstLetterCharIndex = hasUnderscore ? 1 : 0
  switch (firstLetterCharIndex) {
    case 1:
      return `_${string.charAt(1).toUpperCase() + string.slice(2)}`
    default:
      return string.charAt(firstLetterCharIndex).toUpperCase() + string.slice(1)
  }

}

