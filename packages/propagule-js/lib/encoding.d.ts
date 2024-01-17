/**
 * Bytes to Base64URL
 * @param {Uint8Array| ArrayBuffer} bytes Bytes to convert to URL safe Base64
 */
export declare function toBase64URL(arr: Uint8Array | ArrayBuffer): string;
/**
 * Base64URL to Bytes
 * @param {string} base64url URL safe Base64 string
 */
export declare function fromBase64Url(base64url: string): Uint8Array;
