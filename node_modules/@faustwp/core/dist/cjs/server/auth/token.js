"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = void 0;
require("isomorphic-fetch");
const isNil_js_1 = __importDefault(require("lodash/isNil.js"));
const isString_js_1 = __importDefault(require("lodash/isString.js"));
const isNumber_js_1 = __importDefault(require("lodash/isNumber.js"));
const index_js_1 = require("../../utils/index.js");
const getWpSecret_js_1 = require("../../lib/getWpSecret.js");
const getWpUrl_js_1 = require("../../lib/getWpUrl.js");
class OAuth {
    constructor(cookies) {
        this.cookies = cookies;
        this.tokenKey = `${(0, getWpUrl_js_1.getWpUrl)()}-rt`;
    }
    getRefreshToken() {
        return this.cookies.getCookie(this.tokenKey);
    }
    setRefreshToken(token, expires) {
        if (!(0, isString_js_1.default)(token) || token.length === 0) {
            this.cookies.removeCookie(this.tokenKey);
        }
        let maxAge = 2592000;
        let expiresIn;
        if ((0, isNumber_js_1.default)(expires)) {
            expiresIn = new Date(expires * 1000);
            maxAge = undefined;
        }
        this.cookies.setCookie(this.tokenKey, token, {
            expires: expiresIn,
            maxAge,
            path: '/',
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
        });
    }
    async fetch(code) {
        const wpUrl = (0, getWpUrl_js_1.getWpUrl)();
        const apiClientSecret = (0, getWpSecret_js_1.getWpSecret)();
        if (!apiClientSecret) {
            throw new Error('The apiClientSecret must be specified to use the auth middleware');
        }
        let response = await fetch(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
            headers: {
                'Content-Type': 'application/json',
                'x-faustwp-secret': apiClientSecret,
            },
            method: 'POST',
            body: JSON.stringify({
                code,
                refreshToken: this.getRefreshToken(),
            }),
        });
        if (response.status === 404) {
            // Check for the deprecated authorize endpoint.
            response = await fetch(`${wpUrl}/?rest_route=/wpac/v1/authorize`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-wpe-headless-secret': apiClientSecret,
                },
                method: 'POST',
                body: JSON.stringify({
                    code,
                    refreshToken: this.getRefreshToken(),
                }),
            });
            if (response.status !== 404) {
                (0, index_js_1.log)('Authentication and post previews will soon be incompatible with ' +
                    'your version of the FaustWP plugin. Please update to the latest' +
                    ' version.');
            }
        }
        const result = await response.json();
        if (!response.ok) {
            return {
                error: true,
                response,
                result,
            };
        }
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, class-methods-use-this
    isOAuthTokens(value) {
        const castedValue = value;
        return (!(0, isNil_js_1.default)(castedValue) &&
            (0, isString_js_1.default)(castedValue.accessToken) &&
            (0, isString_js_1.default)(castedValue.refreshToken) &&
            (0, isNumber_js_1.default)(castedValue.accessTokenExpiration) &&
            (0, isNumber_js_1.default)(castedValue.refreshTokenExpiration));
    }
}
exports.OAuth = OAuth;
