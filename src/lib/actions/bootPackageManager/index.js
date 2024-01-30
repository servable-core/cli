/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import existsAsync from "../../prompts/targetClass/lib/existsAsync.js"

export default async (props) => {
  const { toolbox, payload,
    installDependencies = true,
    targetPathFinder
  } = props


  const _targetPathFinder = targetPathFinder
    ? targetPathFinder
    : toolbox.destinationPath.bind(toolbox)
  const fileName = fileNamer(props)
  const source = toolbox.templatePath(fileName)

  if (source && await existsAsync(source)) {
    const dottedFileName = `.${fileName}`
    const targetFileName = _targetPathFinder(dottedFileName)
    toolbox.fs.copyTpl(
      source,
      targetFileName,
      payload)
  }

  payload.installDependencies = installDependencies
}


const fileNamer = (props) => {
  switch (props.payload.packageManager) {
    case 'yarn': {
      return 'yarnrc'
    }
    case 'pnpm': {
      return 'npmrc-pnpm'
    }
    default:
      return null
  }
}
