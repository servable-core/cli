import checkFileExists from '../../../lib/checkFileExists.js'
import fs from 'fs'
import existsAsync from './existsAsync.js'

export default async (folder) => {
    try {
        // if (!(fs.exists(folder))) {
        if (!(await existsAsync(folder))) {
            return false
        }

        if (!fs.lstatSync(folder).isDirectory()) {
            return false
        }

        let content = await fileContent(`${folder}/module.json`)
        if (!content) {
            content = await fileContent(`${folder}/index.json`)
        }
        if (!content) {
            return false
        }
        return content.type === 'protocol'
    } catch (e) {
        return false
    }
}

const fileContent = async (filePath) => {
    if (!(await checkFileExists(filePath))) {
        return null
    }
    const rawdata = await fs.promises.readFile(filePath, 'utf8')
    return JSON.parse(rawdata)
}
