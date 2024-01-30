export default async (props) => {
  const { destination = CliNext.payload.destination } = props

  CliNext.payload.featureCategories = CliNext.payload.featureCategories ? CliNext.payload.featureCategories : ''
  await CliNext.fs.chunks.copy({
    destination,
    source: '**/*',
  })
}
