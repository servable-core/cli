import gravatar from 'gravatar'

export const updateUserProfilePicture = async ({ object }) => {
    const current = object.get('avatarFile')
    if (!current) {
        return updateUserProfilePictureFromGravatar({ object })
    }

    const url = current.url()
    const avatarUrl = object.get('avatarUrl')
    if (avatarUrl && (avatarUrl === url)) {
        return
    }

    return doUpdateUserProfilePictureURL({ object, url, source: 'local' })
}

export const deleteUserProfilePictureFiles = async (user) => {

}


const updateUserProfilePictureFromGravatar = async ({ object }) => {
    return
    if ((object.get('avatarSource') === 'gravatar') && object.get('avatarUrl')) {
        return
    }
    try {
        const url = await gravatar.url(`${object.get('email')}-h`, { protocol: 'https', s: '400', d: '404' })
        return doUpdateUserProfilePictureURL({ object, url, source: 'gravatar' })
    } catch (e) {
        Servable.Console.error(e)
    }

}

const doUpdateUserProfilePictureURL = async ({ url, object, source = 'local' }) => {
    object.set('avatarUrl', url)
    object.set('avatarSource', source)
}