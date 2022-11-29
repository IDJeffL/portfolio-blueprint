import 'isomorphic-fetch';
import { Cookies } from './cookie.js';
export declare type OAuthTokenResponse = OAuthTokens | {
    error: boolean;
    response: Response;
    result: any;
};
export interface OAuthTokens {
    accessToken: string;
    accessTokenExpiration: number;
    refreshToken: string;
    refreshTokenExpiration: number;
}
export declare class OAuth {
    private cookies;
    private tokenKey;
    constructor(cookies: Cookies);
    getRefreshToken(): string | undefined;
    setRefreshToken(token?: string, expires?: number): void;
    fetch(code?: string): Promise<OAuthTokenResponse>;
    isOAuthTokens(value: any): value is OAuthTokens;
}
