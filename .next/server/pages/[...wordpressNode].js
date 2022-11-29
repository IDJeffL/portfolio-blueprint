"use strict";
(() => {
var exports = {};
exports.id = 886;
exports.ids = [886];
exports.modules = {

/***/ 1746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _faustwp_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3895);
/* harmony import */ var _faustwp_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_faustwp_core__WEBPACK_IMPORTED_MODULE_1__);


function Page(props) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_faustwp_core__WEBPACK_IMPORTED_MODULE_1__.WordPressTemplate, {
        ...props
    });
};
function getStaticProps(ctx) {
    return (0,_faustwp_core__WEBPACK_IMPORTED_MODULE_1__.getWordPressProps)({
        ctx
    });
}
async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking"
    };
}


/***/ }),

/***/ 3895:
/***/ ((module) => {

module.exports = require("@faustwp/core");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1746));
module.exports = __webpack_exports__;

})();