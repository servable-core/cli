/**
 * Called before Servable has been launched.
 * @param {Object} app Express app.
 * @param {Object} schema Protocol's schema.
 * @param {Object} configuration Current Servable configuration.
 * @param {Object} server - Parse Server instance.
 * @param {Object} servableEngineConfig - Full servableEngineConfig.
 */
const beforeInit = async ({ app, schema, configuration, server, servableEngineConfig }) => {

}

/**
 * Called after Servable has launched and the endpoint is available.
 * @param {Object} app Express app.
 * @param {Object} schema Protocol's schema.
 * @param {Object} configuration Current Servable configuration.
 * @param {Object} server - Parse Server instance.
 * @param {Object} servableEngineConfig - Full servableEngineConfig.
 */
const afterInit = async ({ app, schema, configuration, server, servableEngineConfig }) => {

}

/**
 * Called before Servable shuts down.
 */
const beforeEnd = async () => {

}

/**
 * Provides live classes.
 * @return {[String]} Always returns an array.
 */
const liveClasses = async () => {
  return []
}

export default ({
  __servableType: 'main',
  beforeInit,
  afterInit,
  beforeEnd,
  liveClasses,
})
