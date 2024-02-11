
export default ({
  id: "nonempty",
  handler: async ({ input, params }) => {
    return {
      isValid: !(input === null || input === undefined),
      message: 'Should not be empty'
    }
  }
})

