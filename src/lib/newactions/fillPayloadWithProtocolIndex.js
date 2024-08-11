import protocolIndex from "./protocolIndex.js"

export default async (props) => {
  const { protocolPath } = props

  const index = await protocolIndex(protocolPath)
  if (!index) {
    return
  }
  CliNext.payload._protocolIndex = index

  CliNext.payload.protocolId = index.id
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
