import capitalizeFirstLetter from '../../../newlib/capitalizeFirstLetter.js'

export default async () => {

  await CliNext.prompt.ask(
    [
      // {
      //   name: 'featureName',
      // },
      {
        name: 'featureDescription',
      },
      // {
      //   name: 'homepageUrl',
      // },
      // {
      //   name: 'featureDefaultSlug',
      // },
      // {
      //   name: 'featureGithubId',
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

  if (!CliNext.payload.featureName) {
    const name = capitalizeFirstLetter(CliNext.payload.featureId)
    CliNext.payload.featureName = name
  }

  if (!CliNext.payload.featureHomepageUrl) {
    CliNext.payload.featureHomepageUrl = ""
  }

  if (!CliNext.payload.featureDefaultSlug) {
    CliNext.payload.featureDefaultSlug = CliNext.payload.featureId
  }

  if (!CliNext.payload.featureHowTo) {
    CliNext.payload.featureHowTo = ""
  }

  // if (!CliNext.payload.featureFrameworkBridge) {
  //   CliNext.payload.featureHomepageUrl = "@servable-community/parse-server-engine"
  // }

  if (!CliNext.payload.featureIconUrl) {
    CliNext.payload.featureIconUrl = ""
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
