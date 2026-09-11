import fs from 'fs'
import path from 'path'
import { ARTIFACT_FILENAME } from './loadServableConfig.js'

// Returns null (not an error) when no artifact has ever been committed - the first `schema
// build` in a fresh app, or `schema plan` run before one exists. Every command that reads this
// needs to handle that case explicitly (build: nothing to diff against, treat as all-additive;
// plan/apply/contract: nothing to apply, or need the user to build first - each command decides
// which for itself).
export default ({ cwd = process.cwd() } = {}) => {
  const artifactPath = path.resolve(cwd, ARTIFACT_FILENAME)
  if (!fs.existsSync(artifactPath)) {
    return null
  }
  return JSON.parse(fs.readFileSync(artifactPath, 'utf8'))
}
