

export default ({
  id: "packagemanager",
  description: "Handles package manager",
  register: async ({ toolbox }) => {
    toolbox.packagerManager = {
      installDependencies: async ({ destination, packageManager }) => {
        const options = {
          cwd: destination
        }
        switch (packageManager) {
          case 'yarn': {
            await toolbox.spawn('yarn', [], options)
          } break
          case 'npm': {
            await toolbox.spawn('npm', ['install'], options)
          } break
          case 'pnpm': {

          } break
          default: {

          } break
        }
      }
    }
  }
})
