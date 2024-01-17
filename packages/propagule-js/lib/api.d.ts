import { Message } from './connect.js';
export declare class HTTPClient {
    origin: URL;
    token?: string;
    /**
     * Create an HTTP Client
     */
    constructor(token: string | undefined, server: string, port?: number);
    connectOptions(requestId: number): Promise<Response>;
    connectResult(message: Message): Promise<any>;
    /**
     *
     */
    attestationOptions(options?: any, parse?: boolean): Promise<any>;
}
