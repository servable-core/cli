import fs from 'fs'
import isFolderProtocol from '../../../prompts/targetProtocol/lib/isFolderProtocol.js'

export default async (folder) => {

    try {
        if (!(await isFolderProtocol(folder))) {
            return true
        }

        const targetPath = `${folder}/servable.config.js`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        // const data = JSON.parse(rawdata)
        return rawdata
    } catch (e) {
        console.error(e)
        return false
    }
}
