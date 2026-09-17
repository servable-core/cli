import getPortWithinRange from "./getPortWithinRange.js";

/**
 * @param {object} props
 * @param {number} props.port - starting port to search from.
 * @param {number} [props.maxRange] - how far above `port` to search. Defaults to 100.
 * @param {number[]} [props.exclude] - ports to skip even if free.
 * @param {string} [props.host] - host to check availability against.
 */
export default async ({ port, maxRange = 100, exclude, host }) => {
    return getPortWithinRange({ start: port, end: port + maxRange, exclude, host })
}
