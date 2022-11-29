(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 7718:
/***/ ((module) => {

// Exports
module.exports = {
	"home": "_Home_home__5dzeX",
	"heading": "_Home_heading__5RDQt",
	"description": "_Home_description__KT_aU",
	"actions": "_Home_actions__hs7zg",
	"posts": "_Home_posts__01640",
	"testimonials": "_Home_testimonials__a_kK_"
};


/***/ }),

/***/ 1338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MyApp)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./plugins/ProjectTemplatePlugin.js
class ProjectTemplatePlugin {
    constructor(){}
    apply(hooks) {
        hooks.addFilter("possibleTemplatesList", "faust", (templates, data)=>{
            var ref, ref1;
            if ((data === null || data === void 0 ? void 0 : (ref = data.seedNode) === null || ref === void 0 ? void 0 : ref.__typename) === "Project") {
                return Array.from(new Set([
                    "project",
                    ...templates
                ]));
            }
            /* Added: Custom Post Type ( Examplecpts )*/ if ((data === null || data === void 0 ? void 0 : (ref1 = data.seedNode) === null || ref1 === void 0 ? void 0 : ref1.__typename) === "Examplecpt") {
                return Array.from(new Set([
                    "examplecpt",
                    ...templates
                ]));
            }
            return templates;
        });
    }
}

;// CONCATENATED MODULE: external "@apollo/client/utilities"
const utilities_namespaceObject = require("@apollo/client/utilities");
;// CONCATENATED MODULE: ./plugins/RelayStylePaginationPlugin.js

class RelayStylePaginationPlugin {
    constructor(){}
    apply(hooks) {
        hooks.addFilter("apolloClientInMemoryCacheOptions", "faust", (options)=>{
            return {
                ...options,
                typePolicies: {
                    ...options.typePolicies,
                    RootQuery: {
                        ...options.typePolicies.RootQuery,
                        fields: {
                            ...options.typePolicies.RootQuery.fields,
                            posts: (0,utilities_namespaceObject.relayStylePagination)(),
                            projects: (0,utilities_namespaceObject.relayStylePagination)(),
                            contentNodes: (0,utilities_namespaceObject.relayStylePagination)()
                        }
                    },
                    ContentType: {
                        fields: {
                            contentNodes: (0,utilities_namespaceObject.relayStylePagination)()
                        }
                    },
                    Category: {
                        fields: {
                            contentNodes: (0,utilities_namespaceObject.relayStylePagination)()
                        }
                    },
                    Tag: {
                        fields: {
                            contentNodes: (0,utilities_namespaceObject.relayStylePagination)()
                        }
                    }
                }
            };
        });
    }
}

// EXTERNAL MODULE: external "@faustwp/core"
var core_ = __webpack_require__(3895);
;// CONCATENATED MODULE: ./possibleTypes.json
const possibleTypes_namespaceObject = JSON.parse('{"Node":["Category","EnqueuedScript","EnqueuedStylesheet","ContentType","Taxonomy","User","Comment","MediaItem","Page","Post","PostFormat","Tag","Project","UserRole","Testimonial","Menu","MenuItem","Plugin","Theme","CommentAuthor","Examplecpt"],"TermNode":["Category","PostFormat","Tag"],"UniformResourceIdentifiable":["Category","ContentType","User","MediaItem","Page","Post","PostFormat","Tag","Project","Testimonial","Examplecpt"],"EnqueuedAsset":["EnqueuedScript","EnqueuedStylesheet"],"DatabaseIdentifier":["Category","User","Comment","MediaItem","Page","Post","PostFormat","Tag","Project","Testimonial","Menu","MenuItem","Examplecpt"],"HierarchicalTermNode":["Category"],"MenuItemLinkable":["Category","Page","Post","Tag"],"ContentNode":["MediaItem","Page","Post","Project","Testimonial","Examplecpt"],"Commenter":["User","CommentAuthor"],"NodeWithTemplate":["MediaItem","Page","Post","Project","Testimonial","Examplecpt"],"ContentTemplate":["DefaultTemplate","Template_Blank","Template_SinglePostNoSeparators","Template_PageNoSeparators","Template_PageLargeHeader"],"NodeWithTitle":["MediaItem","Page","Post","Project","Testimonial","Examplecpt"],"NodeWithAuthor":["MediaItem","Page","Post","Project","Testimonial","Examplecpt"],"NodeWithComments":["MediaItem","Page","Post"],"HierarchicalContentNode":["MediaItem","Page"],"NodeWithContentEditor":["Page","Post"],"NodeWithFeaturedImage":["Page","Post","Project","Examplecpt"],"NodeWithRevisions":["Page","Post"],"NodeWithPageAttributes":["Page"],"NodeWithExcerpt":["Post"],"NodeWithTrackbacks":["Post"],"ContentRevisionUnion":["Post","Page"],"MenuItemObjectUnion":["Post","Page","Category","Tag"]}');
// EXTERNAL MODULE: ./constants/menus.js
var menus = __webpack_require__(2483);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
// EXTERNAL MODULE: external "react-icons/fa"
var fa_ = __webpack_require__(6290);
// EXTERNAL MODULE: ./styles/pages/_Home.module.scss
var _Home_module = __webpack_require__(7718);
var _Home_module_default = /*#__PURE__*/__webpack_require__.n(_Home_module);
// EXTERNAL MODULE: ./components/index.js + 64 modules
var components = __webpack_require__(7285);
// EXTERNAL MODULE: ./fragments/GeneralSettings.js
var GeneralSettings = __webpack_require__(5261);
;// CONCATENATED MODULE: ./wp-templates/front-page.js







const postsPerPage = 3;
function Component() {
    var ref, ref1, ref2;
    const { data , loading  } = (0,client_.useQuery)(Component.query, {
        variables: Component.variables()
    });
    if (loading) {
        return null;
    }
    const { title: siteTitle , description: siteDescription  } = data === null || data === void 0 ? void 0 : data.generalSettings;
    const primaryMenu = (data === null || data === void 0 ? void 0 : (ref = data.headerMenuItems) === null || ref === void 0 ? void 0 : ref.nodes) ?? [];
    const footerMenu = (data === null || data === void 0 ? void 0 : (ref1 = data.footerMenuItems) === null || ref1 === void 0 ? void 0 : ref1.nodes) ?? [];
    const mainBanner = {
        sourceUrl: "/static/banner.jpeg",
        mediaDetails: {
            width: 1200,
            height: 600
        },
        altText: "Portfolio Banner"
    };
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
                className: (_Home_module_default()).home,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components/* EntryHeader */.wq, {
                        image: mainBanner
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "container",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: "hero text-center",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* Heading */.X6, {
                                        className: (_Home_module_default()).heading,
                                        level: "h1",
                                        children: "Welcome to your Blueprint"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: (_Home_module_default()).description,
                                        children: [
                                            "Achieve unprecedented performance with modern frameworks and the world's #1 open source CMS in one powerful headless platform.",
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (_Home_module_default()).actions,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(components/* Button */.zx, {
                                                styleType: "secondary",
                                                href: "/posts",
                                                children: "GET STARTED"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(components/* Button */.zx, {
                                                styleType: "primary",
                                                href: "/about",
                                                children: "LEARN MORE"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("section", {
                                className: "cta",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(components/* CTA */.MV, {
                                    Button: ()=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(components/* Button */.zx, {
                                            href: "/posts",
                                            children: [
                                                "Get Started ",
                                                /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaArrowRight, {
                                                    style: {
                                                        marginLeft: `1rem`
                                                    }
                                                })
                                            ]
                                        }),
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Learn about Core Web Vitals and how Atlas can help you reach your most demanding speed and user experience requirements."
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: (_Home_module_default()).posts,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* Heading */.X6, {
                                        className: (_Home_module_default()).heading,
                                        level: "h2",
                                        children: "Latest Posts"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* Posts */.V8, {
                                        posts: (ref2 = data.posts) === null || ref2 === void 0 ? void 0 : ref2.nodes,
                                        id: "posts-list"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("section", {
                                className: "cta",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(components/* CTA */.MV, {
                                    Button: ()=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(components/* Button */.zx, {
                                            href: "/posts",
                                            children: [
                                                "Get Started ",
                                                /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaArrowRight, {
                                                    style: {
                                                        marginLeft: `1rem`
                                                    }
                                                })
                                            ]
                                        }),
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Learn about Core Web Vitals and how Atlas can help you reach your most demanding speed and user experience requirements."
                                    })
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Footer */.$_, {
                menuItems: footerMenu
            })
        ]
    });
};
Component.variables = ()=>{
    return {
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N,
        first: postsPerPage
    };
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
 */ Component.query = client_.gql`
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  ${components/* Posts.fragments.entry */.V8.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(
      first: $first,
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
      nodes {
        ...PostsItemFragment
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

;// CONCATENATED MODULE: ./fragments/YoastSeoPage.js

const YoastSeoPageFragment = client_.gql`
  fragment YoastSeoPageFragment on Page {
    seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphSiteName
      opengraphImage {
        mediaItemUrl
        mediaDetails {
          width
          height
        }
        mimeType
      }
      twitterTitle
      twitterDescription
      twitterImage {
        mediaItemUrl
      }
      schema {
        raw
      }
    }
  }
`;

;// CONCATENATED MODULE: ./fragments/GravityForms.js

const GravityFormsFragment = client_.gql`
  fragment GravityFormsFragment on GfForm {
    databaseId
    title
    formFields {
      nodes {
        ... on TextField {
          id
          label
          isRequired
          placeholder
          type
          description
        }
        ... on CheckboxField {
          id
          type
          label
          description
          isRequired
          choices {
            value
            text
          }
        }
      }
    }
  }
`;

;// CONCATENATED MODULE: ./wp-templates/page.js








function page_Component(props) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    // Loading state for previews
    if (props.loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: "Loading..."
        });
    }
    const { title: siteTitle , description: siteDescription  } = props === null || props === void 0 ? void 0 : (ref = props.data) === null || ref === void 0 ? void 0 : ref.generalSettings;
    const primaryMenu = (props === null || props === void 0 ? void 0 : (ref1 = props.data) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.headerMenuItems) === null || ref2 === void 0 ? void 0 : ref2.nodes) ?? [];
    const footerMenu = (props === null || props === void 0 ? void 0 : (ref3 = props.data) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.footerMenuItems) === null || ref4 === void 0 ? void 0 : ref4.nodes) ?? [];
    const { title , content , featuredImage  } = (props === null || props === void 0 ? void 0 : (ref5 = props.data) === null || ref5 === void 0 ? void 0 : ref5.page) ?? {
        title: ""
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components/* SEO */.HJ, {
                yoastSeo: props === null || props === void 0 ? void 0 : (ref6 = props.data) === null || ref6 === void 0 ? void 0 : (ref7 = ref6.page) === null || ref7 === void 0 ? void 0 : ref7.seo
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Header */.h4, {
                title: siteTitle,
                description: siteDescription,
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Main */.or, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components/* EntryHeader */.wq, {
                            title: title,
                            image: featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.node
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "container",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(components/* ContentWrapper */.vs, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(components/* GravityForms */.gs, {
                                    formContent: props === null || props === void 0 ? void 0 : (ref8 = props.data) === null || ref8 === void 0 ? void 0 : ref8.gfForms,
                                    postContent: props === null || props === void 0 ? void 0 : (ref9 = props.data) === null || ref9 === void 0 ? void 0 : ref9.page
                                })
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Footer */.$_, {
                title: siteTitle,
                menuItems: footerMenu
            })
        ]
    });
};
page_Component.variables = ({ databaseId  }, ctx)=>{
    return {
        databaseId,
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N,
        asPreview: ctx === null || ctx === void 0 ? void 0 : ctx.asPreview
    };
};
page_Component.query = client_.gql`
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${YoastSeoPageFragment}
  ${GravityFormsFragment}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  ${components/* FeaturedImage.fragments.entry */.Q_.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
      ...YoastSeoPageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    gfForms(where: {orderby: {order: ASC}}) {
      nodes {
        ...GravityFormsFragment
      }
    }
    
  }
`;

;// CONCATENATED MODULE: ./fragments/YoastSeoPost.js

const YoastSeoPostFragment = client_.gql`
  fragment YoastSeoPostFragment on Post {
    seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphSiteName
      opengraphImage {
        mediaItemUrl
        mediaDetails {
          width
          height
        }
        mimeType
      }
      twitterTitle
      twitterDescription
      twitterImage {
        mediaItemUrl
      }
      schema {
        raw
      }
    }
  }
`;

;// CONCATENATED MODULE: ./fragments/Acf.js

const AcfFragment = client_.gql`
  fragment AcfFragment on Post {
    acfExample {
      fieldGroupName
      exampleTextField
      exampleTextareaField
      exampleImage {
        mediaItemUrl
      }
    }
  }
`;

;// CONCATENATED MODULE: ./wp-templates/single.js









function single_Component(props) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, ref10, ref11, ref12, ref13, ref14;
    // Loading state for previews
    if (props.loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: "Loading..."
        });
    }
    const { title: siteTitle , description: siteDescription  } = props === null || props === void 0 ? void 0 : (ref = props.data) === null || ref === void 0 ? void 0 : ref.generalSettings;
    const primaryMenu = (props === null || props === void 0 ? void 0 : (ref1 = props.data) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.headerMenuItems) === null || ref2 === void 0 ? void 0 : ref2.nodes) ?? [];
    const footerMenu = (props === null || props === void 0 ? void 0 : (ref3 = props.data) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.footerMenuItems) === null || ref4 === void 0 ? void 0 : ref4.nodes) ?? [];
    const { title , content , featuredImage , date , author  } = props.data.post;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components/* SEO */.HJ, {
                yoastSeo: props === null || props === void 0 ? void 0 : (ref5 = props.data) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.post) === null || ref6 === void 0 ? void 0 : ref6.seo
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Header */.h4, {
                title: siteTitle,
                description: siteDescription,
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Main */.or, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components/* EntryHeader */.wq, {
                            title: title,
                            image: featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.node,
                            date: date,
                            author: author === null || author === void 0 ? void 0 : (ref7 = author.node) === null || ref7 === void 0 ? void 0 : ref7.name
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "container",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(components/* ContentWrapper */.vs, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* LoginForm */.U0, {
                                        postContent: props === null || props === void 0 ? void 0 : (ref8 = props.data) === null || ref8 === void 0 ? void 0 : ref8.post
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* RegisterForm */.B2, {
                                        postContent: props === null || props === void 0 ? void 0 : (ref9 = props.data) === null || ref9 === void 0 ? void 0 : ref9.post
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* ResetPassword */.tq, {
                                        postContent: props === null || props === void 0 ? void 0 : (ref10 = props.data) === null || ref10 === void 0 ? void 0 : ref10.post
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* UpdatePassword */.CY, {
                                        postContent: props === null || props === void 0 ? void 0 : (ref11 = props.data) === null || ref11 === void 0 ? void 0 : ref11.post
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* Acf */.h0, {
                                        postContent: props === null || props === void 0 ? void 0 : (ref12 = props.data) === null || ref12 === void 0 ? void 0 : ref12.post
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(components/* GravityForms */.gs, {
                                        formContent: props === null || props === void 0 ? void 0 : (ref13 = props.data) === null || ref13 === void 0 ? void 0 : ref13.gfForms,
                                        postContent: props === null || props === void 0 ? void 0 : (ref14 = props.data) === null || ref14 === void 0 ? void 0 : ref14.post
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Footer */.$_, {
                title: siteTitle,
                menuItems: footerMenu
            })
        ]
    });
};
single_Component.query = client_.gql` 
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${YoastSeoPostFragment}
  ${GravityFormsFragment}
  ${AcfFragment}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  ${components/* FeaturedImage.fragments.entry */.Q_.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      tags {
        edges {
          node {
            name
            uri
          }
        }
      }
      categories {
        edges {
          node {
            name
            uri
          }
        }
      }
      ...FeaturedImageFragment
      ...YoastSeoPostFragment
      ...AcfFragment
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
    gfForms(where: {orderby: {order: ASC}}) {
      nodes {
        ...GravityFormsFragment
      }
    }
  }
`;
single_Component.variables = ({ databaseId  }, ctx)=>{
    return {
        databaseId,
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N,
        asPreview: ctx === null || ctx === void 0 ? void 0 : ctx.asPreview
    };
};

;// CONCATENATED MODULE: ./wp-templates/project.js





function project_Component(props) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    // Loading state for previews
    if (props.loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: "Loading..."
        });
    }
    const { title: siteTitle  } = props === null || props === void 0 ? void 0 : (ref = props.data) === null || ref === void 0 ? void 0 : ref.generalSettings;
    const primaryMenu = (props === null || props === void 0 ? void 0 : (ref1 = props.data) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.headerMenuItems) === null || ref2 === void 0 ? void 0 : ref2.nodes) ?? [];
    const footerMenu = (props === null || props === void 0 ? void 0 : (ref3 = props.data) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.footerMenuItems) === null || ref4 === void 0 ? void 0 : ref4.nodes) ?? [];
    const { title , summary , featuredImage , contentArea  } = props.data.project;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components/* SEO */.HJ, {
                title: `${title} - ${props === null || props === void 0 ? void 0 : (ref5 = props.data) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.generalSettings) === null || ref6 === void 0 ? void 0 : ref6.title}`,
                imageUrl: featuredImage === null || featuredImage === void 0 ? void 0 : (ref7 = featuredImage.node) === null || ref7 === void 0 ? void 0 : ref7.sourceUrl
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Header */.h4, {
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(components/* Main */.or, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components/* EntryHeader */.wq, {
                        title: title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(components/* ProjectHeader */.T4, {
                        image: featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.node,
                        summary: summary,
                        title: title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(components/* ContentWrapper */.vs, {
                            content: contentArea
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Footer */.$_, {
                title: siteTitle,
                menuItems: footerMenu
            })
        ]
    });
};
project_Component.query = client_.gql`
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  ${components/* FeaturedImage.fragments.entry */.Q_.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    project(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title: projectTitle
      summary
      contentArea
      ...FeaturedImageFragment
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
project_Component.variables = ({ databaseId  }, ctx)=>{
    return {
        databaseId,
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N,
        asPreview: ctx === null || ctx === void 0 ? void 0 : ctx.asPreview
    };
};

// EXTERNAL MODULE: ./utilities/pageTitle.js
var pageTitle = __webpack_require__(9844);
// EXTERNAL MODULE: ./app.config.js
var app_config = __webpack_require__(8387);
;// CONCATENATED MODULE: ./wp-templates/archive.js







function Archive(props) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    const { uri , name , __typename  } = props.data.nodeByUri;
    const { data , loading , fetchMore  } = (0,client_.useQuery)(Archive.query, {
        variables: Archive.variables({
            uri
        })
    });
    if (loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
    }
    const { title: siteTitle , description: siteDescription  } = data === null || data === void 0 ? void 0 : data.generalSettings;
    const primaryMenu = (data === null || data === void 0 ? void 0 : (ref = data.headerMenuItems) === null || ref === void 0 ? void 0 : ref.nodes) ?? [];
    const footerMenu = (data === null || data === void 0 ? void 0 : (ref1 = data.footerMenuItems) === null || ref1 === void 0 ? void 0 : ref1.nodes) ?? [];
    const postList = (ref2 = data.nodeByUri) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.contentNodes) === null || ref3 === void 0 ? void 0 : ref3.edges.map((el)=>el.node);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components/* SEO */.HJ, {
                title: (0,pageTitle/* default */.Z)(props === null || props === void 0 ? void 0 : (ref4 = props.data) === null || ref4 === void 0 ? void 0 : ref4.generalSettings, `${__typename}: ${name}`, siteTitle),
                description: siteDescription
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Header */.h4, {
                title: siteTitle,
                description: siteDescription,
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Main */.or, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components/* EntryHeader */.wq, {
                            title: `${__typename}: ${name}`
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "container",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(components/* Posts */.V8, {
                                    posts: postList
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(components/* LoadMore */.fr, {
                                    className: "text-center",
                                    hasNextPage: (ref5 = data.nodeByUri) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.contentNodes) === null || ref6 === void 0 ? void 0 : ref6.pageInfo.hasNextPage,
                                    endCursor: (ref7 = data.nodeByUri) === null || ref7 === void 0 ? void 0 : (ref8 = ref7.contentNodes) === null || ref8 === void 0 ? void 0 : ref8.pageInfo.endCursor,
                                    isLoading: loading,
                                    fetchMore: fetchMore
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Footer */.$_, {
                title: siteTitle,
                menuItems: footerMenu
            })
        ]
    });
};
Archive.query = client_.gql`
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  ${components/* FeaturedImage.fragments.entry */.Q_.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $first: Int!
    $after: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    nodeByUri(uri: $uri) {
      __typename
      id
      uri
      ... on ContentType {
        name
        description
        label
        contentNodes(first: $first, after: $after) {
          edges {
            node {
              id
              ... on NodeWithTitle {
                title
              }
              ... on NodeWithContentEditor {
                content
              }
              date
              uri
              ...FeaturedImageFragment
              ... on NodeWithAuthor {
                author {
                  node {
                    name
                  }
                }
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
      ... on TermNode {
        name
        description
        ... on Category {
          contentNodes(first: $first, after: $after) {
            edges {
              node {
                id
                ... on NodeWithTitle {
                  title
                }
                ... on NodeWithContentEditor {
                  content
                }
                date
                uri
                ...FeaturedImageFragment
                ... on NodeWithAuthor {
                  author {
                    node {
                      name
                    }
                  }
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
        ... on Tag {
          contentNodes(first: $first, after: $after) {
            edges {
              node {
                id
                ... on NodeWithTitle {
                  title
                }
                ... on NodeWithContentEditor {
                  content
                }
                date
                uri
                ...FeaturedImageFragment
                ... on NodeWithAuthor {
                  author {
                    node {
                      name
                    }
                  }
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
Archive.variables = ({ uri  })=>{
    return {
        uri,
        first: app_config/* default.postsPerPage */.Z.postsPerPage,
        after: "",
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N
    };
};

;// CONCATENATED MODULE: ./wp-templates/examplecpt.js





function examplecpt_Component(props) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    // Loading state for previews
    if (props.loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: "Loading..."
        });
    }
    const { title: siteTitle , description: siteDescription  } = props === null || props === void 0 ? void 0 : (ref = props.data) === null || ref === void 0 ? void 0 : ref.generalSettings;
    const primaryMenu = (props === null || props === void 0 ? void 0 : (ref1 = props.data) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.headerMenuItems) === null || ref2 === void 0 ? void 0 : ref2.nodes) ?? [];
    const footerMenu = (props === null || props === void 0 ? void 0 : (ref3 = props.data) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.footerMenuItems) === null || ref4 === void 0 ? void 0 : ref4.nodes) ?? [];
    const { title , content , featuredImage , date , author  } = props === null || props === void 0 ? void 0 : (ref5 = props.data) === null || ref5 === void 0 ? void 0 : ref5.examplecpt;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components/* SEO */.HJ, {
                yoastSeo: props === null || props === void 0 ? void 0 : (ref6 = props.data) === null || ref6 === void 0 ? void 0 : (ref7 = ref6.examplecpt) === null || ref7 === void 0 ? void 0 : ref7.seo
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Header */.h4, {
                title: siteTitle,
                description: siteDescription,
                menuItems: primaryMenu
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Main */.or, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components/* EntryHeader */.wq, {
                            title: title,
                            image: featuredImage === null || featuredImage === void 0 ? void 0 : featuredImage.node,
                            date: date,
                            author: author === null || author === void 0 ? void 0 : (ref8 = author.node) === null || ref8 === void 0 ? void 0 : ref8.name
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "container",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(components/* ContentWrapper */.vs, {
                                content: content
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components/* Footer */.$_, {
                title: siteTitle,
                menuItems: footerMenu
            })
        ]
    });
};
examplecpt_Component.query = client_.gql` 
  ${GeneralSettings/* BlogInfoFragment */.D}
  ${components/* NavigationMenu.fragments.entry */.i9.fragments.entry}
  ${components/* FeaturedImage.fragments.entry */.Q_.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    examplecpt(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
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
examplecpt_Component.variables = ({ databaseId  }, ctx)=>{
    return {
        databaseId,
        headerLocation: menus/* PRIMARY_LOCATION */.q,
        footerLocation: menus/* FOOTER_LOCATION */.N,
        asPreview: ctx === null || ctx === void 0 ? void 0 : ctx.asPreview
    };
};

;// CONCATENATED MODULE: ./wp-templates/index.js






/* harmony default export */ const wp_templates = ({
    "front-page": Component,
    page: page_Component,
    single: single_Component,
    project: project_Component,
    archive: Archive,
    examplecpt: examplecpt_Component
});

;// CONCATENATED MODULE: ./faust.config.js





/**
 * @type {import('@faustwp/core').FaustConfig}
 **/ /* harmony default export */ const faust_config = ((0,core_.setConfig)({
    experimentalPlugins: [
        new ProjectTemplatePlugin(),
        new RelayStylePaginationPlugin(), 
    ],
    possibleTypes: possibleTypes_namespaceObject,
    templates: wp_templates
}));

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: external "next/dist/shared/lib/styled-jsx"
const styled_jsx_namespaceObject = require("next/dist/shared/lib/styled-jsx");
var styled_jsx_default = /*#__PURE__*/__webpack_require__.n(styled_jsx_namespaceObject);
;// CONCATENATED MODULE: ./components/ThemeStyles/ThemeStyles.js



const themes = {
    blue: {
        "--color-black": "#000",
        "--color-primary": "#000066",
        "--color-secondary": "#0969da",
        "--color-tertiary": "#CCCCCC",
        "--color-white": "#FFFFFF"
    },
    red: {
        "--color-black": "#000",
        "--color-primary": "#660000",
        "--color-secondary": "#B50505",
        "--color-tertiary": "#CCCCCC",
        "--color-white": "#FFFFFF"
    },
    green: {
        "--color-black": "#000",
        "--color-primary": "#006600",
        "--color-secondary": "#006827",
        "--color-tertiary": "#CCCCCC",
        "--color-white": "#FFFFFF"
    }
};
function ThemeStyles() {
    const themeColor = (app_config/* default */.Z === null || app_config/* default */.Z === void 0 ? void 0 : app_config/* default.themeColor */.Z.themeColor) ?? "blue";
    return jsx_runtime_.jsx((styled_jsx_default()), {
        id: "10b406c1fd0f1a5b",
        dynamic: [
            themes[themeColor]["--color-black"],
            themes[themeColor]["--color-primary"],
            themes[themeColor]["--color-secondary"],
            themes[themeColor]["--color-tertiary"],
            themes[themeColor]["--color-white"]
        ],
        children: `:root{--color-black:${themes[themeColor]["--color-black"]};--color-primary:${themes[themeColor]["--color-primary"]};--color-secondary:${themes[themeColor]["--color-secondary"]};--color-tertiary:${themes[themeColor]["--color-tertiary"]};--color-white:${themes[themeColor]["--color-white"]}}`
    });
};

;// CONCATENATED MODULE: ./pages/_app.js









function MyApp({ Component , pageProps  }) {
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(ThemeStyles, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(core_.FaustProvider, {
                pageProps: pageProps,
                children: /*#__PURE__*/ (0,external_react_.createElement)(Component, {
                    ...pageProps,
                    key: router.asPath
                })
            })
        ]
    });
};


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
var __webpack_exports__ = __webpack_require__.X(0, [952,61,634,844], () => (__webpack_exec__(1338)));
module.exports = __webpack_exports__;

})();