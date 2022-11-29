var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import 'isomorphic-fetch';
import isString from 'lodash/isString.js';
import cookie from 'cookie';
import { base64Decode, base64Encode } from '../../utils/index.js';
export class Cookies {
    constructor(req, res) {
        this.cookies = {};
        this.request = req;
        this.response = res;
        this.cookies = cookie.parse(this.request.headers.cookie || '');
    }
    getCookie(key, { encoded = true, isJson = false } = {}) {
        const value = this.cookies[key];
        if (!isString(value)) {
            return;
        }
        const valueStr = encoded ? base64Decode(value) : value;
        // eslint-disable-next-line consistent-return
        return isJson ? JSON.parse(valueStr) : valueStr;
    }
    setCookie(key, value, _a = {}) {
        var _b;
        var { encoded = true, isJson = false } = _a, serializeOptions = __rest(_a, ["encoded", "isJson"]);
        const valueStr = isJson ? JSON.stringify(value) : value;
        const cookieValue = encoded ? base64Encode(valueStr) : valueStr;
        this.cookies[key] = cookieValue;
        (_b = this.response) === null || _b === void 0 ? void 0 : _b.setHeader('Set-Cookie', cookie.serialize(key, cookieValue, serializeOptions));
    }
    removeCookie(key) {
        var _a;
        delete this.cookies[key];
        (_a = this.response) === null || _a === void 0 ? void 0 : _a.setHeader('Set-Cookie', cookie.serialize(key, '', {
            expires: new Date(0),
        }));
    }
}
