"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[334],{6666:(e,t,r)=>{r.d(t,{D:()=>n,f:()=>u});var a=r(7378),s=r(1763);const o=Symbol("EmptyContext"),l=a.createContext(o);function n(e){let{children:t}=e;const[r,s]=(0,a.useState)(null),o=(0,a.useMemo)((()=>({expandedItem:r,setExpandedItem:s})),[r]);return a.createElement(l.Provider,{value:o},t)}function u(){const e=(0,a.useContext)(l);if(e===o)throw new s.i6("DocSidebarItemsExpandedStateProvider");return e}},9169:(e,t,r)=>{r.d(t,{a:()=>l});var a=r(7378),s=r(3457),o=r(4993);function l(e){let{threshold:t}=e;const[r,l]=(0,a.useState)(!1),n=(0,a.useRef)(!1),{startScroll:u,cancelScroll:i}=(0,s.Ct)();return(0,s.RF)(((e,r)=>{let{scrollY:a}=e;const s=null==r?void 0:r.scrollY;s&&(n.current?n.current=!1:a>=s?(i(),l(!1)):a<t?l(!1):a+window.innerHeight<document.documentElement.scrollHeight&&l(!0))})),(0,o.S)((e=>{e.location.hash&&(n.current=!0,l(!1))})),{shown:r,scrollToTop:()=>u(0)}}},3452:(e,t,r)=>{r.r(t),r.d(t,{Collapsible:()=>g.z,HtmlClassNameProvider:()=>P.FG,NavbarSecondaryMenuFiller:()=>v.Zo,PageMetadata:()=>P.d,ReactContextError:()=>h.i6,ThemeClassNames:()=>p.k,composeProviders:()=>h.Qc,createStorageSlot:()=>s.W,duplicates:()=>F.l,isMultiColumnFooterLinks:()=>T.a,isRegexpStringMatch:()=>N.F,listStorageKeys:()=>s._,listTagsByLetters:()=>y,translateTagsPageTitle:()=>E,uniq:()=>F.j,useCollapsible:()=>g.u,useColorMode:()=>C.I,useContextualSearchFilters:()=>o._q,useCurrentSidebarCategory:()=>l.jA,useDocsPreferredVersion:()=>k.J,useEvent:()=>h.zX,useIsomorphicLayoutEffect:()=>h.LI,usePluralForm:()=>f,usePrevious:()=>h.D9,usePrismTheme:()=>M.p,useThemeConfig:()=>a.L,useWindowSize:()=>b.i});var a=r(624),s=r(1819),o=r(3149),l=r(5161),n=r(7378),u=r(353);const i=["zero","one","two","few","many","other"];function c(e){return i.filter((t=>e.includes(t)))}const d={locale:"en",pluralForms:c(["one","other"]),select:e=>1===e?"one":"other"};function m(){const{i18n:{currentLocale:e}}=(0,u.default)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:c(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+t.message+"\n"),d}}),[e])}function f(){const e=m();return{selectMessage:(t,r)=>function(e,t,r){const a=e.split("|");if(1===a.length)return a[0];a.length>r.pluralForms.length&&console.error("For locale="+r.locale+", a maximum of "+r.pluralForms.length+" plural forms are expected ("+r.pluralForms.join(",")+"), but the message contains "+a.length+": "+e);const s=r.select(t),o=r.pluralForms.indexOf(s);return a[Math.min(o,a.length-1)]}(r,t,e)}}var g=r(376),p=r(5484),h=r(1763),P=r(1123),C=r(5421),v=r(3471),b=r(8357),S=r(9213);const E=()=>(0,S.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function y(e){const t={};return Object.values(e).forEach((e=>{const r=function(e){return e[0].toUpperCase()}(e.label);null!=t[r]||(t[r]=[]),t[r].push(e)})),Object.entries(t).sort(((e,t)=>{let[r]=e,[a]=t;return r.localeCompare(a)})).map((e=>{let[t,r]=e;return{letter:t,tags:r.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}var T=r(3922),N=r(1503),F=r(784),M=r(6499),k=r(4453)},5181:(e,t,r)=>{r.r(t),r.d(t,{AnnouncementBarProvider:()=>g.pl,BlogPostProvider:()=>d,Collapsible:()=>a.Collapsible,ColorModeProvider:()=>C.S,DEFAULT_SEARCH_TAG:()=>S.HX,DocProvider:()=>n.b,DocSidebarItemsExpandedStateProvider:()=>s.D,DocsPreferredVersionContextProvider:()=>f.L5,DocsSidebarProvider:()=>l.b,DocsVersionProvider:()=>o.q,HtmlClassNameProvider:()=>a.HtmlClassNameProvider,NavbarProvider:()=>x.V,NavbarSecondaryMenuFiller:()=>a.NavbarSecondaryMenuFiller,PageMetadata:()=>a.PageMetadata,PluginHtmlClassNameProvider:()=>w.VC,ReactContextError:()=>a.ReactContextError,ScrollControllerProvider:()=>k.OC,TabGroupChoiceProvider:()=>p.z,ThemeClassNames:()=>a.ThemeClassNames,composeProviders:()=>a.composeProviders,containsLineNumbers:()=>b.nt,createStorageSlot:()=>a.createStorageSlot,docVersionSearchTag:()=>S.os,duplicates:()=>a.duplicates,findFirstCategoryLink:()=>E.Wl,findSidebarCategory:()=>E.em,getPrismCssVariables:()=>b.QC,isActiveSidebarItem:()=>E._F,isDocsPluginEnabled:()=>E.cE,isMultiColumnFooterLinks:()=>a.isMultiColumnFooterLinks,isRegexpStringMatch:()=>a.isRegexpStringMatch,isSamePath:()=>D.Mg,keyboardFocusedClassName:()=>V.h,listStorageKeys:()=>a.listStorageKeys,listTagsByLetters:()=>a.listTagsByLetters,parseCodeBlockTitle:()=>b.bc,parseLanguage:()=>b.Vo,parseLines:()=>b.nZ,splitNavbarItems:()=>x.A,translateTagsPageTitle:()=>a.translateTagsPageTitle,uniq:()=>a.uniq,useAlternatePageUtils:()=>v.l,useAnnouncementBar:()=>g.nT,useBackToTopButton:()=>z.a,useBlogPost:()=>m,useCodeWordWrap:()=>A.F,useCollapsible:()=>a.useCollapsible,useColorMode:()=>a.useColorMode,useContextualSearchFilters:()=>a.useContextualSearchFilters,useCurrentSidebarCategory:()=>a.useCurrentSidebarCategory,useDoc:()=>n.k,useDocById:()=>E.xz,useDocRouteMetadata:()=>E.hI,useDocSidebarItemsExpandedState:()=>s.f,useDocsPreferredVersion:()=>a.useDocsPreferredVersion,useDocsPreferredVersionByPluginId:()=>f.Oh,useDocsSidebar:()=>l.V,useDocsVersion:()=>o.E,useDocsVersionCandidates:()=>E.lO,useEvent:()=>a.useEvent,useFilteredAndTreeifiedTOC:()=>M.b,useHideableNavbar:()=>I.c,useHistoryPopHandler:()=>F.R,useHomePageRoute:()=>D.Ns,useIsomorphicLayoutEffect:()=>a.useIsomorphicLayoutEffect,useKeyboardNavigation:()=>V.t,useLayoutDoc:()=>E.vY,useLayoutDocsSidebar:()=>E.oz,useLocalPathname:()=>N.b,useLocationChange:()=>T.S,useLockBodyScroll:()=>B.N,useNavbarMobileSidebar:()=>h.e,useNavbarSecondaryMenu:()=>P.Y,usePluralForm:()=>a.usePluralForm,usePrevious:()=>a.usePrevious,usePrismTheme:()=>a.usePrismTheme,useScrollController:()=>k.sG,useScrollPosition:()=>k.RF,useScrollPositionBlocker:()=>k.o5,useSearchPage:()=>O,useSidebarBreadcrumbs:()=>E.s1,useSkipToContent:()=>j.a,useSmoothScrollTo:()=>k.Ct,useTOCHighlight:()=>L.S,useTabGroupChoice:()=>p.U,useThemeConfig:()=>a.useThemeConfig,useTitleFormatter:()=>y.p,useTreeifiedTOC:()=>M.a,useWindowSize:()=>a.useWindowSize});var a=r(3452),s=r(6666),o=r(5611),l=r(2095),n=r(9446),u=r(7378),i=r(1763);const c=u.createContext(null);function d(e){let{children:t,content:r,isBlogPostPage:a=!1}=e;const s=function(e){let{content:t,isBlogPostPage:r}=e;return(0,u.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:r})),[t,r])}({content:r,isBlogPostPage:a});return u.createElement(c.Provider,{value:s},t)}function m(){const e=(0,u.useContext)(c);if(null===e)throw new i.i6("BlogPostProvider");return e}var f=r(4453),g=r(10),p=r(9947),h=r(5536),P=r(5530),C=r(5421),v=r(3714),b=r(433),S=r(3149),E=r(5161),y=r(9162),T=r(4993),N=r(3511),F=r(654),M=r(6934),k=r(3457),D=r(8862),w=r(1123),x=r(3211),L=r(1344),I=r(2561),V=r(174),B=r(7930),R=r(5331),_=r(353);const H="q";function O(){const e=(0,R.k6)(),{siteConfig:{baseUrl:t}}=(0,_.default)(),[r,a]=(0,u.useState)("");(0,u.useEffect)((()=>{var e;const t=null!=(e=new URLSearchParams(window.location.search).get(H))?e:"";a(t)}),[]);return{searchQuery:r,setSearchQuery:(0,u.useCallback)((t=>{const r=new URLSearchParams(window.location.search);t?r.set(H,t):r.delete(H),e.replace({search:r.toString()}),a(t)}),[e]),generateSearchPageLink:(0,u.useCallback)((e=>t+"search?"+"q="+encodeURIComponent(e)),[t])}}var A=r(6177),j=r(1801),z=r(9169)},1739:(e,t,r)=>{const a=r(7378),s=r(1884),o=r(3452),l=r(5181),n=r(1999),u=r(4137),i=r(6498),c=r(6715),d=e=>e&&e.__esModule?e:{default:e},m=d(a),f=d(s),g=d(n);function p(e,t,r){if(!e.match(/api\/([\d.]+)/)&&!e.includes("api/next")&&r&&r.name!==t.version){const t="current"===r.name?"next":r.name;return e.endsWith("/api")?e+"/"+t:e.replace("/api/","/api/"+t+"/")}return e}e.exports=function(e){let{options:t,packages:r,history:s}=e;const n=l.useDocsVersion(),d=o.useDocsPreferredVersion(n.pluginId).preferredVersion;return a.useEffect((()=>{1===r.length?s.replace(p(r[0].entryPoints[0].reflection.permalink,n,d)):d&&s.replace(p(s.location.pathname,n,d))}),[r,s,n,d]),m.default.createElement("div",{className:"row"},m.default.createElement("div",{className:"col apiItemCol"},t.banner&&m.default.createElement("div",{className:"alert alert--info margin-bottom--md",role:"alert"},m.default.createElement("div",{dangerouslySetInnerHTML:{__html:t.banner}})),m.default.createElement(c.VersionBanner,null),m.default.createElement("div",{className:"apiItemContainer"},m.default.createElement("article",null,m.default.createElement("div",{className:"markdown"},m.default.createElement("header",null,m.default.createElement(g.default,{as:"h1"},"API")),m.default.createElement("section",{className:"tsd-panel"},m.default.createElement("h3",{className:"tsd-panel-header"},"Packages"),m.default.createElement("div",{className:"tsd-panel-content"},m.default.createElement("ul",{className:"tsd-index-list"},r.map((e=>m.default.createElement("li",{key:e.packageName,className:"tsd-truncate"},m.default.createElement(f.default,{className:"tsd-kind-icon",to:e.entryPoints[0].reflection.permalink},m.default.createElement("span",{className:"tsd-signature-symbol"},"v",e.packageVersion)," ",m.default.createElement("span",null,u.removeScopes(e.packageName,t.scopes)))))))))),m.default.createElement(i.Footer,null)))))}},6498:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=(e=>e&&e.__esModule?e:{default:e})(r(7378));t.Footer=function(){return a.default.createElement("footer",{className:"tsd-footer"},"Powered by"," ",a.default.createElement("a",{href:"https://github.com/milesj/docusaurus-plugin-typedoc-api"},"docusaurus-plugin-typedoc-api")," ","and ",a.default.createElement("a",{href:"https://typedoc.org/"},"TypeDoc"))}},6715:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=r(7378),s=r(1884),o=r(2935),l=r(3452),n=r(5181),u=e=>e&&e.__esModule?e:{default:e},i=u(a),c=u(s);t.VersionBanner=function(){const e=n.useDocsVersion(),t=e.banner,r=e.docs,s=e.pluginId,u=e.version,d=o.useDocVersionSuggestions(s).latestVersionSuggestion,m=l.useDocsPreferredVersion(s).savePreferredVersionName,f=a.useCallback((()=>{m(d.name)}),[d.name,m]);if(!t||!d)return null;const g=r[d.label];return i.default.createElement("div",{className:l.ThemeClassNames.docs.docVersionBanner+" alert alert--warning margin-bottom--md",role:"alert"},i.default.createElement("div",null,"unreleased"===t&&i.default.createElement(i.default.Fragment,null,"This is documentation for an unreleased version."),"unmaintained"===t&&i.default.createElement(i.default.Fragment,null,"This is documentation for version ",i.default.createElement("b",null,u),".")," ","For the latest API, see version"," ",i.default.createElement("b",null,i.default.createElement(c.default,{to:g.id,onClick:f},g.title)),"."))}},4137:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.removeScopes=function(e,t){return 0===t.length?e:t.reduce(((e,t)=>e.replace(new RegExp("^("+t+"-|@"+t+"/)"),"")),e)}}}]);