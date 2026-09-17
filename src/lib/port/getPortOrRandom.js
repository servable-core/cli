import getPort from "get-port"

/**
 * @param {object} props
 * @param {number} [props.port] - preferred port; a random free one is used if omitted/taken.
 * @param {number[]} [props.exclude] - ports to skip even if free.
 * @param {string} [props.host] - host to check availability against.
 */
export default async ({ port, exclude, host }) => {
    return getPort({ port, exclude, host })
}
