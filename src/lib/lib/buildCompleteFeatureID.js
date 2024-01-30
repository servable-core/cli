

export default featureId => {
    return featureId.indexOf('servable-') === 0 ? `${featureId}` : `servable-${featureId}`
}
