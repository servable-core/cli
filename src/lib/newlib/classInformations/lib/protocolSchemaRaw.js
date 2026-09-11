import fs from 'fs'

// Unischema: a protocol's schema is `<folder>/schema.json`, flat and unversioned - no more
// `schema/<version>/index.json` (see .docs/technical/unischema-plan.md). This file used to read
// the old versioned path via protocolSchemaVersion.js, which silently broke every caller
// (`servable model add`'s class-picker prompt, updateProtocolClasses's write-back) once
// protocols were migrated - the old path no longer exists for any real protocol, so this always
// returned null, and updateProtocolClasses/index.js crashed trying to set `.managed.classes` on
// that null.
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
