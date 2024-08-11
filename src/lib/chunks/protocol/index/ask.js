import capitalizeFirstLetter from '../../../newlib/capitalizeFirstLetter.js'

export default async () => {

  await CliNext.prompt.ask(
    [
      // {
      //   name: 'protocolName',
      // },
      {
        name: 'protocolDescription',
      },
      // {
      //   name: 'homepageUrl',
      // },
      // {
      //   name: 'protocolDefaultSlug',
      // },
      // {
      //   name: 'protocolGithubId',
      // },
      // {
      //   name: 'authorName',
      // },
      // {
      //   name: 'authorEmail',
      // },
      // {
      //   name: 'authorUrl',
      // },
      // {
      //   name: 'authorGithubUrl',
      // },
      {
        name: 'license',
      },
    ])

  if (!CliNext.payload.protocolName) {
    const name = capitalizeFirstLetter(CliNext.payload.protocolId)
    CliNext.payload.protocolName = name
  }

  if (!CliNext.payload.protocolHomepageUrl) {
    CliNext.payload.protocolHomepageUrl = ""
  }

  if (!CliNext.payload.protocolDefaultSlug) {
    CliNext.payload.protocolDefaultSlug = CliNext.payload.protocolId
  }

  if (!CliNext.payload.protocolHowTo) {
    CliNext.payload.protocolHowTo = ""
  }

  // if (!CliNext.payload.protocolEngine) {
  //   CliNext.payload.protocolHomepageUrl = "@servable-community/parse-server-engine"
  // }

  if (!CliNext.payload.protocolIconUrl) {
    CliNext.payload.protocolIconUrl = ""
  }

  if (!CliNext.payload.authorName) {
    CliNext.payload.authorName = ""
  }

  if (!CliNext.payload.authorEmail) {
    CliNext.payload.authorEmail = ""
  }

  if (!CliNext.payload.authorUrl) {
    CliNext.payload.authorUrl = ""
  }

  if (!CliNext.payload.authorGithubUrl) {
    CliNext.payload.authorGithubUrl = ""
  }

  if (!CliNext.payload.repositoryUrl) {
    CliNext.payload.repositoryUrl = ""
  }

  return true
}
