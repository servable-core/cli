

export default async ({ object }) => {
    //TODO:
    const email = object.get('email')
    if (!email) {
        return
    }

    await Servable.App.Cloud.run('userRequestValidateEmail', {
        email,
        locale: object.get('locale')
    })
}