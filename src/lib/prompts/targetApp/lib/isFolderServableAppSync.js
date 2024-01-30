import fs from 'fs'

export default (folder) => {
    try {
        if (!folder || !folder.length) {
            return false
        }
        if (!fs.lstatSync(folder).isDirectory()) {
            return false
        }

        const targetPath = `${folder}/servable.config.js`
        const exists = fs.existsSync(targetPath)
        return exists
    } catch (e) {
        return false
    }
}
