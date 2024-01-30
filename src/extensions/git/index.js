

export default ({
  id: "git",
  description: "Handles git",
  register: async ({ toolbox }) => {
    toolbox.git = {
      init: async ({ destination, }) => {
        const options = {
          cwd: destination
        }
        await toolbox.spawn('git', ['init', '--quiet', '--initial-branch=main'], options)
      },
      initBranches: async ({ destination, }) => {
        const options = {
          cwd: destination
        }
        //#TODO
        // await toolbox.spawn('git', ['init', '--quiet', '--initial-branch=main'], options)
        // git checkout -b beta
        // git checkout -b alpha
        // git checkout -b next
        // git checkout -b next-major

        // git checkout main
      }
    }
  }
})
