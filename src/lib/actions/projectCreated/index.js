/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { toolbox, payload, } = props

    toolbox.log('')
    toolbox.log('Your project ' + payload.appName + ' has been created!')
    toolbox.log('')

    toolbox.log('For more information, also visit http://servablecommunity.com and follow us @servablecom.')
    toolbox.log('\r\n')
}
