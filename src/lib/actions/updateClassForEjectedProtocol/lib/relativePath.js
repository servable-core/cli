import path from "path"
import commonPath from 'common-path'

export default async (target, src) => {

    try {
        const targetParts = target.split(path.sep)
        const srcParts = src.split(path.sep)
        const common = commonPath(target, src)
        const { commonDir, parsedPaths } = common
        const upCounts = parsedPaths[1].subPart.split(path.sep).length
        let result = ''
        for (var i = 0; i < upCounts; i++) {
            result += '../'
        }
        const commonDirParts = commonDir.split(path.sep)
        const commonDirPartsLength = commonDirParts.length

    } catch (e) {
        console.error(e)
        return null
    }
}
