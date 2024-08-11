/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import ownClass from "../../lib/templates/schema/ownClass.js"
import protocolSchemaOwnClasses from "../../prompts/classInformations/lib/protocolSchemaOwnClasses.js"
import protocolSchemaRaw from "../../prompts/classInformations/lib/protocolSchemaRaw.js"

export default async (props) => {
    const { className, targetProtocolPath } = props

    const targetClass = ownClass({ className })

    const schema = await protocolSchemaRaw(targetProtocolPath)
    const ownClasses = await protocolSchemaOwnClasses(targetProtocolPath) || []
    const classesWithoutTargetClass = ownClasses.filter(a => a.className !== targetClass.className)
    classesWithoutTargetClass.push(targetClass)
    schema.managed.classes = classesWithoutTargetClass

    return schema
}
