/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import ownClass from "../../lib/templates/schema/ownClass.js"
import protocolSchemaOwnClasses from "../../prompts/classInformations/lib/protocolSchemaOwnClasses.js"
import protocolSchemaRaw from "../../prompts/classInformations/lib/protocolSchemaRaw.js"

// Merges a newly scaffolded class into the target protocol's schema.json - called from
// model/content/write.js right after the class's own files are copied, so `servable model add`
// registers the class, not just scaffolds its files. Returns the full updated schema object;
// the caller is the one that actually writes it to disk.
export default async (props) => {
    const { className, targetProtocolPath } = props

    const targetClass = ownClass({ className })

    const schema = await protocolSchemaRaw(targetProtocolPath) || { managed: { classes: [] } }
    schema.managed = schema.managed || { classes: [] }
    const ownClasses = await protocolSchemaOwnClasses(targetProtocolPath) || []
    const classesWithoutTargetClass = ownClasses.filter(a => a.className !== targetClass.className)
    classesWithoutTargetClass.push(targetClass)
    schema.managed.classes = classesWithoutTargetClass

    return schema
}
