import netrc from 'netrc';


export default async () => {
    const myNetrc = netrc()

    const key = 'api.registry.servablecommunity.com'
    console.log(myNetrc['github.com'])
    // { login: 'my-oauth-token',
    //   password: 'x-oauth-basic' }

    myNetrc[key].login = 'my-new-oauth-token'
    netrc.save(myNetrc)
}
