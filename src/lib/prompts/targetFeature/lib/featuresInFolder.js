import getDirectories from './getDirectories.js'
import isFolderFeature from './isFolderFeature.js'
// import existsAsync from './existsAsync.js'

export default async (folder) => {
    try {
        const items = await getDirectories(folder)
        if (!items || !items.length) {
            return null
        }
        const results = await Promise.all(items.map(async item => {
            const folderName = `${folder}/${item}`
            if (!(await isFolderFeature(folderName))) {
                return null
            }
            return folderName
        }))
        return results.filter(a => a)
    } catch (e) {
        return null
    }
}
