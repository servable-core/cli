export default async (props) => {
  const { destination = CliNext.payload.destination } = props

  CliNext.payload.protocolCategories = CliNext.payload.protocolCategories ? CliNext.payload.protocolCategories : ''
  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })
}
