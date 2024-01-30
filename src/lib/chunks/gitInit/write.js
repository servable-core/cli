export default async (props = {}) => {
  const {
    destination = CliNext.payload.destination,
    useDefaultGitgnore = false,
  } = props


  if (useDefaultGitgnore) {
    await CliNext.fs.chunks.copy({
      destination,
      source: '{.}gitignore',
    })
  }

  return CliNext.git.init({ destination })
}
