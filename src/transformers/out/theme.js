
export default ({
  type: "tranformer",
  modes: ["out"],
  id: "theme",
  handler: async ({ value,
  }) => {
    return value ? value + 3 : null
  }
})
