import updatePackageForAddedFeature from "../../../newactions/updatePackageForAddedFeature/index.js"
import updateClassForEjectedFeature from "../../../newactions/updateClassForEjectedFeature/index.js"


export default async () => {
  await updatePackageForAddedFeature()
  await updateClassForEjectedFeature()
}

