"use strict";
exports.id = 844;
exports.ids = [844];
exports.modules = {

/***/ 9844:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns a title for the current page
 * @param {GeneralSettings} generalSettings The  general settings node.
 * @param {string} titleOverride An optional title to be used instead of the general settings Title.
 * @param {string} descriptionOverride An optional description to be used instead of the general settings Description.
 * @returns {string} The page Title.
 */ function pageTitle(generalSettings, titleOverride = null, descriptionOverride = null) {
    const title = titleOverride ? titleOverride : generalSettings === null || generalSettings === void 0 ? void 0 : generalSettings.title;
    const description = descriptionOverride ? descriptionOverride : generalSettings === null || generalSettings === void 0 ? void 0 : generalSettings.description;
    if (!title && !description) {
        return "";
    }
    if (title && description) {
        return `${title} - ${description}`;
    }
    return [
        title,
        description
    ].join("").trim();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pageTitle);


/***/ })

};
;