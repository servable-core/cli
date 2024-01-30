import featureSchemaRaw from './featureSchemaRaw.js'

export default async (folder) => {

    try {
        const schema = await featureSchemaRaw(folder)
        const ownClasses = (schema && schema.managed && schema.managed.classes) ? schema.managed.classes : []
        return ownClasses
    } catch (e) {
        console.error(e)
        return null
    }
}
