(() => {
var exports = {};
exports.id = 603;
exports.ids = [603];
exports.modules = {

/***/ 5677:
/***/ ((module) => {

// Exports
module.exports = {
	"search-header-text": "_Search_search-header-text__jkBKe",
	"search-header-pane": "_Search_search-header-pane__zuGYP",
	"load-more": "_Search_load-more__CeUuk"
};


/***/ }),

/***/ 625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Page),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./constants/menus.js
var menus = __webpack_require__(2483);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
// EXTERNAL MODULE: external "@faustwp/core"
var core_ = __webpack_require__(3895);
// EXTERNAL MODULE: ./components/index.js + 64 modules
var components = __webpack_require__(7285);
// EXTERNAL MODULE: ./fragments/GeneralSettings.js
var GeneralSettings = __webpack_require__(5261);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./queries/GetSearchResults.js

const GetSearchResults = client_.gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    contentNodes(
      first: $first, 
      after: $after,  
      where: { 
        search: $search
      }
    ) {
      edges {
        node {
          id
          uri
          date
          databaseId
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithExcerpt {
            excerpt
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// EXTERNAL MODULE: ./styles/pages/_Search.module.scss
var _Search_module = __webpack_require__(5677);
var _Search_module_default = /*#__PURE__*/__webpack_require__.n(_Search_module);
// EXTERNAL MODULE: ./app.config.js
var app_config = __webpack_require__(8387);
;// CONCATENATED MODULE: ./pages/search.js










function Page() {
    var ref, ref1, ref2, ref3;
    const { 0: searchQuery , 1: setSearchQuery  } = (0,external_react_.useState)("");
    const { data: pageData  } = (0,client_.useQuery)(Page.query, {
        variables: Page.variables()
    });
    const { title: siteTitle , description: siteDescription  } = pageData.generalSettings;
    const primaryMenu = pageData.headerMenuItems.nodes ?? [];
    const categories = pageData.categories.nodes;
    const { data: searchResultsData , loading: searchResultsLoading , error: searchResultsError , fetchMore: fetchMoreSearchResults ,  } = (0,client_.useQuery)(GetSearchResults, {
        variables: {
            first: app_config/* default.postsPerPage */.Z.postsPerPage,
            after: "",
            search: searchQuery
        },
        skip: searchQuery === "",
        fetchPolicy: "network-only"
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components/* SEO */.HJ, {
                title: siteTitle,
                description: siteDescription
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Header */.h4, {
                title: siteTitle,
                description: siteDescription,
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(components/* Main */.or, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (_Search_module_default())["search-header-pane"],
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "container small",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                    className: (_Search_module_default())["search-header-text"],
                                    children: searchQuery && !searchResultsLoading ? `Showing results for "${searchQuery}"` : `Search`
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(components/* SearchInput */.Mj, {
                                    value: searchQuery,
                                    onChange: (newValue)=>setSearchQuery(newValue)
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "container small",
                        children: [
                            searchResultsError && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "alert-error",
                                children: "An error has occurred. Please refresh and try again."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(components/* SearchResults */.sZ, {
                                searchResults: searchResultsData === null || searchResultsData === void 0 ? void 0 : (ref = searchResultsData.contentNodes) === null || ref === void 0 ? void 0 : (ref1 = ref.edges) === null || ref1 === void 0 ? void 0 : ref1.map(({ node  })=>node),
                                isLoading: searchResultsLoading
                            }),
                            (searchResultsData === null || searchResultsData === void 0 ? void 0 : (ref2 = searchResultsData.contentNodes) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.pageInfo) === null || ref3 === void 0 ? void 0 : ref3.hasNextPage) && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (_Search_module_default())["load-more"],
                                children: /*#__PURE__*/ jsx_runtime_.jsx(components/* Button */.zx, {
                                    onClick: ()=>{
                                        var ref, ref1;
                                        fetchMoreSearchResults({
                                            variables: {
                                                after: searchResultsData === null || searchResultsData === void 0 ? void 0 : (ref = searchResultsData.contentNodes) === null || ref === void 0 ? void 0 : (ref1 = ref.pageInfo) === null || ref1 === void 0 ? void 0 : ref1.endCursor
                                            }
                                        });
                                    },
                                    children: "Load more"
                                })
                            }),
                            !searchResultsLoading && searchResultsData === undefined && /*#__PURE__*/ jsx_runtime_.jsx(components/* SearchRecommendations */.Ar, {
                                categories: categories
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
Page.variables = ()=>{
    return {
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N
    };
};
Page.query = client_.gql`
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
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
    categories {
      nodes {
        databaseId
        uri
        name
      }
    }
  }
`;
function getStaticProps(ctx) {
    return (0,core_.getNextStaticProps)(ctx, {
        Page
    });
}


/***/ }),

/***/ 9114:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ 3895:
/***/ ((module) => {

"use strict";
module.exports = require("@faustwp/core");

/***/ }),

/***/ 3284:
/***/ ((module) => {

"use strict";
module.exports = require("classnames/bind");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 3539:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/detect-domain-locale.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3431:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-locale.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6290:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fa");

/***/ }),

/***/ 4508:
/***/ ((module) => {

"use strict";
module.exports = require("react-responsive-carousel");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,61,634], () => (__webpack_exec__(625)));
module.exports = __webpack_exports__;

})();