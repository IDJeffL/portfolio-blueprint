(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[679],{7141:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts",function(){return t(5789)}])},5789:function(n,e,t){"use strict";t.r(e),t.d(e,{__N_SSG:function(){return v},default:function(){return g}});var o=t(7297),r=t(5893),s=t(2483),a=t(5850),i=t(7283),u=(t(7294),t(9548)),d=t(9844),l=t(5261),c=t(8387);function f(){var n=(0,o.Z)(["\n  ","\n  ","\n  ","\n  ",'\n  query GetPostsPage(\n    $first: Int!\n    $after: String\n    $headerLocation: MenuLocationEnum\n    $footerLocation: MenuLocationEnum\n  ) {\n    posts(\n      first: $first, \n      after: $after\n      where: {\n        notIn: [\n          "cG9zdDoyMzE=",\n          "cG9zdDoyMzM=",\n          "cG9zdDoyMzU=",\n          "cG9zdDoyMzc=",\n          "cG9zdDoyOTE="\n        ]\n      }\n    ) {\n      edges {\n        node {\n          ...PostsItemFragment\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n    generalSettings {\n      ...BlogInfoFragment\n    }\n    headerMenuItems: menuItems(where: { location: $headerLocation }) {\n      nodes {\n        ...NavigationMenuItemFragment\n      }\n    }\n    footerMenuItems: menuItems(where: { location: $footerLocation }) {\n      nodes {\n        ...NavigationMenuItemFragment\n      }\n    }\n  }\n']);return f=function(){return n},n}var v=!0;function g(){var n,e,t,o,s,i,l=(0,a.a)(g.query,{variables:g.variables()}),c=l.data,f=l.loading,v=l.fetchMore;if(f)return(0,r.jsx)(r.Fragment,{});var m,h,I=(null===c||void 0===c?void 0:c.generalSettings).title,_=null!==(m=null===c||void 0===c||null===(n=c.headerMenuItems)||void 0===n?void 0:n.nodes)&&void 0!==m?m:[],p=null!==(h=null===c||void 0===c||null===(e=c.footerMenuItems)||void 0===e?void 0:e.nodes)&&void 0!==h?h:[],M=c.posts.edges.map((function(n){return n.node}));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.HJ,{title:(0,d.Z)(null===c||void 0===c?void 0:c.generalSettings)}),(0,r.jsx)(u.h4,{menuItems:_}),(0,r.jsxs)(u.or,{children:[(0,r.jsx)(u.wq,{title:"Latest Posts"}),(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)(u.V8,{posts:M,id:"post-list"}),(0,r.jsx)(u.fr,{className:"text-center",hasNextPage:null===c||void 0===c||null===(t=c.posts)||void 0===t||null===(o=t.pageInfo)||void 0===o?void 0:o.hasNextPage,endCursor:null===c||void 0===c||null===(s=c.posts)||void 0===s||null===(i=s.pageInfo)||void 0===i?void 0:i.endCursor,isLoading:f,fetchMore:v})]})]}),(0,r.jsx)(u.$_,{title:I,menuItems:p})]})}g.query=(0,i.Ps)(f(),l.D,u.i9.fragments.entry,u.Q_.fragments.entry,u.V8.fragments.entry),g.variables=function(){return{first:c.Z.postsPerPage,after:"",headerLocation:s.q,footerLocation:s.N}}}},function(n){n.O(0,[774,888,179],(function(){return e=7141,n(n.s=e);var e}));var e=n.O();_N_E=e}]);