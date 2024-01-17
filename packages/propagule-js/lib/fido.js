const DEFAULTS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};
async function connectOptions(origin, requestId) {
    return fetch(`${origin}connect/request`, {
        ...DEFAULTS,
        body: JSON.stringify({ requestId }),
    });
}
async function connectResult(origin, message) {
    return await fetch(`${origin}connect/response`, {
        ...DEFAULTS,
        body: message.toString(),
    }).then((r) => r.json());
}
/**
 *
 */
async function attestationOptions(options, parse = true) {
    console.log(this.origin);
    return await fetch(`${this.origin}attestation/request`, {
        ...DEFAULTS,
        body: JSON.stringify(typeof options === 'undefined' ? {} : options),
    }).then((r) => r.json());
}
export {};
