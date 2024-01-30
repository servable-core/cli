export default () => {
  const error = new Error()
  const stack = error.stack?.split('\n')
  const data = stack[3]
  const filePathPattern = new RegExp(`(file:[/]{2}.+[^:0-9]):{1}[0-9]+:{1}[0-9]+`)
  const result = filePathPattern.exec(data)
  let filePath = ''
  if (result && (result.length > 1)) {
    filePath = result[1]
  }
  return filePath
}
