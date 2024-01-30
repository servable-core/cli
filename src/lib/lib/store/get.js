import netrc from 'netrc';


export default async ({ domain, key }) => {
    try {
        const instance = netrc()
        const domainData = instance[domain]
        if (!domainData) {
            return null
        }
        return domainData[key]
    } catch (e) {
        console.error('netrc', e)
    }
    return null
}
