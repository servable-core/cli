// @ts-nocheck - lucide (PEAKUB DX initiative): dead code, found via checkJs - same finding as
// the sibling copy in updateClassForEjectedProtocol/lib/relativePath.js (see that file's own
// note): never called, and even if it were, 'common-path' isn't a real dependency here.
import path from "path"
// eslint-disable-next-line n/no-missing-import -- see the dead-code note above; already known.
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
