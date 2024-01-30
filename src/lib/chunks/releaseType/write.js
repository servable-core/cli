export default async (props) => {
  const { destination = CliNext.payload.destination } = props
  switch (CliNext.payload.releaseType) {
    case 'github': {
      await CliNext.fs.chunks.copy({
        destination,
        source: '.github/**/*',
      })
    } break
    case 'gitlab': {
      await CliNext.fs.chunks.copy({
        destination,
        source: 'gitlab-ci.yml',
      })
    } break
    default: {

    } break
  }
}
