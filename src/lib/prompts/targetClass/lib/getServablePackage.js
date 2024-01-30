import fs from 'fs'

export default async (folder) => {
    try {
        const targetPath = `${folder}/package.json`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        const data = JSON.parse(rawdata)
        return data
    } catch (e) {
        console.error(e)
        return null
    }
}
