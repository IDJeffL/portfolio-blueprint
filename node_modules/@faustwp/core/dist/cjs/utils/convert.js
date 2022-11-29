"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeURLParam = exports.getCookiesFromContext = exports.resolvePrefixedUrlPath = exports.stripPreviewFromUrlPath = exports.getUrlPath = exports.getQueryParam = exports.parseUrl = exports.base64Encode = exports.base64Decode = void 0;
const isArrayLike_js_1 = __importDefault(require("lodash/isArrayLike.js"));
const isEmpty_js_1 = __importDefault(require("lodash/isEmpty.js"));
const isString_js_1 = __importDefault(require("lodash/isString.js"));
const isUndefined_js_1 = __importDefault(require("lodash/isUndefined.js"));
const assert_js_1 = require("./assert.js");
/**
 * Decodes a base64 string, compatible server-side and client-side
 *
 * @export
 * @param {string} str
 * @returns
 */
function base64Decode(str) {
    if (!(0, assert_js_1.isBase64)(str)) {
        return str;
    }
    if ((0, assert_js_1.isServerSide)()) {
        return Buffer.from(str, 'base64').toString('utf8');
    }
    return atob(str);
}
exports.base64Decode = base64Decode;
/**
 * Encodes a string to base64, compatible server-side and client-side
 *
 * @export
 * @param {string} str
 * @returns
 */
function base64Encode(str) {
    if (!(0, isString_js_1.default)(str)) {
        return '';
    }
    if ((0, assert_js_1.isServerSide)()) {
        return Buffer.from(str, 'utf8').toString('base64');
    }
    return btoa(str);
}
exports.base64Encode = base64Encode;
const URL_REGEX = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/* eslint-disable consistent-return */
/**
 * Parses a url into various parts
 *
 * @export
 * @param {(string | undefined)} url
 * @returns {ParsedUrlInfo}
 */
function parseUrl(url) {
    if (!url) {
        return;
    }
    const parsed = URL_REGEX.exec(url);
    if (!(0, isArrayLike_js_1.default)(parsed) ||
        (0, isEmpty_js_1.default)(parsed) ||
        ((0, isUndefined_js_1.default)(parsed[4]) && url[0] !== '/')) {
        return;
    }
    return {
        href: parsed[0],
        protocol: parsed[1],
        baseUrl: `${parsed[1]}${parsed[3]}`,
        host: parsed[4],
        pathname: parsed[5],
        search: parsed[6],
        hash: parsed[8],
    };
}
exports.parseUrl = parseUrl;
/* eslint-enable consistent-return */
/**
 * Gets query parameters from a url or search string
 *
 * @export
 * @param {string} url
 * @param {string} param
 * @returns {string}
 */
function getQueryParam(url, param) {
    if (!(0, isString_js_1.default)(url) || !(0, isString_js_1.default)(param) || (0, isEmpty_js_1.default)(url) || (0, isEmpty_js_1.default)(param)) {
        return '';
    }
    const parsedUrl = parseUrl(url);
    if ((0, isUndefined_js_1.default)(parsedUrl) || !(0, isString_js_1.default)(parsedUrl.search)) {
        return '';
    }
    let query = parsedUrl.search;
    if (query[0] === '?') {
        query = query.substring(1);
    }
    const params = query.split('&');
    for (let i = 0; i < params.length; i += 1) {
        const pair = params[i].split('=');
        if (decodeURIComponent(pair[0]) === param) {
            return decodeURIComponent(pair[1]);
        }
    }
    return '';
}
exports.getQueryParam = getQueryParam;
/**
 * Gets the path without the protocol/host/port from a full URL string
 *
 * @export
 * @param {string} [url]
 * @returns
 */
function getUrlPath(url) {
    const parsedUrl = parseUrl(url);
    if ((0, isUndefined_js_1.default)(parsedUrl)) {
        return '/';
    }
    return `${parsedUrl.pathname || '/'}${parsedUrl.search || ''}`;
}
exports.getUrlPath = getUrlPath;
function stripPreviewFromUrlPath(urlPath) {
    if (!urlPath) {
        return urlPath;
    }
    return urlPath.replace(assert_js_1.previewRegex, '$1');
}
exports.stripPreviewFromUrlPath = stripPreviewFromUrlPath;
/**
 * Ensures that a url does not have the specified prefix in it.
 *
 * @export
 * @param {string} url
 * @param {string} [prefix]
 * @returns
 */
function resolvePrefixedUrlPath(url, prefix) {
    let resolvedUrl = url;
    if (prefix) {
        resolvedUrl = url.replace(prefix, '');
    }
    if (resolvedUrl === '') {
        resolvedUrl = '/';
    }
    return resolvedUrl;
}
exports.resolvePrefixedUrlPath = resolvePrefixedUrlPath;
/* eslint-disable consistent-return, @typescript-eslint/explicit-module-boundary-types */
function getCookiesFromContext(context) {
    var _a, _b, _c, _d;
    if (!context) {
        return;
    }
    if ((_a = context.previewData) === null || _a === void 0 ? void 0 : _a.serverInfo) {
        return context.previewData.serverInfo.cookie;
    }
    if ((_c = (_b = context.req) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.cookie) {
        return context.req.headers.cookie;
    }
    if ((_d = context.headers) === null || _d === void 0 ? void 0 : _d.cookie) {
        return context.headers.cookie;
    }
    if (context.cookie) {
        return context.cookie;
    }
}
exports.getCookiesFromContext = getCookiesFromContext;
/* eslint-enable consistent-return, @typescript-eslint/explicit-module-boundary-types */
function removeURLParam(url, parameter) {
    const parts = url.split('?');
    if (parts.length >= 2) {
        const prefix = `${encodeURIComponent(parameter)}=`;
        const pars = parts[1].split(/[&;]/g);
        // eslint-disable-next-line no-plusplus
        for (let i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        return parts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');
    }
    return url;
}
exports.removeURLParam = removeURLParam;
