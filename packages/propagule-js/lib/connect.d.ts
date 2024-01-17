import { QRCodeToDataURLOptions } from 'qrcode';
import type { Account } from 'algosdk';
import nacl from 'tweetnacl';
export declare class Message {
    origin: string;
    challenge: string;
    requestId: number;
    wallet?: string;
    signature?: string;
    constructor(origin: string, challenge: string, requestId: number);
    static fromResponse(response: any): Promise<Message>;
    /**
     * Convert Message to Barcode
     *
     * @param options
     * @param el
     */
    toBarcode(options?: QRCodeToDataURLOptions, el?: HTMLCanvasElement): Promise<string>;
    /**
     * Sign Message with Wallet Key
     *
     * @param key
     */
    sign(key: string | Account | Uint8Array | nacl.SignKeyPair): void;
    toString(): string;
}
