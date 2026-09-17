

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
            break
          }
          case 'npm': {
            await toolbox.spawn('npm', ['install'], options)
            break
          }
          case 'pnpm': {
            // Was an empty no-op branch - `pnpm` is a real, offered choice elsewhere (see
            // chunks/packageManager/write.js's own `case 'pnpm'`, which copies `.npmrc-pnpm`),
            // so picking it here silently installed nothing at all (found via eslint's
            // `no-empty`, lucide/PEAKUB DX initiative). Completed to match the yarn/npm pattern.
            await toolbox.spawn('pnpm', ['install'], options)
            break
          }
          default: {
            // No package manager selected - nothing to install.
            break
          }
        }
      }
    }
  }
})
