import protocolSchemaOwnClasses from "../../../newlib/classInformations/lib/protocolSchemaOwnClasses.js"

export default async ({
  protocolPath = CliNext.payload.protocolPath
} = {}) => {

  const ownClasses = await protocolSchemaOwnClasses(protocolPath)
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
