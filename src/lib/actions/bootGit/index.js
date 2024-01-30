/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
  const { toolbox, location } = props
  if (!toolbox.payload.gitInit) {
    return
  }

  const options = location ? {
    cwd: location
  } : {}

  toolbox.spawn('git', ['init', '--quiet', '--initial-branch=main'], options)
}
