/// <reference types="node" />
import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
export interface AuthorizeResponse {
    accessToken: string;
    accessTokenExpiration: number;
    refreshToken: string;
    refreshTokenExpiration: number;
}
/**
 * A Node handler for processing incoming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 *
 * @see https://faustjs.org/docs/next/guides/auth
 */
export declare function authorizeHandler(req: IncomingMessage, res: ServerResponse): Promise<void>;
/**
 * A Node handler for processing incoming requests to logout an authenticated user.
 * This handler clears the refresh token from the cookie and returns a response.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 *
 * @see https://faustjs.org/docs/next/guides/auth
 */
export declare function logoutHandler(req: IncomingMessage, res: ServerResponse): Promise<void>;
