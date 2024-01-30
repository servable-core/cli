export default async () => {
  await CliNext.prompt.ask([
    {
      name: 'releaseType',
    },
  ])
}
