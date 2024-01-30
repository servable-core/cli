import fs from 'fs'
import featureSchemaVersion from './featureSchemaVersion.js'

export default async (folder) => {

    try {
        const version = await featureSchemaVersion(folder)
        const targetPath = `${folder}/schema/${version}/classes.json`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        const data = JSON.parse(rawdata)
        return data
    } catch (e) {
        console.error(e)
        return null
    }
}
