import updatePackageForAddedProtocol from "../../../newactions/updatePackageForAddedProtocol/index.js"
import updateClassForEjectedProtocol from "../../../newactions/updateClassForEjectedProtocol/index.js"


export default async () => {
  await updatePackageForAddedProtocol()
  await updateClassForEjectedProtocol()
}

