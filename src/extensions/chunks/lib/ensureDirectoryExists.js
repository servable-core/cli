import fs from 'fs'
import path from 'path'
import checkFileExists from './checkFileExists.js'

const operation = async filePath => {
  var dirname = path.dirname(filePath)
  if ((await checkFileExists(dirname))) {
    return true
  }

  await operation(dirname)
  await fs.promises.mkdir(dirname)
  return true
}

export default operation
