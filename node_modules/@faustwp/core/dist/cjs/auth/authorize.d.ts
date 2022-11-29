import 'isomorphic-fetch';
export interface EnsureAuthorizationOptions {
    redirectUri?: string;
    loginPageUri?: string;
}
/**
 * Checks for an existing Access Token and returns one if it exists. Otherwise returns
 * an object containing a redirect URI to send the client to for authorization.
 *
 * @export
 * @param {string} EnsureAuthorizationOptions
 * @returns {(string | { redirect: string })}
 */
export declare function ensureAuthorization(options?: EnsureAuthorizationOptions): Promise<true | {
    redirect?: string | undefined;
    login?: string | undefined;
}>;
