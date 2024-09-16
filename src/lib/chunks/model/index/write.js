export default async (props) => {
  const { destination = CliNext.payload.destination } = props

  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })
}
