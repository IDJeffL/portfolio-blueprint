/**
 * The result of parsing a URL into its parts
 *
 * @export
 * @interface ParsedUrlInfo
 */
export interface ParsedUrlInfo {
    href: string;
    protocol: string;
    baseUrl: string;
    host: string;
    pathname: string;
    search: string;
    hash: string;
}
/**
 * Decodes a base64 string, compatible server-side and client-side
 *
 * @export
 * @param {string} str
 * @returns
 */
export declare function base64Decode(str: string): string;
/**
 * Encodes a string to base64, compatible server-side and client-side
 *
 * @export
 * @param {string} str
 * @returns
 */
export declare function base64Encode(str: string): string;
/**
 * Parses a url into various parts
 *
 * @export
 * @param {(string | undefined)} url
 * @returns {ParsedUrlInfo}
 */
export declare function parseUrl(url: string | undefined): ParsedUrlInfo | undefined;
/**
 * Gets query parameters from a url or search string
 *
 * @export
 * @param {string} url
 * @param {string} param
 * @returns {string}
 */
export declare function getQueryParam(url: string, param: string): string;
/**
 * Gets the path without the protocol/host/port from a full URL string
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export declare function getUrlPath(url?: string): string;
export declare function stripPreviewFromUrlPath(urlPath: string): string;
/**
 * Ensures that a url does not have the specified prefix in it.
 *
 * @export
 * @param {string} url
 * @param {string} [prefix]
 * @returns
 */
export declare function resolvePrefixedUrlPath(url: string, prefix?: string): string;
export declare function getCookiesFromContext(context?: any): string | undefined;
export declare function removeURLParam(url: string, parameter: string): string;
