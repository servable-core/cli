

export default publisher => {
    const nameRegex = /^[a-z0-9][a-z0-9\-]*$/i

    if (!publisher) {
        return "Missing publisher name"
    }
    if (!nameRegex.test(publisher)) {
        return "Invalid publisher name"
    }
    return true
}
