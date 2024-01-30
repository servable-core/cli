import checkFileExists from '../../../lib/checkFileExists.js'
import fs from 'fs'
// import existsAsync from './existsAsync.js'

export default async (folder) => {
    try {
        if (!(fs.existsSync(folder))) {
            return false
        }

        // fs.exists(path, function (exists) {
        //     resolve(exists)
        // })

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
        return content.type === 'class'
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
