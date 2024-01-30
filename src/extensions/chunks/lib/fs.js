import getFileCallerURL from './getFileCallerURL.js'
import _path from 'path'

export default async ({ toolbox }) => {

  toolbox.fs.chunks = {
    copy: async (props) => {

      let rootSource = props.source
      let source = props.source

      let sou = getFileCallerURL()
      sou = _path.dirname(sou)
      sou = sou.replace('file://', '')
      rootSource = `${sou}/template`
      source = `${sou}/template/${source}`

      return toolbox.fs.copyWithRootSource({ ...props, source, rootSource })
    }
  }
}

