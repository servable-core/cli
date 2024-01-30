import fs from 'fs'

export default async (props) => {
  const {
    sourcePath
  } = props

  return fs.promises.rm(sourcePath, { recursive: true, force: true })
}
