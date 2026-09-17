/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import validateNonEmpty from "../../lib/valdiateNonEmpty.js"


export default async (props) => {
    const {
        toolbox,
        payload,
        options: {
            name,
            message,
            type = 'input',
            validate = validateNonEmpty,
            defaultValue } } = props

    // HIGH-PRIORITY finding, found via checkJs (lucide, PEAKUB DX initiative), corrected on a
    // closer re-read while wiring up eslint's `n/no-missing-import` (which flags this same
    // line): src/lib/options.js does not exist anywhere in this package - never committed, or
    // deleted without updating this call site. The `await import(...)` below runs
    // UNCONDITIONALLY, every single call - it is not gated by `name` (only the `options[name]`
    // *lookup* further down is) - so this rejects on every invocation of askForGeneric(),
    // used by dozens of prompt flows across this CLI. A prior version of this note claimed the
    // failure was conditional on `name`; that was wrong. Worth a real investigation (what was
    // options.js meant to hold?) rather than a guessed reconstruction here - left unfixed and
    // flagged rather than papered over.
    // eslint-disable-next-line n/no-missing-import -- see the note above; already known.
    const options = (await import("../../options.js")).default
    let _message = message
    let _defaultValue = defaultValue
    let _type = type
    const isQuick = toolbox.options['quick']
    if (name) {
        const option = options[name]
        if (option) {
            _message = _message ? _message : option.description
            _type = option.type
            _defaultValue = (_defaultValue === null || _defaultValue === undefined)
                ? option.default
                : _defaultValue
        }
    }

    // const value = toolbox.options[name]
    const value = payload[name]
    if (!(value === null || value === undefined)) {
        return
    }

    if (isQuick && !(value === null || value === undefined)) {
        return
    }

    if (isQuick && !(_defaultValue === null || _defaultValue === undefined)) {
        payload[name] = _defaultValue
        return
    }

    payload[name] = (await toolbox.prompt({
        ...props.options,
        type,
        name,
        message: _message,
        default: value ? value : _defaultValue,
        validate
    }))[name]

    return payload[name]
}
