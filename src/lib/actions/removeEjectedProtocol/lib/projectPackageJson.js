import fs from 'fs'
import protocolSchemaVersion from './protocolSchemaVersion.js'

export default async (folder) => {

    try {
        const version = await protocolSchemaVersion(folder)
        const targetPath = `${folder}/schema/${version}/classes.json`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        const data = JSON.parse(rawdata)
        return data
    } catch (e) {
        console.error(e)
        return null
    }
}
