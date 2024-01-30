import fs from 'fs'

export default (folder) => {

    try {
        if (!(fs.existsSync(folder))) {
            return false
        }

        if (!fs.lstatSync(folder).isDirectory()) {
            return false
        }

        let content = fileContent(`${folder}/module.json`)
        if (!content) {
            content = fileContent(`${folder}/index.json`)
        }
        if (!content || !content.type) {
            return false
        }
        return content.type === 'class'
    } catch (e) {
        // console.error(e)
        return false
    }
}

const fileContent = (filePath) => {
    if (!(fs.existsSync(filePath))) {
        return null
    }



    const rawdata = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(rawdata)
}


