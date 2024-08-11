import data from './data.js'

export default async ({ id }) => {
    const items = data.filter(a => a.id === id.toLowerCase())
    return (items && items.length) ? items[0] : null
}
