"use strict";
(() => {
var exports = {};
exports.id = 679;
exports.ids = [679];
exports.modules = {

/***/ 30:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var constants_menus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2483);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7285);
/* harmony import */ var _faustwp_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3895);
/* harmony import */ var _faustwp_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_faustwp_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9844);
/* harmony import */ var fragments_GeneralSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5261);
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8387);









function Page() {
    var ref, ref1, ref2, ref3, ref4, ref5;
    const { data , loading , fetchMore  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(Page.query, {
        variables: Page.variables()
    });
    if (loading) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    }
    const { title: siteTitle  } = data === null || data === void 0 ? void 0 : data.generalSettings;
    const primaryMenu = (data === null || data === void 0 ? void 0 : (ref = data.headerMenuItems) === null || ref === void 0 ? void 0 : ref.nodes) ?? [];
    const footerMenu = (data === null || data === void 0 ? void 0 : (ref1 = data.footerMenuItems) === null || ref1 === void 0 ? void 0 : ref1.nodes) ?? [];
    const postList = data.posts.edges.map((el)=>el.node);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components__WEBPACK_IMPORTED_MODULE_3__/* .SEO */ .HJ, {
                title: (0,utilities__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(data === null || data === void 0 ? void 0 : data.generalSettings)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components__WEBPACK_IMPORTED_MODULE_3__/* .Header */ .h4, {
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(components__WEBPACK_IMPORTED_MODULE_3__/* .Main */ .or, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components__WEBPACK_IMPORTED_MODULE_3__/* .EntryHeader */ .wq, {
                        title: "Latest Posts"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "container",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components__WEBPACK_IMPORTED_MODULE_3__/* .Posts */ .V8, {
                                posts: postList,
                                id: "post-list"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components__WEBPACK_IMPORTED_MODULE_3__/* .LoadMore */ .fr, {
                                className: "text-center",
                                hasNextPage: data === null || data === void 0 ? void 0 : (ref2 = data.posts) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.pageInfo) === null || ref3 === void 0 ? void 0 : ref3.hasNextPage,
                                endCursor: data === null || data === void 0 ? void 0 : (ref4 = data.posts) === null || ref4 === void 0 ? void 0 : (ref5 = ref4.pageInfo) === null || ref5 === void 0 ? void 0 : ref5.endCursor,
                                isLoading: loading,
                                fetchMore: fetchMore
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components__WEBPACK_IMPORTED_MODULE_3__/* .Footer */ .$_, {
                title: siteTitle,
                menuItems: footerMenu
            })
        ]
    });
};
/**
 * We dont want specific WP Posts in this query.
 * Limit results using the notIn 'Post id' value.
 * 
 * Login:           cG9zdDoyMzE=
 * Register:        cG9zdDoyMzM=
 * Reset Password:  cG9zdDoyMzU=
 * Update Password: cG9zdDoyMzc=
 * Search:          cG9zdDoyOTE=
 */ Page.query = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  ${fragments_GeneralSettings__WEBPACK_IMPORTED_MODULE_5__/* .BlogInfoFragment */ .D}
  ${components__WEBPACK_IMPORTED_MODULE_3__/* .NavigationMenu.fragments.entry */ .i9.fragments.entry}
  ${components__WEBPACK_IMPORTED_MODULE_3__/* .FeaturedImage.fragments.entry */ .Q_.fragments.entry}
  ${components__WEBPACK_IMPORTED_MODULE_3__/* .Posts.fragments.entry */ .V8.fragments.entry}
  query GetPostsPage(
    $first: Int!
    $after: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    posts(
      first: $first, 
      after: $after
      where: {
        notIn: [
          "cG9zdDoyMzE=",
          "cG9zdDoyMzM=",
          "cG9zdDoyMzU=",
          "cG9zdDoyMzc=",
          "cG9zdDoyOTE="
        ]
      }
    ) {
      edges {
        node {
          ...PostsItemFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
Page.variables = ()=>{
    return {
        first: app_config__WEBPACK_IMPORTED_MODULE_6__/* ["default"].postsPerPage */ .Z.postsPerPage,
        after: "",
        headerLocation: constants_menus__WEBPACK_IMPORTED_MODULE_8__/* .PRIMARY_LOCATION */ .q,
        footerLocation: constants_menus__WEBPACK_IMPORTED_MODULE_8__/* .FOOTER_LOCATION */ .N
    };
};
async function getStaticProps(context) {
    return (0,_faustwp_core__WEBPACK_IMPORTED_MODULE_4__.getNextStaticProps)(context, {
        Page
    });
}


/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ 3895:
/***/ ((module) => {

module.exports = require("@faustwp/core");

/***/ }),

/***/ 3284:
/***/ ((module) => {

module.exports = require("classnames/bind");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 3539:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/detect-domain-locale.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3431:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-locale.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

/***/ }),

/***/ 4508:
/***/ ((module) => {

module.exports = require("react-responsive-carousel");

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
var __webpack_exports__ = __webpack_require__.X(0, [952,61,634,844], () => (__webpack_exec__(30)));
module.exports = __webpack_exports__;

})();