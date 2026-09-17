// Real bug, found via checkJs (lucide, PEAKUB DX initiative): this resolved to
// <repo-root>/lib/checkFileExists.js (three levels up from src/lib/lib/, past the package
// root entirely) - `import()`ing this file has always thrown ERR_MODULE_NOT_FOUND. Confirmed
// live: this function is imported by src/validators/isServableApp.js and two prompt flows
// (targetApp, questions/app/appPath), so "is this folder a servable app" validation during
// scaffolding has been broken for as long as this file has looked like this.
import checkFileExists from './checkFileExists.js'

export default async (folder) => {
    try {
        const targetPath = `${folder}/servable.config.js`
        console.log(`→ targetPath ${targetPath}.\n`)
        return checkFileExists(targetPath)
    } catch (e) {
        return false
    }
}
