/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import ownClass from "../../lib/templates/schema/ownClass.js"
import featureSchemaOwnClasses from "../../prompts/classInformations/lib/featureSchemaOwnClasses.js"
import featureSchemaRaw from "../../prompts/classInformations/lib/featureSchemaRaw.js"

export default async (props) => {
    const { className, targetFeaturePath } = props

    const targetClass = ownClass({ className })

    const schema = await featureSchemaRaw(targetFeaturePath)
    const ownClasses = await featureSchemaOwnClasses(targetFeaturePath) || []
    const classesWithoutTargetClass = ownClasses.filter(a => a.className !== targetClass.className)
    classesWithoutTargetClass.push(targetClass)
    schema.managed.classes = classesWithoutTargetClass

    return schema
}
