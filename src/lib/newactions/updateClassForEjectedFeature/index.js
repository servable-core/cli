import getClassFeatures from "../../newlib/classFeatures/get.js"
import updateClassFeatures from "../../newlib/classFeatures/update.js"

export default async ({
  classPath = CliNext.payload.classPath,
  communityFeatureToUse = CliNext.payload._communityFeatureToUse
} = {}) => {

  let existingFeatures = await getClassFeatures(classPath)
  if (!existingFeatures) {
    existingFeatures = []
  }

  const { id, usage, } = communityFeatureToUse.index

  let feature = {
    id,
    metadata: {
      // generatorVersion: generator.version,
      updatedAt: (new Date()),
    }
  }

  if (usage && usage.template && usage.template.params) {
    const { params, slug, name, id } = usage.template
    feature = {
      ...feature,
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

  existingFeatures.push(feature)

  await updateClassFeatures({
    folder: classPath,
    items: existingFeatures,
    isTemplate
  })
}
