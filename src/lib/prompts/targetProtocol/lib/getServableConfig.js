import fs from 'fs'

export default async (folder) => {

    try {
        const targetPath = `${folder}/servable.config.js`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        // const data = JSON.parse(rawdata)
        return rawdata
    } catch (e) {
        console.error(e)
        return false
    }
}
