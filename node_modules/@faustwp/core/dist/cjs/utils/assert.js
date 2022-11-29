"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.emailRegex = exports.isValidUrl = exports.isPreviewPath = exports.previewRegex = exports.isBase64 = exports.isServerSide = void 0;
const isString_js_1 = __importDefault(require("lodash/isString.js"));
/**
 * Returns whether or not the app execution context is currently Server-Side or Client-Side
 *
 * @export
 * @returns {boolean}
 */
function isServerSide() {
    return typeof window === 'undefined';
}
exports.isServerSide = isServerSide;
/**
 * Returns whether or not a string is a base64 encoded string
 *
 * @export
 * @param {string} str
 * @returns
 */
function isBase64(str) {
    if (!(0, isString_js_1.default)(str) || str.length === 0) {
        return false;
    }
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(str.replace(/\n/g, ''));
}
exports.isBase64 = isBase64;
exports.previewRegex = /\/preview(\/\w|\?)/;
function isPreviewPath(uri) {
    if (!(0, isString_js_1.default)(uri)) {
        return false;
    }
    return exports.previewRegex.test(uri);
}
exports.isPreviewPath = isPreviewPath;
/**
 * Returns whether or not a string is a valid URL
 *
 * @export
 * @returns
 */
function isValidUrl(url) {
    try {
        // eslint-disable-next-line no-new
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
exports.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
/**
 * Returns whether or not a string is a valid email address
 *
 * @export
 * @returns
 */
function isValidEmail(email) {
    return exports.emailRegex.test(String(email).toLowerCase());
}
exports.isValidEmail = isValidEmail;
