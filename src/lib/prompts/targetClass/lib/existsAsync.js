import fs from "fs"

// `fs.exists()` is deprecated (it's the one Node fs callback that isn't error-first) - replaced
// with the documented modern equivalent, `fs.promises.access()` (found via eslint's
// `n/no-deprecated-api`, lucide/PEAKUB DX initiative).
export default async (path) => {
    try {
        await fs.promises.access(path)
        return true
    } catch (e) {
        return false
    }
}
