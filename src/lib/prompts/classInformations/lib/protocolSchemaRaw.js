import fs from 'fs'

// Unischema: a protocol's schema is `<folder>/schema.json`, flat and unversioned - no more
// `schema/<version>/index.json` (see .docs/technical/unischema-plan.md). Kept as an exact
// duplicate of ../../../newlib/classInformations/lib/protocolSchemaRaw.js (same fix applied to
// both - see that file's own comment for why the old version-path lookup broke every caller of
// this one).
export default async (folder) => {

    try {
        const targetPath = `${folder}/schema.json`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        const data = JSON.parse(rawdata)
        return data
    } catch (e) {
        console.error(e)
        return null
    }
}
