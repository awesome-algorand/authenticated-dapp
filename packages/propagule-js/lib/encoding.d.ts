/**
 * Bytes to Base64URL
 * @param {Uint8Array} bytes Bytes to convert to URL safe Base64
 */
export declare function toBase64URL(bytes: Uint8Array): string;
/**
 * Base64URL to Bytes
 * @param {string} base64url URL safe Base64 string
 */
export declare function fromBase64Url(base64url: string): Uint8Array;
