
import ejs from 'ejs'
import { cleanFeatures } from '@servable/tools'

export default async (props) => {
    const {
        folder,
        items,
        toolbox,
        payload,
        isTemplate
    } = props
    // if (false) {
    //     Engine.launchServable()
    // }

    try {
        const targetPath = `${folder}/class/features.js`
        let i = cleanFeatures(items)
        // let i = items
        i = i ? i : []
        let data = `export default ${JSON.stringify(items, null, 4)}`
        if (isTemplate) {
            data = await ejs.render(data, payload, {
                async: true,
                strict: false
            })
        }
        toolbox.fs.write(targetPath, data)
    } catch (e) {
        console.error(e)
    }
}
