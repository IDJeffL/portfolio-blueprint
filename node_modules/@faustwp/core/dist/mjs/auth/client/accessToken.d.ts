export interface AccessToken {
    /**
     * Base 64 encoded access token
     */
    token: string | undefined;
    /**
     * The time in seconds until the access token expires.
     */
    expiration: number | undefined;
}
export declare type RefreshTimer = ReturnType<typeof setTimeout> | undefined;
/**
 * The amount of time in seconds until the access token is fetched
 * before it expires.
 *
 * For example, if the access token expires in 5 minutes (300 seconds), and
 * this value is 60, then the access token will be refreshed at 240 seconds.
 *
 * This allows for enough time to fetch a new access token before it expires.
 *
 */
export declare const TIME_UNTIL_REFRESH_BEFORE_TOKEN_EXPIRES = 60;
export declare function getRefreshTimer(): RefreshTimer;
export declare function setRefreshTimer(timer: RefreshTimer): void;
/**
 * Get an access token from memory if one exists
 *
 * @returns {string | undefined}
 */
export declare function getAccessToken(): string | undefined;
/**
 * Get an access token expiration from memory if one exists
 *
 * @returns {number | undefined}
 */
export declare function getAccessTokenExpiration(): number | undefined;
/**
 * Set an access token and/or its expiration in memory
 *
 * @param {string} token
 * @param {number} expiration
 *
 * @returns {void}
 */
export declare function setAccessToken(token: string | undefined, expiration: number | undefined): void;
/**
 * Creates the access token refresh timer that will fetch a new access token
 * before the current one expires.
 *
 * @returns {void}
 */
export declare function setAccessTokenRefreshTimer(): void;
/**
 * Clears the current access token refresh timer if one exists.
 */
export declare function clearAccessTokenRefreshTimer(): void;
/**
 * Fetch an access token from the authorizeHandler middleware
 *
 * @export
 * @param {string} code An authorization code to fetch an access token
 */
export declare function fetchAccessToken(code?: string): Promise<string | null>;
