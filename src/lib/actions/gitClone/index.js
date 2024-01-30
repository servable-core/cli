/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import fs from 'fs'

export default async (props) => {
    const { toolbox, location, url, } = props

    const options = location ? {
        cwd: location
    } : {}

    toolbox.spawnSync('rm', ['-rf', `${location}/_cloned`], options)
    toolbox.spawnSync('git', ['clone', '--branch', 'master', url, '_cloned'], options)
    toolbox.copyDestination(`${location}/_cloned/src`, `${location}`)


    try {
        const targetPath = `${location}/_cloned/package.json`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        const originPackageJSON = JSON.parse(rawdata)
        toolbox.spawnSync('rm', ['-rf', `${location}/_cloned`], options)

        return { originPackageJSON }
    } catch (e) {
        console.error(e)
        return null
    }


}
