var VueDOMCompiler=function(e){"use strict";function t(e,t){const n=Object.create(null),o=e.split(",");for(let e=0;e<o.length;e++)n[o[e]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const n={1:"TEXT",2:"CLASS",4:"STYLE",8:"PROPS",32:"NEED_PATCH",16:"FULL_PROPS",64:"KEYED_FRAGMENT",128:"UNKEYED_FRAGMENT",256:"DYNAMIC_SLOTS",[-1]:"BAIL"},o=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),r=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,lineGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),s=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),c=()=>!1,i=(e,t)=>{for(const n in t)e[n]=t[n];return e},l=Array.isArray,a=e=>"function"==typeof e,u=e=>"string"==typeof e,p=e=>"symbol"==typeof e,f=e=>null!==e&&"object"==typeof e,d=/-(\w)/g,h=/\B([A-Z])/g;function g(e){throw e}function m(e,t,n){const o=e,r=t?` (${t.start.line}:${t.start.column})`:"",s=new SyntaxError(o+r);return s.code=e,s.loc=t,s}const y={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function v(e,t=y){return{type:16,loc:t,elements:e}}function x(e,t=y){return{type:14,loc:t,properties:e}}function b(e,t){return{type:15,loc:y,key:u(e)?S(e,!0):e,value:t}}function S(e,t,n=y,o=!1){return{type:4,loc:n,isConstant:o,content:e,isStatic:t}}function N(e,t=y){return{type:8,loc:t,children:e}}function k(e,t=[],n=y){return{type:13,loc:n,callee:e,arguments:t}}function T(e,t,n=!1,o=y){return{type:17,params:e,returns:t,newline:n,loc:o}}function w(e){return{type:18,expressions:e,loc:y}}function E(e,t,n){return{type:19,test:e,consequent:t,alternate:n,loc:y}}function $(e,t,n=!1){return{type:20,index:e,value:t,isVNode:n,loc:y}}const O=Symbol(""),C=Symbol(""),M=Symbol(""),_=Symbol(""),P=Symbol(""),I=Symbol(""),L=Symbol(""),R=Symbol(""),A=Symbol(""),D=Symbol(""),V=Symbol(""),j=Symbol(""),F=Symbol(""),J=Symbol(""),B=Symbol(""),W=Symbol(""),z=Symbol(""),q=Symbol(""),K=Symbol(""),U=Symbol(""),G=Symbol(""),H=Symbol(""),Y=Symbol(""),Z={[O]:"Fragment",[C]:"Portal",[M]:"Suspense",[_]:"KeepAlive",[P]:"Transition",[I]:"BaseTransition",[L]:"openBlock",[R]:"createBlock",[A]:"createVNode",[D]:"createCommentVNode",[V]:"createTextVNode",[j]:"resolveComponent",[F]:"resolveDynamicComponent",[J]:"resolveDirective",[B]:"withDirectives",[W]:"renderList",[z]:"renderSlot",[q]:"createSlots",[K]:"toString",[U]:"mergeProps",[G]:"toHandlers",[H]:"camelize",[Y]:"setBlockTracking"};function Q(e){Object.getOwnPropertySymbols(e).forEach(t=>{Z[t]=e[t]})}let X,ee;function te(e){return"undefined"!=typeof process&&a(require)?require(e):window._deps[e]}const ne=/^\d|[^\$\w]/,oe=e=>!ne.test(e),re=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])*$/,se=e=>re.test(e);function ce(e,t,n){const o={source:e.source.substr(t,n),start:ie(e.start,e.source,t),end:e.end};return null!=n&&(o.end=ie(e.start,e.source,t+n)),o}function ie(e,t,n=t.length){return le({...e},t,n)}function le(e,t,n=t.length){let o=0,r=-1;for(let e=0;e<n;e++)10===t.charCodeAt(e)&&(o++,r=e);return e.offset+=n,e.line+=o,e.column=-1===r?e.column+n:Math.max(1,n-r),e}function ae(e,t){if(!e)throw new Error(t||"unexpected compiler condition")}function ue(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&(n||r.exp)&&(u(t)?r.name===t:t.test(r.name)))return r}}function pe(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(6===r.type){if(n)continue;if(r.name===t&&r.value)return r}else if("bind"===r.name&&r.arg&&4===r.arg.type&&r.arg.isStatic&&r.arg.content===t&&r.exp)return r}}function fe(e,t){return w([k(t.helper(L)),e])}function de(e){return 7===e.type&&"slot"===e.name}function he(e){return 1===e.type&&3===e.tagType}function ge(e){return 1===e.type&&2===e.tagType}function me(e,t,n){let o;const r=e.callee===z?e.arguments[2]:e.arguments[1];if(null==r||u(r))o=x([t]);else if(13===r.type){const e=r.arguments[0];u(e)||14!==e.type?r.arguments.unshift(x([t])):e.properties.unshift(t),o=r}else 14===r.type?(r.properties.unshift(t),o=r):o=k(n.helper(U),[x([t]),r]);e.callee===z?e.arguments[2]=o:e.arguments[1]=o}function ye(e,t){return`_${t}_${e.replace(/[^\w]/g,"_")}`}const ve=t("suspense,keep-alive,keepalive,transition",!0),xe={delimiters:["{{","}}"],getNamespace:()=>0,getTextMode:()=>0,isVoidTag:c,isPreTag:c,isCustomElement:c,namedCharacterReferences:{"gt;":">","lt;":"<","amp;":"&","apos;":"'","quot;":'"'},maxCRNameLength:5,onError:g};function be(e,t={}){const n=function(e,t){return{options:{...xe,...t},column:1,line:1,offset:0,originalSource:e,source:e,inPre:!1}}(e,t),o=Ie(n);return{type:0,children:Se(n,0,[]),helpers:[],components:[],directives:[],hoists:[],cached:0,codegenNode:void 0,loc:Le(n,o)}}function Se(e,t,n){const o=Re(n),r=o?o.ns:0,s=[];for(;!Je(e,t,n);){const c=e.source;let i=void 0;if(!e.inPre&&Ae(c,e.options.delimiters[0]))i=Me(e,t);else if(0===t&&"<"===c[0])if(1===c.length)Fe(e,8,1);else if("!"===c[1])Ae(c,"\x3c!--")?i=Te(e):Ae(c,"<!DOCTYPE")?i=we(e):Ae(c,"<![CDATA[")?0!==r?i=ke(e,n):(Fe(e,2),i=we(e)):(Fe(e,14),i=we(e));else if("/"===c[1])if(2===c.length)Fe(e,8,2);else{if(">"===c[2]){Fe(e,17,2),De(e,3);continue}if(/[a-z]/i.test(c[2])){Fe(e,31),$e(e,1,o);continue}Fe(e,15,2),i=we(e)}else/[a-z]/i.test(c[1])?i=Ee(e,n):"?"===c[1]?(Fe(e,28,1),i=we(e)):Fe(e,15,1);if(i||(i=_e(e,t)),l(i))for(let e=0;e<i.length;e++)Ne(s,i[e]);else Ne(s,i)}let c=!1;if(!(2===t||o&&e.options.isPreTag(o.tag)))for(let e=0;e<s.length;e++){const t=s[e];if(2===t.type)if(t.content.trim())t.content=t.content.replace(/\s+/g," ");else{const n=s[e-1],o=s[e+1];!n||!o||3===n.type||3===o.type||1===n.type&&1===o.type&&/[\r\n]/.test(t.content)?(c=!0,s[e]=null):t.content=" "}}return c?s.filter(e=>null!==e):s}function Ne(e,t){if(3!==t.type){if(2===t.type){const n=Re(e);if(n&&2===n.type&&n.loc.end.offset===t.loc.start.offset)return n.content+=t.content,n.loc.end=t.loc.end,void(n.loc.source+=t.loc.source)}e.push(t)}}function ke(e,t){De(e,9);const n=Se(e,3,t);return 0===e.source.length?Fe(e,9):De(e,3),n}function Te(e){const t=Ie(e);let n;const o=/--(\!)?>/.exec(e.source);if(o){o.index<=3&&Fe(e,0),o[1]&&Fe(e,13),n=e.source.slice(4,o.index);const t=e.source.slice(0,o.index);let r=1,s=0;for(;-1!==(s=t.indexOf("\x3c!--",r));)De(e,s-r+1),s+4<t.length&&Fe(e,20),r=s+1;De(e,o.index+o[0].length-r+1)}else n=e.source.slice(4),De(e,e.source.length),Fe(e,10);return{type:3,content:n,loc:Le(e,t)}}function we(e){const t=Ie(e),n="?"===e.source[1]?1:2;let o;const r=e.source.indexOf(">");return-1===r?(o=e.source.slice(n),De(e,e.source.length)):(o=e.source.slice(n,r),De(e,r+1)),{type:3,content:o,loc:Le(e,t)}}function Ee(e,t){const n=e.inPre,o=Re(t),r=$e(e,0,o),s=e.inPre&&!n;if(r.isSelfClosing||e.options.isVoidTag(r.tag))return r;t.push(r);const c=e.options.getTextMode(r.tag,r.ns),i=Se(e,c,t);if(t.pop(),r.children=i,Be(e.source,r.tag))$e(e,1,o);else if(Fe(e,32),0===e.source.length&&"script"===r.tag.toLowerCase()){const t=i[0];t&&Ae(t.loc.source,"\x3c!--")&&Fe(e,11)}return r.loc=Le(e,r.loc.start),s&&(e.inPre=!1),r}function $e(e,t,n){const o=Ie(e),r=/^<\/?([a-z][^\t\r\n\f />]*)/i.exec(e.source),s=r[1],c=e.options.getNamespace(s,n);De(e,r[0].length),Ve(e);const l=Ie(e),a=e.source;let u=Oe(e,t);!e.inPre&&u.some(e=>7===e.type&&"pre"===e.name)&&(e.inPre=!0,i(e,l),e.source=a,u=Oe(e,t).filter(e=>"v-pre"!==e.name));let p=!1;0===e.source.length?Fe(e,12):(p=Ae(e.source,"/>"),1===t&&p&&Fe(e,7),De(e,p?2:1));let f=0;return e.inPre||e.options.isCustomElement(s)||(e.options.isNativeTag?e.options.isNativeTag(s)||(f=1):(ve(s)||/^[A-Z]/.test(s))&&(f=1),"slot"===s?f=2:"template"===s&&(f=3)),{type:1,ns:c,tag:s,tagType:f,props:u,isSelfClosing:p,children:[],loc:Le(e,o),codegenNode:void 0}}function Oe(e,t){const n=[],o=new Set;for(;e.source.length>0&&!Ae(e.source,">")&&!Ae(e.source,"/>");){if(Ae(e.source,"/")){Fe(e,29),De(e,1),Ve(e);continue}1===t&&Fe(e,6);const r=Ce(e,o);0===t&&n.push(r),/^[^\t\r\n\f />]/.test(e.source)&&Fe(e,19),Ve(e)}return n}function Ce(e,t){const n=Ie(e),o=/^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(e.source)[0];t.has(o)&&Fe(e,5),t.add(o),"="===o[0]&&Fe(e,26);{const t=/["'<]/g;let n;for(;null!==(n=t.exec(o));)Fe(e,24,n.index)}De(e,o.length);let r=void 0;/^[\t\r\n\f ]*=/.test(e.source)&&(Ve(e),De(e,1),Ve(e),(r=function(e){const t=Ie(e);let n;const o=e.source[0],r='"'===o||"'"===o;if(r){De(e,1);const t=e.source.indexOf(o);-1===t?n=Pe(e,e.source.length,4):(n=Pe(e,t,4),De(e,1))}else{const t=/^[^\t\r\n\f >]+/.exec(e.source);if(!t)return;let o,r=/["'<=`]/g;for(;null!==(o=r.exec(t[0]));)Fe(e,25,o.index);n=Pe(e,t[0].length,4)}return{content:n,isQuoted:r,loc:Le(e,t)}}(e))||Fe(e,16));const s=Le(e,n);if(!e.inPre&&/^(v-|:|@|#)/.test(o)){const t=/(?:^v-([a-z0-9-]+))?(?:(?::|^@|^#)([^\.]+))?(.+)?$/i.exec(o);let c;if(t[2]){const r=o.indexOf(t[2]),s=Le(e,je(e,n,r),je(e,n,r+t[2].length));let i=t[2],l=!0;i.startsWith("[")&&(l=!1,i.endsWith("]")||Fe(e,34),i=i.substr(1,i.length-2)),c={type:4,content:i,isStatic:l,isConstant:l,loc:s}}if(r&&r.isQuoted){const e=r.loc;e.start.offset++,e.start.column++,e.end=ie(e.start,r.content),e.source=e.source.slice(1,-1)}return{type:7,name:t[1]||(Ae(o,":")?"bind":Ae(o,"@")?"on":"slot"),exp:r&&{type:4,content:r.content,isStatic:!1,isConstant:!1,loc:r.loc},arg:c,modifiers:t[3]?t[3].substr(1).split("."):[],loc:s}}return{type:6,name:o,value:r&&{type:2,content:r.content,loc:r.loc},loc:s}}function Me(e,t){const[n,o]=e.options.delimiters,r=e.source.indexOf(o,n.length);if(-1===r)return void Fe(e,33);const s=Ie(e);De(e,n.length);const c=Ie(e),i=Ie(e),l=r-n.length,a=e.source.slice(0,l),u=Pe(e,l,t),p=u.trim(),f=u.indexOf(p);return f>0&&le(c,a,f),le(i,a,l-(u.length-p.length-f)),De(e,o.length),{type:5,content:{type:4,isStatic:!1,isConstant:!1,content:p,loc:Le(e,c,i)},loc:Le(e,s)}}function _e(e,t){const n=["<",e.options.delimiters[0]];3===t&&n.push("]]>");let o=e.source.length;for(let t=0;t<n.length;t++){const r=e.source.indexOf(n[t],1);-1!==r&&o>r&&(o=r)}const r=Ie(e);return{type:2,content:Pe(e,o,t),loc:Le(e,r)}}function Pe(e,t,n){let o=e.source.slice(0,t);if(2===n||3===n||-1===o.indexOf("&"))return De(e,t),o;const r=e.offset+t;let s="";function c(t){De(e,t),o=o.slice(t)}for(;e.offset<r;){const t=/&(?:#x?)?/i.exec(o);if(!t||e.offset+t.index>=r){const t=r-e.offset;s+=o.slice(0,t),c(t);break}if(s+=o.slice(0,t.index),c(t.index),"&"===t[0]){let t="",r=void 0;if(/[0-9a-z]/i.test(o[1])){for(let n=e.options.maxCRNameLength;!r&&n>0;--n)t=o.substr(1,n),r=e.options.namedCharacterReferences[t];if(r){const i=t.endsWith(";");4===n&&!i&&/[=a-z0-9]/i.test(o[1+t.length]||"")?(s+="&"+t,c(1+t.length)):(s+=r,c(1+t.length),i||Fe(e,18))}else Fe(e,30),s+="&"+t,c(1+t.length)}else s+="&",c(1)}else{const n="&#x"===t[0],r=(n?/^&#x([0-9a-f]+);?/i:/^&#([0-9]+);?/).exec(o);if(r){let t=Number.parseInt(r[1],n?16:10);0===t?(Fe(e,22),t=65533):t>1114111?(Fe(e,3),t=65533):t>=55296&&t<=57343?(Fe(e,23),t=65533):t>=64976&&t<=65007||65534==(65534&t)?Fe(e,21):(t>=1&&t<=8||11===t||t>=13&&t<=31||t>=127&&t<=159)&&(Fe(e,4),t=We[t]||t),s+=String.fromCodePoint(t),c(r[0].length),r[0].endsWith(";")||Fe(e,18)}else s+=t[0],Fe(e,1),c(t[0].length)}}return s}function Ie(e){const{column:t,line:n,offset:o}=e;return{column:t,line:n,offset:o}}function Le(e,t,n){return{start:t,end:n=n||Ie(e),source:e.originalSource.slice(t.offset,n.offset)}}function Re(e){return e[e.length-1]}function Ae(e,t){return e.startsWith(t)}function De(e,t){const{source:n}=e;le(e,n,t),e.source=n.slice(t)}function Ve(e){const t=/^[\t\r\n\f ]+/.exec(e.source);t&&De(e,t[0].length)}function je(e,t,n){return ie(t,e.originalSource.slice(t.offset,n),n)}function Fe(e,t,n){const o=Ie(e);n&&(o.offset+=n,o.column+=n),e.options.onError(m(t,{start:o,end:o,source:""}))}function Je(e,t,n){const o=e.source;switch(t){case 0:if(Ae(o,"</"))for(let e=n.length-1;e>=0;--e)if(Be(o,n[e].tag))return!0;break;case 1:case 2:{const e=Re(n);if(e&&Be(o,e.tag))return!0;break}case 3:if(Ae(o,"]]>"))return!0}return!o}function Be(e,t){return Ae(e,"</")&&e.substr(2,t.length).toLowerCase()===t.toLowerCase()&&/[\t\n\f />]/.test(e[2+t.length]||">")}const We={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};function ze(e,t){!function e(t,n,o,r=!1){for(let s=0;s<t.length;s++){const c=t[s];if(1===c.type&&0===c.tagType){if(!r&&Ke(c,o)){c.codegenNode=n.hoist(c.codegenNode);continue}{const e=c.codegenNode;if(13===e.type){const t=Qe(e);if(!(t&&32!==t&&1!==t||Ue(c)||Ge())){const t=He(c);t&&"null"!==t&&(Ze(e).arguments[1]=n.hoist(t))}}}}if(1===c.type)e(c.children,n,o);else if(11===c.type)e(c.children,n,o,1===c.children.length);else if(9===c.type)for(let t=0;t<c.branches.length;t++){const r=c.branches[t].children;e(r,n,o,1===r.length)}}}(e.children,t,new Map,qe(e,e.children[0]))}function qe(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!ge(t)}function Ke(e,t=new Map){switch(e.type){case 1:if(0!==e.tagType)return!1;const n=t.get(e);if(void 0!==n)return n;const o=e.codegenNode;if(13!==o.type)return!1;if(Qe(o)||Ue(e)||Ge())return t.set(e,!1),!1;for(let n=0;n<e.children.length;n++)if(!Ke(e.children[n],t))return t.set(e,!1),!1;return t.set(e,!0),!0;case 2:case 3:return!0;case 9:case 11:return!1;case 5:case 12:return Ke(e.content,t);case 4:return e.isConstant;case 8:return e.children.every(e=>u(e)||p(e)||Ke(e,t));default:return!1}}function Ue(e){return!(!pe(e,"key",!0)&&!pe(e,"ref",!0))}function Ge(e){return!1}function He(e){const t=e.codegenNode;if(13===t.type)return Ye(t,1)}function Ye(e,t){return Ze(e).arguments[t]}function Ze(e){return e.callee===B?e.arguments[0]:e}function Qe(e){const t=Ye(e,3);return t?parseInt(t,10):void 0}function Xe(e,t){const n=function(e,{prefixIdentifiers:t=!1,hoistStatic:n=!1,cacheHandlers:o=!1,nodeTransforms:r=[],directiveTransforms:s={},onError:c=g}){const i={root:e,helpers:new Set,components:new Set,directives:new Set,hoists:[],cached:0,identifiers:{},scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},prefixIdentifiers:t,hoistStatic:n,cacheHandlers:o,nodeTransforms:r,directiveTransforms:s,onError:c,parent:null,currentNode:e,childIndex:0,helper:e=>(i.helpers.add(e),e),helperString:e=>(i.prefixIdentifiers?"":"_")+Z[i.helper(e)],replaceNode(e){i.parent.children[i.childIndex]=i.currentNode=e},removeNode(e){const t=i.parent.children,n=e?t.indexOf(e):i.currentNode?i.childIndex:-1;e&&e!==i.currentNode?i.childIndex>n&&(i.childIndex--,i.onNodeRemoved()):(i.currentNode=null,i.onNodeRemoved()),i.parent.children.splice(n,1)},onNodeRemoved:()=>{},addIdentifiers(e){},removeIdentifiers(e){},hoist:e=>(i.hoists.push(e),S(`_hoisted_${i.hoists.length}`,!1,e.loc,!0)),cache:(e,t=!1)=>$(++i.cached,e,t)};return i}(e,t);tt(e,n),t.hoistStatic&&ze(e,n),function(e,t){const{helper:n}=t,{children:o}=e,r=o[0];if(1===o.length)if(qe(e,r)&&r.codegenNode){const o=r.codegenNode;20!==o.type?(o.callee===B?o.arguments[0].callee=n(R):o.callee=n(R),e.codegenNode=fe(o,t)):e.codegenNode=o}else e.codegenNode=r;else o.length>1&&(e.codegenNode=fe(k(n(R),[n(O),"null",e.children]),t));e.helpers=[...t.helpers],e.components=[...t.components],e.directives=[...t.directives],e.hoists=t.hoists,e.cached=t.cached}(e,n)}function et(e,t){let n=0;const o=()=>{n--};for(;n<e.children.length;n++){const r=e.children[n];u(r)||(t.currentNode=r,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,tt(r,t))}}function tt(e,t){const{nodeTransforms:n}=t,o=[];for(let r=0;r<n.length;r++){const s=n[r](e,t);if(s&&(l(s)?o.push(...s):o.push(s)),!t.currentNode)return;e=t.currentNode}switch(e.type){case 3:t.helper(D);break;case 5:t.helper(K);break;case 9:for(let n=0;n<e.branches.length;n++)et(e.branches[n],t);break;case 11:case 1:case 0:et(e,t)}let r=o.length;for(;r--;)o[r]()}function nt(e,t){const n=u(e)?t=>t===e:t=>e.test(t);return(e,o)=>{if(1===e.type){const{props:r}=e;if(3===e.tagType&&r.some(de))return;const s=[];for(let c=0;c<r.length;c++){const i=r[c];if(7===i.type&&n(i.name)){r.splice(c,1),c--;const n=t(e,i,o);n&&s.push(n)}}return s}}}function ot(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:o=!1,filename:r="template.vue.html"}){const s={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,source:e.loc.source,code:"",column:1,line:1,offset:0,indentLevel:0,map:void 0,helper(e){const t=Z[e];return n?t:`_${t}`},push(e,t,n){s.code+=e},resetMapping(e){},indent(){c(++s.indentLevel)},deindent(e=!1){e?--s.indentLevel:c(--s.indentLevel)},newline(){c(s.indentLevel)}};function c(e){s.push("\n"+"  ".repeat(e))}return s}(e,t),{mode:o,push:r,helper:s,prefixIdentifiers:c,indent:i,deindent:l,newline:a}=n,u=e.helpers.length>0,p=!c&&"module"!==o;if("function"===o){if(u)if(c)r(`const { ${e.helpers.map(s).join(", ")} } = Vue\n`);else if(r("const _Vue = Vue\n"),e.hoists.length){r(`const { ${[A,D,V].filter(t=>e.helpers.includes(t)).map(e=>`${Z[e]}: _${Z[e]}`).join(", ")} } = Vue\n`)}st(e.hoists,n),a(),r("return ")}else u&&r(`import { ${e.helpers.map(s).join(", ")} } from "vue"\n`),st(e.hoists,n),a(),r("export default ");return r("function render() {"),i(),p?(r("with (this) {"),i(),u&&(r(`const { ${e.helpers.map(e=>`${Z[e]}: _${Z[e]}`).join(", ")} } = _Vue`),a(),e.cached>0&&(r("const _cache = $cache"),a()),a())):(r("const _ctx = this"),e.cached>0&&(a(),r("const _cache = _ctx.$cache")),a()),e.components.length&&rt(e.components,"component",n),e.directives.length&&rt(e.directives,"directive",n),(e.components.length||e.directives.length)&&a(),r("return "),e.codegenNode?lt(e.codegenNode,n):r("null"),p&&(l(),r("}")),l(),r("}"),{ast:e,code:n.code,map:n.map?n.map.toJSON():void 0}}function rt(e,t,n){const o=n.helper("component"===t?j:J);for(let r=0;r<e.length;r++){const s=e[r];n.push(`const ${ye(s,t)} = ${o}(${JSON.stringify(s)})`),n.newline()}}function st(e,t){e.length&&(t.newline(),e.forEach((e,n)=>{t.push(`const _hoisted_${n+1} = `),lt(e,t),t.newline()}))}function ct(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),it(e,t,n),n&&t.deindent(),t.push("]")}function it(e,t,n=!1){const{push:o,newline:r}=t;for(let s=0;s<e.length;s++){const c=e[s];u(c)?o(c):l(c)?ct(c,t):lt(c,t),s<e.length-1&&(n?(o(","),r()):o(", "))}}function lt(e,t){if(u(e))t.push(e);else if(p(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:lt(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),e)}(e,t);break;case 4:at(e,t);break;case 5:!function(e,t){const{push:n,helper:o}=t;n(`${o(K)}(`),lt(e.content,t),n(")")}(e,t);break;case 12:lt(e.codegenNode,t);break;case 8:ut(e,t);break;case 3:break;case 13:!function(e,t){const n=u(e.callee)?e.callee:t.helper(e.callee);t.push(n+"(",e,!0),it(e.arguments,t),t.push(")")}(e,t);break;case 14:!function(e,t){const{push:n,indent:o,deindent:r,newline:s,resetMapping:c}=t,{properties:i}=e;if(!i.length)return void n("{}",e);const l=i.length>1||!1;n(l?"{":"{ "),l&&o();for(let e=0;e<i.length;e++){const{key:o,value:r,loc:l}=i[e];c(l),pt(o,t),n(": "),lt(r,t),e<i.length-1&&(n(","),s())}l&&r(),n(l?"}":" }")}(e,t);break;case 16:!function(e,t){ct(e.elements,t)}(e,t);break;case 17:!function(e,t){const{push:n,indent:o,deindent:r}=t,{params:s,returns:c,newline:i}=e;n("(",e),l(s)?it(s,t):s&&lt(s,t);n(") => "),i&&(n("{"),o(),n("return "));l(c)?ct(c,t):lt(c,t);i&&(r(),n("}"))}(e,t);break;case 18:!function(e,t){t.push("("),it(e.expressions,t),t.push(")")}(e,t);break;case 19:!function(e,t){const{test:n,consequent:o,alternate:r}=e,{push:s,indent:c,deindent:i,newline:l}=t;if(4===n.type){const e=!oe(n.content);e&&s("("),at(n,t),e&&s(")")}else s("("),ut(n,t),s(")");c(),t.indentLevel++,s("? "),lt(o,t),t.indentLevel--,l(),s(": ");const a=19===r.type;a||t.indentLevel++;lt(r,t),a||t.indentLevel--;i(!0)}(e,t);break;case 20:!function(e,t){const{push:n,helper:o,indent:r,deindent:s,newline:c}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(r(),n(`${o(Y)}(-1),`),c());n(`_cache[${e.index}] = `),lt(e.value,t),e.isVNode&&(n(","),c(),n(`${o(Y)}(1),`),c(),n(`_cache[${e.index}]`),s());n(")")}(e,t)}}function at(e,t){const{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,e)}function ut(e,t){for(let n=0;n<e.children.length;n++){const o=e.children[n];u(o)?t.push(o):lt(o,t)}}function pt(e,t){const{push:n}=t;if(8===e.type)n("["),ut(e,t),n("]");else if(e.isStatic){n(oe(e.content)?e.content:JSON.stringify(e.content),e)}else n(`[${e.content}]`,e)}const ft=nt(/^(if|else|else-if)$/,(e,t,n)=>{if(!("else"===t.name||t.exp&&t.exp.content.trim())){const o=t.exp?t.exp.loc:e.loc;n.onError(m(35,t.loc)),t.exp=S("true",!1,o)}if("if"===t.name){const o=dt(e,t),r=w([k(n.helper(L))]);return n.replaceNode({type:9,loc:e.loc,branches:[o],codegenNode:r}),()=>{r.expressions.push(ht(o,0,n))}}{const o=n.parent.children;let r=o.indexOf(e);for(;r-- >=-1;){const s=o[r];if(s&&9===s.type){n.removeNode();const o=dt(e,t);s.branches.push(o),et(o,n),n.currentNode=null;let r=s.codegenNode.expressions[1];for(;;){if(19!==r.alternate.type){r.alternate=ht(o,s.branches.length-1,n);break}r=r.alternate}}else n.onError(m(36,e.loc));break}}});function dt(e,t){return{type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:3===e.tagType?e.children:[e]}}function ht(e,t,n){return e.condition?E(e.condition,gt(e,t,n),k(n.helper(D),['""',"true"])):gt(e,t,n)}function gt(e,t,n){const{helper:o}=n,r=b("key",S(t+"",!1)),{children:s}=e,c=s[0];if(1!==s.length||1!==c.type){const e=[o(O),x([r]),s];if(1===s.length&&11===c.type){const t=c.codegenNode.expressions[1].arguments;e[2]=t[2],e[3]=t[3]}return k(o(R),e)}{const e=c.codegenNode;let t=e;return t.callee===B&&(t=t.arguments[0]),t.callee===A&&(t.callee=o(R)),me(t,r,n),e}}const mt=nt("for",(e,t,n)=>{if(!t.exp)return void n.onError(m(37,t.loc));const o=bt(t.exp);if(!o)return void n.onError(m(38,t.loc));const{helper:r,addIdentifiers:s,removeIdentifiers:c,scopes:i}=n,{source:l,value:a,key:u,index:p}=o,f=k(r(W),[l]),d=pe(e,"key"),h=d?64:128,g=w([k(r(L),["false"]),k(r(R),[r(O),"null",f,h+""])]);return n.replaceNode({type:11,loc:t.loc,source:l,valueAlias:a,keyAlias:u,objectIndexAlias:p,children:3===e.tagType?e.children:[e],codegenNode:g}),i.vFor++,()=>{let t;i.vFor--;const s=he(e),c=ge(e)?e:s&&1===e.children.length&&ge(e.children[0])?e.children[0]:null,l=d?b("key",6===d.type?S(d.value.content,!0):d.exp):null;if(c)t=c.codegenNode,s&&l&&me(t,l,n);else if(s)t=fe(k(r(R),[r(O),l?x([l]):"null",e.children]),n);else{let o=e.codegenNode;o.callee===B?o.arguments[0].callee=r(R):o.callee=r(R),t=fe(o,n)}f.arguments.push(T(Nt(o),t,!0))}}),yt=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,vt=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,xt=/^\(|\)$/g;function bt(e,t){const n=e.loc,o=e.content,r=o.match(yt);if(!r)return;const[,s,c]=r,i={source:St(n,c.trim(),o.indexOf(c,s.length)),value:void 0,key:void 0,index:void 0};let l=s.trim().replace(xt,"").trim();const a=s.indexOf(l),u=l.match(vt);if(u){l=l.replace(vt,"").trim();const e=u[1].trim();let t;if(e&&(t=o.indexOf(e,a+l.length),i.key=St(n,e,t)),u[2]){const r=u[2].trim();r&&(i.index=St(n,r,o.indexOf(r,i.key?t+e.length:a+l.length)))}}return l&&(i.value=St(n,l,a)),i}function St(e,t,n){return S(t,!1,ce(e,n,t.length))}function Nt({value:e,key:t,index:n}){const o=[];return e&&o.push(e),t&&(e||o.push(S("_",!1)),o.push(t)),n&&(t||(e||o.push(S("_",!1)),o.push(S("__",!1))),o.push(n)),o}const kt=e=>4===e.type&&e.isStatic,Tt=S("undefined",!1),wt=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=ue(e,"slot");if(n){n.exp;return t.scopes.vSlot++,()=>{t.scopes.vSlot--}}}};function Et(e,t,n){return b("default",T(e,t,!1,t.length?t[0].loc:n))}function $t(e,t){return x([b("name",e),b("fn",t)])}const Ot=new WeakMap,Ct=(e,t)=>e===t||e===(e=>e.replace(h,"-$1").toLowerCase())(t),Mt=(e,t)=>{if(!(1!==e.type||2===e.tagType||3===e.tagType&&e.props.some(de)))return function(){const{tag:n,tagType:o,props:r}=e,s=Ct(n,"Portal"),c=Ct(n,"Suspense"),i=Ct(n,"KeepAlive"),l=Ct(n,"Transition"),a=1===o;let u,p,f,d=r.length>0,h=0;const g=pe(e,"is");if("component"===n&&g)if(6===g.type){const e=g.value&&g.value.content;e&&(t.helper(j),t.components.add(e),f=ye(e,"component"))}else g.exp&&(f=k(t.helper(F),[g.exp,t.prefixIdentifiers?"_ctx.$":"$"]));let y;f?y=f:s?y=t.helper(C):c?y=t.helper(M):i?y=t.helper(_):l?y=t.helper(P):a?(t.helper(j),t.components.add(n),y=ye(n,"component")):y=`"${e.tag}"`;const N=[y];if(d){const n=_t(e,t,g?e.props.filter(e=>e!==g):e.props);h=n.patchFlag,p=n.dynamicPropNames,u=n.directives,n.props?N.push(n.props):d=!1}const w=e.children.length>0;if(w)if(d||N.push("null"),!a||s||i)if(1===e.children.length){const t=e.children[0],n=t.type,o=5===n||8===n;o&&!Ke(t)&&(h|=1),o||2===n?N.push(t):N.push(e.children)}else N.push(e.children);else{const{slots:n,hasDynamicSlots:o}=function(e,t){const{children:n,loc:o}=e,r=[],s=[];let c=t.scopes.vSlot>0||t.scopes.vFor>0;const i=ue(e,"slot",!0);if(i){const{arg:e,exp:o,loc:s}=i;e&&t.onError(m(42,s)),r.push(Et(o,n,s))}let l=!1,a=void 0;const u=new Set;for(let e=0;e<n.length;e++){const o=n[e];let p;if(!he(o)||!(p=ue(o,"slot",!0))){3===o.type||a||(a=o);continue}if(i){t.onError(m(43,p.loc));break}l=!0;const{children:f,loc:d}=o,{arg:h=S("default",!0),exp:g,loc:y}=p;let v;kt(h)?v=h?h.content:"default":c=!0;const x=T(g,f,!1,f.length?f[0].loc:d);let N,w,$;if(N=ue(o,"if"))c=!0,s.push(E(N.exp,$t(h,x),Tt));else if(w=ue(o,/^else(-if)?$/,!0)){let o,r=e;for(;r--&&3===(o=n[r]).type;);if(o&&he(o)&&ue(o,"if")){n.splice(e,1),e--;let t=s[s.length-1];for(;19===t.alternate.type;)t=t.alternate;t.alternate=w.exp?E(w.exp,$t(h,x),Tt):$t(h,x)}else t.onError(m(36,w.loc))}else if($=ue(o,"for")){c=!0;const e=$.parseResult||bt($.exp);e?s.push(k(t.helper(W),[e.source,T(Nt(e),$t(h,x),!0)])):t.onError(m(38,$.loc))}else{if(v){if(u.has(v)){t.onError(m(44,y));continue}u.add(v)}r.push(b(h,x))}}l&&a&&t.onError(m(45,a.loc)),i||l||r.push(Et(void 0,n,o));let p=x(r.concat(b("_compiled",S("true",!1))),o);return s.length&&(p=k(t.helper(q),[p,v(s)])),{slots:p,hasDynamicSlots:c}}(e,t);N.push(n),o&&(h|=256)}0!==h&&(w||(d||N.push("null"),N.push("null")),N.push(h+""),p&&p.length&&N.push(function(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}(p)));const{loc:$}=e,O=k(t.helper(A),N,$);u&&u.length?e.codegenNode=k(t.helper(B),[O,v(u.map(e=>(function(e,t){const n=[],o=Ot.get(e);o?(t.helper(o),n.push(t.helperString(o))):(t.helper(J),t.directives.add(e.name),n.push(ye(e.name,"directive")));const{loc:r}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));Object.keys(e.modifiers).length&&(e.arg||(e.exp||n.push("void 0"),n.push("void 0")),n.push(x(e.modifiers.map(e=>b(e,S("true",!1,r))),r)));return v(n,e.loc)})(e,t)),$)],$):e.codegenNode=O}};function _t(e,t,n=e.props){const o=e.loc,r=1===e.tagType;let s=[];const c=[],i=[];let l=0,a=!1,u=!1,f=!1,d=!1;const h=[],g=({key:e,value:t})=>{if(4===e.type&&e.isStatic){if(20===t.type||(4===t.type||8===t.type)&&Ke(t))return;const n=e.content;"ref"===n?a=!0:"class"===n?u=!0:"style"===n?f=!0:"key"!==n&&h.push(n)}else d=!0};for(let l=0;l<n.length;l++){const u=n[l];if(6===u.type){const{loc:e,name:t,value:n}=u;"ref"===t&&(a=!0),s.push(b(S(t,!0,ce(e,0,t.length)),S(n?n.content:"",!0,n?n.loc:e)))}else{const{name:n,arg:l,exp:a,loc:f}=u;if("slot"===n){r||t.onError(m(46,f));continue}if("once"===n)continue;const h="bind"===n,y="on"===n;if(!l&&(h||y)){d=!0,a?(s.length&&(c.push(x(Pt(s),o)),s=[]),h?c.push(a):c.push({type:13,loc:f,callee:t.helper(G),arguments:[a]})):t.onError(m(h?39:40,f));continue}const v=t.directiveTransforms[n];if(v){const{props:n,needRuntime:o}=v(u,e,t);n.forEach(g),s.push(...n),o&&(i.push(u),p(o)&&Ot.set(u,o))}else i.push(u)}}let y=void 0;return c.length?(s.length&&c.push(x(Pt(s),o)),y=c.length>1?k(t.helper(U),c,o):c[0]):s.length&&(y=x(Pt(s),o)),d?l|=16:(u&&(l|=2),f&&(l|=4),h.length&&(l|=8)),0===l&&(a||i.length>0)&&(l|=32),{props:y,directives:i,patchFlag:l,dynamicPropNames:h}}function Pt(e){const t=new Map,n=[];for(let o=0;o<e.length;o++){const r=e[o];if(8===r.key.type||!r.key.isStatic){n.push(r);continue}const s=r.key.content,c=t.get(s);c?("style"===s||"class"===s||s.startsWith("on")||s.startsWith("vnode"))&&It(c,r):(t.set(s,r),n.push(r))}return n}function It(e,t){16===e.value.type?e.value.elements.push(t.value):e.value=v([e.value,t.value],e.loc)}const Lt=(e,t)=>{if(ge(e)){const{props:n,children:o,loc:r}=e,s=t.prefixIdentifiers?"_ctx.$slots":"$slots";let c='"default"',i=-1;for(let e=0;e<n.length;e++){const t=n[e];if(6===t.type){if("name"===t.name&&t.value){c=JSON.stringify(t.value.content),i=e;break}}else if("bind"===t.name){const{arg:n,exp:o}=t;if(n&&o&&4===n.type&&n.isStatic&&"name"===n.content){c=o,i=e;break}}}const l=[s,c],a=i>-1?n.slice(0,i).concat(n.slice(i+1)):n;let u=a.length>0;if(u){const{props:n,directives:o}=_t(e,t,a);o.length&&t.onError(m(41,o[0].loc)),n?l.push(n):u=!1}o.length&&(u||l.push("{}"),l.push(o)),e.codegenNode=k(t.helper(z),l,r)}},Rt=/^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,At=(e,t,n,o)=>{const{loc:r,modifiers:s,arg:c}=e;let i;e.exp||s.length||n.onError(m(40,r)),4===c.type?i=c.isStatic?S(`on${(e=>e.charAt(0).toUpperCase()+e.slice(1))(c.content)}`,!0,c.loc):N(['"on" + (',c,")"]):((i=c).children.unshift('"on" + ('),i.children.push(")"));let l=e.exp,a=!l;if(l){const e=se(l.content);(!(e||Rt.test(l.content))||a&&e)&&(l=N(["$event => (",...4===l.type?[l]:l.children,")"]))}let u={props:[b(i,l||S("() => {}",!1,r))],needRuntime:!1};return o&&(u=o(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u},Dt=(e,t,n)=>{const{exp:o,modifiers:r,loc:s}=e,c=e.arg;return o||n.onError(m(39,s)),r.includes("camel")&&(4===c.type?c.isStatic?c.content=(e=>e.replace(d,(e,t)=>t?t.toUpperCase():""))(c.content):c.content=`${n.helperString(H)}(${c.content})`:(c.children.unshift(`${n.helperString(H)}(`),c.children.push(")"))),{props:[b(c,o||S("",!0,s))],needRuntime:!1}},Vt=e=>5===e.type||2===e.type,jt=(e,t)=>{if(0===e.type||1===e.type)return()=>{const o=e.children;let r=void 0,s=!1;for(let e=0;e<o.length;e++){const t=o[e];if(Vt(t)){s=!0;for(let n=e+1;n<o.length;n++){const s=o[n];if(!Vt(s)){r=void 0;break}r||(r=o[e]={type:8,loc:t.loc,children:[t]}),r.children.push(" + ",s),o.splice(n,1),n--}}}if(s&&o.length>1)for(let e=0;e<o.length;e++){const r=o[e];if(Vt(r)||8===r.type){const s=[];2===r.type&&" "===r.content||s.push(r),2!==r.type&&s.push(`1 /* ${n[1]} */`),o[e]={type:12,content:r,loc:r.loc,codegenNode:k(t.helper(V),s)}}}}},Ft=(e,t)=>{if(1===e.type&&ue(e,"once",!0))return t.helper(Y),()=>{e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0))}},Jt=(e,t,n)=>{const{exp:o,arg:r}=e;if(!o)return n.onError(m(47,e.loc)),Bt();const s=4===o.type?o.content:o.loc.source;if(!se(s))return n.onError(m(48,o.loc)),Bt();const c=r||S("modelValue",!0),i=r?4===r.type&&r.isStatic?`onUpdate:${r.content}`:N(['"onUpdate:" + ',...4===r.type?[r]:r.children]):"onUpdate:modelValue",l=[b(c,e.exp),b(i,N(["$event => (",...4===o.type?[o]:o.children," = $event)"]))];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map(e=>(oe(e)?e:JSON.stringify(e))+": true").join(", "),n=r?4===r.type&&r.isStatic?`${r.content}Modifiers`:N([...4===r.type?[r]:r.children,' + "Modifiers"']):"modelModifiers";l.push(b(n,S(`{ ${t} }`,!1,e.loc,!0)))}return Bt(l)};function Bt(e=[]){return{props:e,needRuntime:!1}}function Wt(e,t={}){{const e=t.onError||g;!0===t.prefixIdentifiers?e(m(51)):"module"===t.mode&&e(m(52))}const n=u(e)?be(e,t):e;return Xe(n,{...t,prefixIdentifiers:!1,nodeTransforms:[Ft,ft,mt,Lt,Mt,wt,jt,...t.nodeTransforms||[]],directiveTransforms:{on:At,bind:Dt,model:Jt,...t.directiveTransforms||{}}}),ot(n,{...t,prefixIdentifiers:!1})}const zt=t("style,iframe,script,noscript",!0),qt={isVoidTag:s,isNativeTag:e=>o(e)||r(e),isPreTag:e=>"pre"===e,getNamespace(e,t){let n=t?t.ns:0;if(t&&2===n)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some(e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content))&&(n=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(n=0);else t&&1===n&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(n=0));if(0===n){if("svg"===e)return 1;if("math"===e)return 2}return n},getTextMode(e,t){if(0===t){if("textarea"===e||"title"===e)return 1;if(zt(e))return 2}return 0}},Kt=(e,t)=>{1===e.type&&e.props.forEach((n,o)=>{if(6===n.type&&"style"===n.name&&n.value){const r=JSON.stringify(function(e){const t={};return e.split(Ut).forEach(e=>{if(e){const n=e.split(Gt);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}(n.value.content)),s=t.hoist(S(r,!1,n.loc));e.props[o]={type:7,name:"bind",arg:S("style",!0,n.loc),exp:s,modifiers:[],loc:n.loc}}})},Ut=/;(?![^(]*\))/g,Gt=/:(.+)/;const Ht=(e,t)=>({props:[],needRuntime:!1});function Yt(e,t){return m(e,t)}const Zt=(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(Yt(53,r)),t.children.length&&(n.onError(Yt(54,r)),t.children.length=0),{props:[b(S("innerHTML",!0,r),o||S("",!0))],needRuntime:!1}},Qt=(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(Yt(55,r)),t.children.length&&(n.onError(Yt(56,r)),t.children.length=0),{props:[b(S("textContent",!0,r),o||S("",!0))],needRuntime:!1}},Xt=Symbol(""),en=Symbol(""),tn=Symbol(""),nn=Symbol(""),on=Symbol(""),rn=Symbol(""),sn=Symbol(""),cn=Symbol("");Q({[Xt]:"vModelRadio",[en]:"vModelCheckbox",[tn]:"vModelText",[nn]:"vModelSelect",[on]:"vModelDynamic",[rn]:"withModifiers",[sn]:"withKeys",[cn]:"vShow"});const ln=(e,t,n)=>{const o=Jt(e,t,n);if(!o.props.length)return o;const{tag:r,tagType:s}=t;if(0===s)if(e.arg&&n.onError(Yt(58,e.arg.loc)),"input"===r||"textarea"===r||"select"===r){let s=tn,c=!1;if("input"===r){const o=pe(t,"type");if(o)if(7===o.type)s=on;else if(o.value)switch(o.value.content){case"radio":s=Xt;break;case"checkbox":s=en;break;case"file":c=!0,n.onError(Yt(59,e.loc))}}else"select"===r&&(s=nn);c||(o.needRuntime=n.helper(s))}else n.onError(Yt(57,e.loc));return o},an=t("passive,once,capture"),un=t("stop,prevent,self,ctrl,shift,alt,meta,exact,left,middle,right"),pn=t("onkeyup,onkeydown,onkeypress",!0),fn=(e,t,n)=>At(e,t,n,t=>{const{modifiers:o}=e;if(!o.length)return t;let{key:r,value:s}=t.props[0];const{keyModifiers:c,nonKeyModifiers:i,eventOptionModifiers:l}=(e=>{const t=[],n=[],o=[];for(let r=0;r<e.length;r++){const s=e[r];an(s)?o.push(s):un(s)?n.push(s):t.push(s)}return{keyModifiers:t,nonKeyModifiers:n,eventOptionModifiers:o}})(o);return i.length&&(s=k(n.helper(rn),[s,JSON.stringify(i)])),!c.length||8!==r.type&&r.isStatic&&!pn(r.content)||(s=k(n.helper(sn),[s,JSON.stringify(c)])),l.length&&(s=x([b("handler",s),b("options",x(l.map(e=>b(e,S("true",!1)))))])),{props:[b(r,s)],needRuntime:!1}}),dn=(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(Yt(60,r)),{props:[],needRuntime:n.helper(cn)}};return e.advancePositionWithClone=ie,e.advancePositionWithMutation=le,e.assert=ae,e.baseCompile=Wt,e.compile=function(e,t={}){return Wt(e,{...t,...qt,nodeTransforms:[Kt,...t.nodeTransforms||[]],directiveTransforms:{cloak:Ht,html:Zt,text:Qt,model:ln,on:fn,show:dn,...t.directiveTransforms||{}}})},e.createArrayExpression=v,e.createBlockExpression=fe,e.createCacheExpression=$,e.createCallExpression=k,e.createCompilerError=m,e.createCompoundExpression=N,e.createConditionalExpression=E,e.createFunctionExpression=T,e.createInterpolation=function(e,t){return{type:5,loc:t,content:u(e)?S(e,!1,t):e}},e.createObjectExpression=x,e.createObjectProperty=b,e.createSequenceExpression=w,e.createSimpleExpression=S,e.createStructuralDirectiveTransform=nt,e.findDir=ue,e.findProp=pe,e.generate=ot,e.getInnerRange=ce,e.hasScopeRef=function e(t,n){if(!t||0===Object.keys(n).length)return!1;switch(t.type){case 1:for(let o=0;o<t.props.length;o++){const r=t.props[o];if(7===r.type&&(e(r.arg,n)||e(r.exp,n)))return!0}return t.children.some(t=>e(t,n));case 11:return!!e(t.source,n)||t.children.some(t=>e(t,n));case 9:return t.branches.some(t=>e(t,n));case 10:return!!e(t.condition,n)||t.children.some(t=>e(t,n));case 4:return!t.isStatic&&oe(t.content)&&!!n[t.content];case 8:return t.children.some(t=>f(t)&&e(t,n));case 5:case 12:return e(t.content,n);case 2:case 3:default:return!1}},e.injectProp=me,e.isMemberExpression=se,e.isSimpleIdentifier=oe,e.isSlotOutlet=ge,e.isTemplateNode=he,e.isVSlot=de,e.loadDep=te,e.locStub=y,e.parse=be,e.parseJS=(e,t)=>{return ae(!1,"Expression AST analysis can only be performed in non-browser builds."),(X||(X=te("acorn").parse))(e,t)},e.registerRuntimeHelpers=Q,e.toValidAssetId=ye,e.transform=Xe,e.transformModel=Jt,e.transformOn=At,e.walkJS=(e,t)=>{return ae(!1,"Expression AST analysis can only be performed in non-browser builds."),(ee||(ee=te("estree-walker").walk))(e,t)},e}({});