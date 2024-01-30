import netrc from 'netrc';
//cd ~
//cat .netrc
export default async ({ domain, key, value }) => {
    try {
        const instance = netrc()
        if (!instance[domain]) {
            instance[domain] = {}
        }

        instance[domain][key] = value
        netrc.save(instance)
        return true
    } catch (e) {
        console.error('netrc', e)
    }
    return false
}
