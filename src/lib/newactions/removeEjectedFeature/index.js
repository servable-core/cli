/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import fs from 'fs';

export default async (props) => {
  const { featurePath = CliNext.payload.featurePath } = props
  return fs.promises.rm(featurePath, {
    recursive: true,
    force: true
  })
}
