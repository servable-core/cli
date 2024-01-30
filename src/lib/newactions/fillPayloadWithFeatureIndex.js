import featureIndex from "./featureIndex.js"

export default async (props) => {
  const { featurePath } = props

  const index = await featureIndex(featurePath)
  if (!index) {
    return
  }
  CliNext.payload._featureIndex = index

  CliNext.payload.featureId = index.id
  CliNext.payload.description = index.author.description
  CliNext.payload.license = index.license
  CliNext.payload.name = index.name
  if (index.author) {
    CliNext.payload.authorName = index.author.name
    CliNext.payload.authorEmail = index.author.email
    CliNext.payload.url = index.author.url
    CliNext.payload.github = index.author.github
  }
  CliNext.payload.repositoryUrl = ''
  CliNext.payload.homepageUrl = ''
}
