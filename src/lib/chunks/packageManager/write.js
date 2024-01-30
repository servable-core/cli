export default async (props) => {
  const { destination = CliNext.payload.destination,
    installDependencies = CliNext.payload.installDependencies,
    packageManager = CliNext.payload.packageManager
  } = props

  await CliNext.fs.chunks.copy({
    destination,
    source: '{.}npmignore',
  })

  switch (packageManager) {
    case 'yarn': {
      await CliNext.fs.chunks.copy({
        destination,
        source: '{.}yarnrc',
      })
    } break
    case 'pnpm': {
      await CliNext.fs.chunks.copy({
        destination,
        source: '{.}npmrc-pnpm',
      })
    } break
    default: {

    } break
  }


  if (installDependencies) {
    await CliNext.packagerManager.installDependencies({ destination, packageManager })
  }
}
