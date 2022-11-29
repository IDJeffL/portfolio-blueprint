/**
 * Returns whether or not the app execution context is currently Server-Side or Client-Side
 *
 * @export
 * @returns {boolean}
 */
export declare function isServerSide(): boolean;
/**
 * Returns whether or not a string is a base64 encoded string
 *
 * @export
 * @param {string} str
 * @returns
 */
export declare function isBase64(str: string): boolean;
export declare const previewRegex: RegExp;
export declare function isPreviewPath(uri: string): boolean;
/**
 * Returns whether or not a string is a valid URL
 *
 * @export
 * @returns
 */
export declare function isValidUrl(url: string): boolean;
export declare const emailRegex: RegExp;
/**
 * Returns whether or not a string is a valid email address
 *
 * @export
 * @returns
 */
export declare function isValidEmail(email: string): boolean;
