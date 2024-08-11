

export default protocolId => {
    return protocolId.indexOf('servable-') === 0 ? `${protocolId}` : `servable-${protocolId}`
}
