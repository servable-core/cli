
import * as Utils from "../lib/index.js"
import generatePassword from "password-generator"

export const installationWithId = async (request) => {
  const user = await Servable.App.Utils.prepareRequestWithUser({
    ...request,
    fetchOptions: {
      useMasterKey: true,
    }
  })
  const { installationId } = request.params

  const query = new Servable.App.Query('_Installation')
  query.equalTo('installationId', installationId)
  const result = await query.first({ useMasterKey: true })
  return result
}

export const updateUserProfilePicture = async (request) => {
  const user = await Servable.App.Utils.prepareRequestWithUser({
    ...request,
    fetchOptions: {
      useMasterKey: true,
      includes: ['profilePicture']
    }
  })

  return Utils.Generic.updateUserProfilePicture({ user, params: request.params })
}

export const deleteUser = async (request) => {
  const user = await Servable.App.Utils.prepareRequestWithUser({
    ...request,
    fetchOptions: {
      useMasterKey: true,
    }
  })
  return user.destroy({ useMasterKey: true })
}

export const createOtherUser = async ({ params }) => {
  const { email, firstname, lastname, password, username } = params
  const user = new Servable.App.User()

  user.setEmail(email)
  user.setUsername(username ? username : email)
  user.set('firstname', firstname)
  user.set('lastname', lastname)
  user.set('creationState', 1)

  var _password
  if (password && Utils.Generic.isStrongEnough(password)) {
    _password = password
  }
  else {
    _password = generatePassword(10, false, /[\w\d\?\-]/)
  }

  user.setPassword(_password)
  return user.save(null, { useMasterKey: true })
}

export const searchUsers = async (request) => {
  const query = new Servable.App.Query('_User')
  if (request.params.title) {
    query.fullText('firstname', request.params.title)
    query.fullText('lastname', request.params.title)
  }

  query.include('profilePicture')
  query.include('profilePicture.fileA')
  //query.fullText('desc', request.params.title)
  query.ascending('$score')
  query.select('$score')
  const results = await query.find({ useMasterKey: true })
  const queries = results.map((item) => item.fetch({ useMasterKey: true }))

  return Promise.all(queries)
}



