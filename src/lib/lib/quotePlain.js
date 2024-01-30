import Quote from 'inspirational-quotes'

export default props => {
    const _a = Quote.getQuote()
    return `${_a.text} ${_a.author}`
}
