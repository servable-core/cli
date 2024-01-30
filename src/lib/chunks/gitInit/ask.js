
export default async () => {
  await CliNext.prompt.ask(
    [
      {
        name: 'gitInit',
      },])
  return true
}
