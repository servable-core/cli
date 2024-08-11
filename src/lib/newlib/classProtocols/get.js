
export default async (folder) => {

    try {
        const targetPath = `${folder}/class/protocols.js`

        // const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        // const data = JSON.parse(rawdata)
        // return data

        let _data = (await import(targetPath)).default
        return _data

    } catch (e) {
        console.error(e)
        return null
    }
}
