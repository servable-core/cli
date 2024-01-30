import fs from './lib/fs.js'

export default ({
  id: "fractions",
  description: "Adds fractions capacity",
  register: async ({ toolbox }) => {
    await fs({ toolbox })
  }
})
