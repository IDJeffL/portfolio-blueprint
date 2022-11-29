/// <reference types="node" />
import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import { CookieSerializeOptions } from 'cookie';
export interface CookieOptions {
    encoded?: boolean;
    isJson?: boolean;
}
export declare class Cookies {
    private request;
    private response?;
    private cookies;
    constructor(req: IncomingMessage, res?: ServerResponse);
    getCookie(key: string, options: CookieOptions & {
        isJson: true;
    }): any | undefined;
    getCookie(key: string, options?: CookieOptions): string | undefined;
    setCookie(key: string, value: string | Record<string, unknown>, { encoded, isJson, ...serializeOptions }?: CookieOptions & CookieSerializeOptions): void;
    removeCookie(key: string): void;
}
