
export default async () => {
  await CliNext.prompt.ask(
    [
      {
        name: 'packageManager',
      },
      {
        name: 'installDependencies',
      }])
  return true
}
