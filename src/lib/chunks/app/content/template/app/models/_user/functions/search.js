
export const getUsersGeneric = async (request) => {
  const user = await Servable.App.Utils.prepareRequestWithUser(request)
  const { search } = request.params

  let _query
  if (search) {
    const firstNameQuery = new Servable.App.Query('_User')
    firstNameQuery.matches('firstname', search, 'i')

    const lastNameQuery = new Servable.App.Query('_User')
    lastNameQuery.matches('lastname', search, 'i')

    const handleQuery = new Servable.App.Query('_User')
    handleQuery.matches('handle', search, 'i')

    const emailQuery = new Servable.App.Query('_User')
    emailQuery.matches('email', search, 'i')

    //https://stackoverflow.com/questions/18762881/search-for-case-insensitive-data-from-parse-using-javascript
    _query = new Servable.App.Query.or(firstNameQuery, lastNameQuery, handleQuery, emailQuery)
    //query.fullText('lastname', search)
  }
  if (!_query) {
    _query = new Servable.App.Query('_User')
  }

  _query.select(['handle', 'firstname', 'lastname', 'profilePictureUrl'])
  return _query.find({ useMasterKey: true })
}