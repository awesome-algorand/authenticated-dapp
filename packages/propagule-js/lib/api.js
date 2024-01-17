const DEFAULTS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};
export class HTTPClient {
    origin;
    token;
    /**
     * Create an HTTP Client
     */
    constructor(token, server, port) {
        this.origin = new URL(typeof port === 'number' ? `${server}:${port}` : server);
        this.token = token;
    }
    async connectOptions(requestId) {
        return fetch('/connect/request', {
            ...DEFAULTS,
            body: JSON.stringify({ requestId }),
        });
    }
    async connectResult(message) {
        return await fetch('/connect/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: message.toString(),
        }).then((r) => r.json());
    }
    /**
     *
     */
    async attestationOptions(options, parse = true) {
        console.log(this.origin);
        return await fetch(`${this.origin}attestation/request`, {
            ...DEFAULTS,
            body: JSON.stringify(typeof options === 'undefined' ? {} : options),
        }).then((r) => r.json());
    }
}
