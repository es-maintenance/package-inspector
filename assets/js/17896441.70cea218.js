"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[918],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>p});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),i=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=i(e.components);return a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=i(n),p=r,f=u["".concat(c,".").concat(p)]||u[p]||m[p]||l;return n?a.createElement(f,o(o({ref:t},d),{},{components:n})):a.createElement(f,o({ref:t},d))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var i=2;i<l;i++)o[i]=n[i];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2296:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ne});var a=n(7378),r=n(1123),l=n(9446);function o(){var e;const{metadata:t,frontMatter:n,assets:o}=(0,l.k)();return a.createElement(r.d,{title:t.title,description:t.description,keywords:n.keywords,image:null!=(e=o.image)?e:n.image})}var s=n(8944),c=n(8357),i=n(4619);function d(){const{metadata:e}=(0,l.k)();return a.createElement(i.default,{previous:e.previous,next:e.next})}var m=n(353),u=n(1884),p=n(9213),f=n(2935),v=n(5484),E=n(4453),b=n(5611);const h={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(p.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(p.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function g(e){const t=h[e.versionMetadata.banner];return a.createElement(t,e)}function y(e){let{versionLabel:t,to:n,onClick:r}=e;return a.createElement(p.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:a.createElement("b",null,a.createElement(u.default,{to:n,onClick:r},a.createElement(p.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function k(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:r}}=(0,m.default)(),{pluginId:l}=(0,f.useActivePlugin)({failfast:!0}),{savePreferredVersionName:o}=(0,E.J)(l),{latestDocSuggestion:c,latestVersionSuggestion:i}=(0,f.useDocVersionSuggestions)(l),d=null!=c?c:(u=i).docs.find((e=>e.id===u.mainDocId));var u;return a.createElement("div",{className:(0,s.Z)(t,v.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},a.createElement("div",null,a.createElement(g,{siteTitle:r,versionMetadata:n})),a.createElement("div",{className:"margin-top--md"},a.createElement(y,{versionLabel:i.label,to:d.path,onClick:()=>o(i.name)})))}function w(e){let{className:t}=e;const n=(0,b.E)();return n.banner?a.createElement(k,{className:t,versionMetadata:n}):null}var U=n(5069);function T(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return a.createElement(p.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:a.createElement("b",null,a.createElement("time",{dateTime:new Date(1e3*t).toISOString()},n))}}," on {date}")}function O(e){let{lastUpdatedBy:t}=e;return a.createElement(p.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:a.createElement("b",null,t)}}," by {user}")}function N(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:r}=e;return a.createElement("span",{className:v.k.common.lastUpdated},a.createElement(p.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?a.createElement(T,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:r?a.createElement(O,{lastUpdatedBy:r}):""}},"Last updated{atDate}{byUser}"),!1)}var L=n(5773);const _="iconEdit_bHB7";function Z(e){let{className:t,...n}=e;return a.createElement("svg",(0,L.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.Z)(_,t),"aria-hidden":"true"},n),a.createElement("g",null,a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function j(e){let{editUrl:t}=e;return a.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:v.k.common.editThisPage},a.createElement(Z,null),a.createElement(p.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}const P="tag_otG2",A="tagRegular_s0E1",x="tagWithCount_PGyn";function M(e){let{permalink:t,label:n,count:r}=e;return a.createElement(u.default,{href:t,className:(0,s.Z)(P,r?x:A)},n,r&&a.createElement("span",null,r))}const C="tags_Ow0B",D="tag_DFxh";function B(e){let{tags:t}=e;return a.createElement(a.Fragment,null,a.createElement("b",null,a.createElement(p.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),a.createElement("ul",{className:(0,s.Z)(C,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:n}=e;return a.createElement("li",{key:n,className:D},a.createElement(M,{label:t,permalink:n}))}))))}const S="lastUpdated_pbO5";function V(e){return a.createElement("div",{className:(0,s.Z)(v.k.docs.docFooterTagsRow,"row margin-bottom--sm")},a.createElement("div",{className:"col"},a.createElement(B,e)))}function F(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:r,formattedLastUpdatedAt:l}=e;return a.createElement("div",{className:(0,s.Z)(v.k.docs.docFooterEditMetaRow,"row")},a.createElement("div",{className:"col"},t&&a.createElement(j,{editUrl:t})),a.createElement("div",{className:(0,s.Z)("col",S)},(n||r)&&a.createElement(N,{lastUpdatedAt:n,formattedLastUpdatedAt:l,lastUpdatedBy:r})))}function I(){const{metadata:e}=(0,l.k)(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:r,lastUpdatedBy:o,tags:c}=e,i=c.length>0,d=!!(t||n||o);return i||d?a.createElement("footer",{className:(0,s.Z)(v.k.docs.docFooter,"docusaurus-mt-lg")},i&&a.createElement(V,{tags:c}),d&&a.createElement(F,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:o,formattedLastUpdatedAt:r})):null}var H=n(2218);const R="tocMobile_Ojys";function G(){const{toc:e,frontMatter:t}=(0,l.k)();return a.createElement(H.default,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,s.Z)(v.k.docs.docTocMobile,R)})}var q=n(7061);function z(){const{toc:e,frontMatter:t}=(0,l.k)();return a.createElement(q.default,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:v.k.docs.docTocDesktop})}var J=n(1999),Q=n(5318),W=n(34);function X(e){let{children:t}=e;return a.createElement(Q.Zo,{components:W.default},t)}function K(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=(0,l.k)();return t.hide_title||void 0!==n?null:e.title}();return a.createElement("div",{className:(0,s.Z)(v.k.docs.docMarkdown,"markdown")},n&&a.createElement("header",null,a.createElement(J.default,{as:"h1"},n)),a.createElement(X,null,t))}var Y=n(3911);const $="docItemContainer_tjFy",ee="docItemCol_Qr34";function te(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=(0,l.k)(),n=(0,c.i)(),r=e.hide_table_of_contents,o=!r&&t.length>0;return{hidden:r,mobile:o?a.createElement(G,null):void 0,desktop:!o||"desktop"!==n&&"ssr"!==n?void 0:a.createElement(z,null)}}();return a.createElement("div",{className:"row"},a.createElement("div",{className:(0,s.Z)("col",!n.hidden&&ee)},a.createElement(w,null),a.createElement("div",{className:$},a.createElement("article",null,a.createElement(Y.default,null),a.createElement(U.default,null),n.mobile,a.createElement(K,null,t),a.createElement(I,null)),a.createElement(d,null))),n.desktop&&a.createElement("div",{className:"col col--3"},n.desktop))}function ne(e){const t="docs-doc-id-"+e.content.metadata.unversionedId,n=e.content;return a.createElement(l.b,{content:e.content},a.createElement(r.FG,{className:t},a.createElement(o,null),a.createElement(te,null,a.createElement(n,null))))}}}]);