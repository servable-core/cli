import getClassProtocols from "../../newlib/classProtocols/get.js"
import updateClassProtocols from "../../newlib/classProtocols/update.js"

export default async ({
  classPath = CliNext.payload.classPath,
  communityProtocolToUse = CliNext.payload._communityProtocolToUse
} = {}) => {

  let existingProtocols = await getClassProtocols(classPath)
  if (!existingProtocols) {
    existingProtocols = []
  }

  const { id, usage, } = communityProtocolToUse.index

  let protocol = {
    id,
    metadata: {
      // generatorVersion: generator.version,
      updatedAt: (new Date()),
    }
  }

  if (usage && usage.template && usage.template.params) {
    const { params, slug, name, id } = usage.template
    protocol = {
      ...protocol,
      name,
      id,
      slug,
      params
    }
  }

  let isTemplate = false
  if (usage && usage.parameters && usage.parameters.length) {
    isTemplate = true
  }

  existingProtocols.push(protocol)

  await updateClassProtocols({
    folder: classPath,
    items: existingProtocols,
    isTemplate
  })
}
