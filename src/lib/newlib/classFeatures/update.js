
import { cleanFeatures } from '@servable/tools'

export default async (props) => {
  const {
    folder,
    items,
    isTemplate
  } = props
  // if (false) {
  //     Engine.launchServable()
  // }

  try {
    const targetPath = `${folder}/class/features.js`
    let _items = cleanFeatures(items)
    // let i = items
    _items = _items ? _items : []

    const content = JSON.stringify(_items, null, 4)
    const data = await CliNext.template.render({ template: `export default ${content}` })
    CliNext.fs.writeText({ destination: targetPath, text: data, })
  } catch (e) {
    console.error(e)
  }
}
