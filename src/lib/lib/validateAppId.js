

export default id => {
    const nameRegex = /^[a-z0-9][a-z0-9\-]*$/i

    if (!id) {
        return "Missing extension identifier"
    }

    if (!nameRegex.test(id)) {
        return "Invalid extension identifier"
    }

    return true
}
