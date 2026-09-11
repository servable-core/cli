// Shared by every `servable schema *` command: loads the app's own servable.config.js from the
// current working directory (the CLI is expected to be run from inside an app - e.g.
// `cd backend/main && servable schema build`), fills in the two defaults @servable/tools'
// buildSchema()/compileArtifact() read off servableConfig, and sets a minimal `global.Servable`
// so a protocol's class.js files (`class Publication extends Servable.App.Object`) can import
// without throwing.
//
// Deliberately NOT a real engine bootstrap. An earlier version of this file imported
// @servable/parse-server-engine and ran engine.createApp()/engine.adaptApp() to get the real
// Parse-bound classes, on the theory that buildSchema()'s output might differ without them.
// Tested directly instead of assumed: it doesn't. `classes` (fields/indexes/
// classLevelPermissions - the actual schema content Parse receives) came back byte-identical
// between this minimal stub and a fully-hydrated real engine, across this codebase's whole
// protocol tree. The one place engine hydration DID matter (formatAppClassesSchemas injecting
// four framework-default classes) turned out to be a bug in @servable/tools itself - buildSchema
// unconditionally called an engine-specific method - fixed at the source (schema/build/
// buildProtocol/index.js now guards that call) rather than by forcing every caller to carry a
// specific engine as a dependency.
//
// A CLI that computes schema diffs has no principled reason to depend on which engine an app
// happens to use - that coupling would mean a hard rewrite here for every future engine, for a
// concern (does a class import without crashing) a plain object with a couple of base
// constructors already fully satisfies.
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { createRequire } from 'module'

export const SERVABLE_CONFIG_FILENAME = 'servable.config.js'
export const ARTIFACT_FILENAME = 'servable.schema.json'

class ServableBaseObject {}

// @servable/server ships its own bundled protocols (servableconfigurable, uniquerefable,
// manualable, servableautoseedable, the disposable*able triggers - lib/servable/server/src/
// protocols) and prepends that directory to servableConfig.protocols.local itself, unconditionally,
// every real boot (adaptConfig/basic.js). The CLI never runs adaptConfig - deliberately, see the
// note above this file - so without this, `servable schema build` silently never resolves those
// protocols at all, and its committed artifact permanently disagrees with what a real boot
// actually applies. Confirmed empirically: a fresh build with this prepend produced 72 classes
// (hash 88fefe627640) against backend/main's own protocol tree, 9 more than without it (hash
// 1ee54142594d, what was actually committed) - meaning every real boot's own drift check would
// have failed against the previously-committed artifact once it ran.
//
// This is NOT the same mistake as the rejected @servable/parse-server-engine dependency: it never
// imports or hydrates @servable/server, it only resolves the on-disk path to a package the app
// already has installed (exactly like Node's own module resolution would, from the app's own
// directory) - a filesystem fact, not a runtime behavior. Every app using this CLI already has
// @servable/server installed; this reads where, nothing more.
const bundledEngineProtocolsDir = ({ cwd }) => {
  try {
    const require = createRequire(path.resolve(cwd, 'package.json'))
    const serverPackageJson = require.resolve('@servable/server/package.json')
    const dir = path.resolve(path.dirname(serverPackageJson), 'src/protocols')
    return fs.existsSync(dir) ? dir : null
  } catch (e) {
    // @servable/server isn't installed (or too old to have a protocols/ dir) - nothing to add.
    return null
  }
}

const applyMinimalDefaults = ({ servableConfig, cwd }) => {
  if (!servableConfig.protocols) {
    servableConfig.protocols = {}
  }
  if (!servableConfig.protocols.local || !servableConfig.protocols.local.length) {
    servableConfig.protocols.local = [path.resolve(cwd, 'protocols')]
  }

  const engineProtocolsDir = bundledEngineProtocolsDir({ cwd })
  if (engineProtocolsDir && !servableConfig.protocols.local.includes(engineProtocolsDir)) {
    servableConfig.protocols.local = [engineProtocolsDir, ...servableConfig.protocols.local]
  }

  if (!servableConfig.rootProtocolPayload) {
    servableConfig.rootProtocolPayload = {
      type: 'app',
      id: 'app',
      path: path.resolve(cwd, 'app'),
    }
  }
  if (!servableConfig.rootProtocolPayload.path) {
    servableConfig.rootProtocolPayload.path = path.resolve(cwd, 'app')
  }
  if (!servableConfig.rootProtocolPayload.id || !servableConfig.rootProtocolPayload.type) {
    servableConfig.rootProtocolPayload.id = servableConfig.rootProtocolPayload.id || 'app'
    servableConfig.rootProtocolPayload.type = servableConfig.rootProtocolPayload.type || 'app'
  }

  if (!servableConfig.envs) {
    servableConfig.envs = {}
  }
}

export default async ({ cwd = process.cwd() } = {}) => {
  const configPath = path.resolve(cwd, SERVABLE_CONFIG_FILENAME)
  if (!fs.existsSync(configPath)) {
    throw new Error(`No ${SERVABLE_CONFIG_FILENAME} found at ${cwd} - run this from inside an app.`)
  }

  const servableConfig = (await import(pathToFileURL(configPath).href)).default
  if (!servableConfig) {
    throw new Error(`No default export found in ${configPath}`)
  }

  applyMinimalDefaults({ servableConfig, cwd })

  // Enough for `class X extends Servable.App.Object` (and .User/.Role, the two other bases seen
  // in this codebase's class.js files) to import without throwing - buildSchema() only ever
  // reads schema DATA (fields/indexes/classLevelPermissions from schema.json), never anything
  // that requires these to behave like real Parse.Object subclasses.
  global.Servable = {
    App: {
      Object: ServableBaseObject,
      User: class extends ServableBaseObject {},
      Role: class extends ServableBaseObject {},
    },
  }

  return servableConfig
}
