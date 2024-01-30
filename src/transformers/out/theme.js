
export default ({
  type: "tranformer",
  position: "out",
  id: "theme",
  handler: async ({ value,
  }) => {
    return value ? value + 3 : null
  }
})
