import checkFileExists from '../../../lib/checkFileExists.js'

export default async (folder) => {
    try {
        const targetPath = `${folder}/servable.config.js`
        console.log(`→ targetPath ${targetPath}.\n`)
        return checkFileExists(targetPath)
    } catch (e) {
        return false
    }
}
