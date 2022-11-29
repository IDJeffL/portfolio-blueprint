"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthorization = void 0;
require("isomorphic-fetch");
const isString_js_1 = __importDefault(require("lodash/isString.js"));
const getWpUrl_js_1 = require("../lib/getWpUrl.js");
const index_js_1 = require("../utils/index.js");
const accessToken_js_1 = require("./client/accessToken.js");
/* eslint-disable consistent-return */
/**
 * Checks for an existing Access Token and returns one if it exists. Otherwise returns
 * an object containing a redirect URI to send the client to for authorization.
 *
 * @export
 * @param {string} EnsureAuthorizationOptions
 * @returns {(string | { redirect: string })}
 */
async function ensureAuthorization(options) {
    const wpUrl = (0, getWpUrl_js_1.getWpUrl)();
    const { redirectUri, loginPageUri } = options || {};
    // Get the authorization code from the URL if it exists
    const code = typeof window !== 'undefined'
        ? (0, index_js_1.getQueryParam)(window.location.href, 'code')
        : undefined;
    const unauthorized = {};
    if ((0, isString_js_1.default)(redirectUri)) {
        unauthorized.redirect = `${wpUrl}/generate?redirect_uri=${encodeURIComponent(redirectUri)}`;
    }
    if ((0, isString_js_1.default)(loginPageUri)) {
        unauthorized.login = loginPageUri;
    }
    const token = await (0, accessToken_js_1.fetchAccessToken)(code);
    if (!token) {
        return unauthorized;
    }
    if (code) {
        window.history.replaceState({}, document.title, (0, index_js_1.removeURLParam)(window.location.href, 'code'));
    }
    return true;
}
exports.ensureAuthorization = ensureAuthorization;
/* eslint-enable consistent-return */
