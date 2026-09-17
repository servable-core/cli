// @ts-nocheck - lucide (PEAKUB DX initiative): dead code, found via checkJs. Nothing in this
// package imports this file (confirmed by a repo-wide grep), and even if it were called it
// couldn't work - `common-path` isn't a real dependency of this package, and the function
// computes several intermediate values without ever returning them (the try block falls
// through to an implicit `undefined`). Left as-is rather than deleted or "fixed" against
// unclear original intent; a real cleanup pass should just remove this file.
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
