/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { toolbox, payload, } = props

    toolbox.log('')
    toolbox.log('Your app has been updated!')
    toolbox.log('')
    toolbox.log('To start editing with Visual Studio Code, use the following commands:')
    toolbox.log('')
    toolbox.log('     code .')
    // toolbox.log(`     ${payload.packageManager} run compile-web`)
    toolbox.log('')

}
