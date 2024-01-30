/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"


export default async (props) => {
    const { toolbox, payload, targetRootPath, } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const destinator = targetRootPath ? v => `${targetRootPath}/${v}` : toolbox.destinationPath.bind(toolbox)

    toolbox.fs.copyTpl(`${__dirname}/template/README.md`,
        destinator(`${targetRootPath}/README.md`),
        payload)
}
