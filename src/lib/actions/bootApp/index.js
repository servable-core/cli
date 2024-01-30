/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {

    const { toolbox, payload } = props

    toolbox.fs.copy(toolbox.templatePath('lib'), toolbox.destinationPath('lib'))
    // toolbox.fs.copy(toolbox.templatePath('config'), toolbox.destinationPath('config'))
    toolbox.fs.copy(toolbox.templatePath('.vscode'), toolbox.destinationPath('.vscode'))

    toolbox.fs.copyTpl(toolbox.templatePath('README.md'), toolbox.destinationPath('README.md'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('package.json'), toolbox.destinationPath('package.json'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('lib/app/index.json'), toolbox.destinationPath('lib/app/index.json'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('servable.config.js'), toolbox.destinationPath('servable.config.js'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('env'), toolbox.destinationPath('.env'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('Dockerfile'), toolbox.destinationPath('Dockerfile'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('.dockerignore'), toolbox.destinationPath('.dockerignore'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('jest.config.json'), toolbox.destinationPath('jest.config.json'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('jsconfig.json'), toolbox.destinationPath('jsconfig.json'), payload)
    toolbox.fs.copyTpl(toolbox.templatePath('lib/app/system/docker/docker-compose.yaml'), toolbox.destinationPath('lib/app/system/docker/docker-compose.yaml'), payload)
}
