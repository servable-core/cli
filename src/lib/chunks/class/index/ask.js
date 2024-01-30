import featureSchemaOwnClasses from "../../../newlib/classInformations/lib/featureSchemaOwnClasses.js"

export default async ({
  featurePath = CliNext.payload.featurePath
} = {}) => {

  const ownClasses = await featureSchemaOwnClasses(featurePath)
  await CliNext.prompt.ask([
    {
      name: 'className',
      validators: [{
        handler: async ({ input }) => {
          if (!input) {
            return {
              isValid: false,
              message: "Can't be empty"
            }
          }
          const classNames = ownClasses.map(c => c.className.toLowerCase())
          if (!classNames.includes(input.toLowerCase())) {
            return {
              isValid: true,
            }
          }
          return {
            isValid: false,
            message: "Class name exists"
          }
        }
      }]
    },
  ])

  await CliNext.prompt.ask(
    [
      {
        name: 'classDescription',
      }
    ])

  return true
}
