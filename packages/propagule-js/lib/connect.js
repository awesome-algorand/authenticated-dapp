import qrcode from 'qrcode';
import { encodeAddress } from "algosdk";
import nacl from 'tweetnacl';
import { toBase64URL } from './encoding.js';
export class Message {
    origin;
    challenge;
    requestId;
    wallet;
    signature;
    constructor(origin, challenge, requestId) {
        this.origin = origin;
        this.challenge = challenge;
        this.requestId = requestId;
    }
    static async fromResponse(response) {
        const msg = response instanceof Response ? await response.json() : response;
        return new Message(msg.origin, msg.challenge, msg.requestId);
    }
    /**
     * Convert Message to Barcode
     *
     * @param options
     * @param el
     */
    toBarcode(options, el) {
        if (typeof window === 'undefined' || !(el instanceof HTMLCanvasElement)) {
            return qrcode.toDataURL(this.toString(), options);
        }
        return qrcode.toDataURL(el, this.toString(), options);
    }
    /**
     * Sign Message with Wallet Key
     *
     * @param key
     */
    sign(key) {
        const encoder = new TextEncoder();
        let keyPair;
        // Seed or Secret Key
        if (key instanceof Uint8Array) {
            if (key.length === 32) {
                keyPair = nacl.sign.keyPair.fromSeed(key);
            }
            else if (key.length === 64) {
                keyPair = nacl.sign.keyPair.fromSecretKey(key);
            }
            else {
                throw new TypeError('Invalid seed or secret key');
            }
        }
        // Algorand SDK
        if (typeof key.addr !== 'undefined' && typeof key.addr === 'string') {
            keyPair = nacl.sign.keyPair.fromSecretKey(key.sk);
        }
        // NACL
        if (key.publicKey instanceof Uint8Array && key.secretKey instanceof Uint8Array) {
            console.log('nacl');
            keyPair = key;
        }
        this.signature = toBase64URL(nacl.sign.detached(encoder.encode(this.challenge), keyPair.secretKey));
        this.wallet = encodeAddress(keyPair.publicKey);
    }
    toString() {
        let optional = {};
        if (typeof this.wallet === 'string') {
            optional.wallet = this.wallet;
        }
        if (typeof this.signature === 'string') {
            optional.signature = this.signature;
        }
        return JSON.stringify({ origin: this.origin, requestId: this.requestId, challenge: this.challenge, ...optional });
    }
}
