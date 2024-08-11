
export const getOne = async ({ objectId } = {}) => {
    const query = new Servable.App.Query('_User')
    //query.include(['template', 'parentCampaign', 'from'])
    query.equalTo("objectId", objectId)
    return query.first({ useMasterKey: true })
}

export const get = async ({ limit = 10, skip = 0 } = {}) => {
    const query = new Servable.App.Query('_User')
    query.limit(limit)
    query.skip(skip)
    query.descending('updatedAt')
    return query.find({ useMasterKey: true })
}