"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const index_js_1 = require("../config/index.js");
const log = (...args) => {
    if ((0, index_js_1.getConfig)().disableLogging) {
        return;
    }
    // eslint-disable-next-line no-console
    console.log(...args);
};
exports.log = log;
