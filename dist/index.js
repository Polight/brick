function t(t,e,r,n,i,o,s){for(var u=i,l=-1,a=o-i+1;r<=n;){if(s(t[r],e[u])){if(l<0&&(l=r),++u>o)return l}else{if(r+a>n)return-1;l=-1,u=i}r++}return-1}function e(t){for(var e=0;e<t.length;e++){var n=t[e];if(Array.isArray(n))return r(t,t.slice(0,e),e)}return t}function r(t,e,n){for(var i=n;i<t.length;i++){var o=t[i];Array.isArray(o)?r(o,e,0):e.push(o)}return e}function n(t,e,r,n=0,o=t.length-1,s=0,u=e.length-1){var l=function(t,e,r,n=0,i=t.length-1,o=0,s=e.length-1){var u,l,a,f,d,h,c,v=i-n+1,p=s-o+1,y=v+p,g=[];t:for(u=0;u<=y;u++){if(u>50)return;for(c=u-1,d=u>0?g[u-1]:[0,0],h=g[u]=[],l=-u;l<=u;l+=2){for(f=l===-u||l!==u&&d[c+l-1]<d[c+l+1]?d[c+l+1]:d[c+l-1]+1,a=f-l;f<p&&a<v&&r(e[o+f],t[n+a]);)f++,a++;if(f===p&&a===v)break t;h[u+l]=f}}var m,b=Array(u/2+y/2),_={},w=b.length-1;for(u=g.length-1;u>=0;u--){for(;f>0&&a>0&&r(e[o+f-1],t[n+a-1]);)b[w--]=2,f--,a--;if(!u)break;c=u-1,d=u?g[u-1]:[0,0],(l=f-a)===-u||l!==u&&d[c+l-1]<d[c+l+1]?(a--,b[w--]=4):(f--,b[w--]=8,null!=(m=e[o+f]).key&&(_[m.key]=o+f))}return{diff:b,deleteMap:_}}(t,e,r,n,o,s,u);return null!=l?l:function(t,e,r,n,o,s){var u,l,a,f,d,h={},c=[],v=0,p=n-r+1,y=s-o+1,g=Math.min(p,y),m=Array(g+1);m[0]=-1;for(var b=1;b<m.length;b++)m[b]=s+1;var _=Array(g);for(b=o;b<=s;b++)l=e[b],null!=(d=l.key)?h[d]=b:c.push(b);for(b=r;b<=n;b++)u=t[b],null!=(f=null==u.key?c[v++]:h[u.key])&&(a=i(m,f))>=0&&(m[a]=f,_[a]={newi:b,oldi:f,prev:_[a-1]});a=m.length-1;for(;m[a]>s;)a--;var w=_[a],k=Array(y+p-a),S=n,A=s,O=k.length-1;for(;w;){const{newi:t,oldi:e}=w;for(;S>t;)k[O--]=4,S--;for(;A>e;)k[O--]=8,A--;k[O--]=2,S--,A--,w=w.prev}for(;S>=r;)k[O--]=4,S--;for(;A>=o;)k[O--]=8,A--;return{diff:k,deleteMap:h}}(t,e,n,o,s,u)}function i(t,e){for(var r=1,n=t.length-1;r<=n;){var i=Math.ceil((r+n)/2);e<t[i]?n=i-1:r=i+1}return r}const o={selected:!0,value:!0,checked:!0,innerHTML:!0},s="http://www.w3.org/1999/xlink",u={show:s,actuate:s,href:s},l={isSvg:!1};function a(t,e=l){if(S(t))return document.createComment("NULL");if(A(t))return document.createTextNode(String(t));if(O(t)){var r,n,{type:i,props:o,children:s}=t;return"svg"!==i||e.isSvg||(e=Object.assign({},e,{isSVG:!0})),n=v(r=e.isSVG?document.createElementNS("http://www.w3.org/2000/svg",i):document.createElement(i),o,void 0,e.isSVG),h(r,s,0,s.length-1,null,e),null!=n&&c(r,o,void 0,n),r}if(N(t))return t._state={},t.type.mount(t.props,t._state,e);if(void 0===t)throw new Error("mount: vnode is undefined!");throw new Error("mount: Invalid Vnode!")}function f(e,r,i,o=l){if(r===e)return i;if(S(e)&&S(r))return i;if(A(e)&&A(r))return i.nodeValue=String(e),i;if(O(e)&&O(r)&&e.type===r.type){"svg"!==e.type||o.isSvg||(o=Object.assign({},o,{isSVG:!0}));var s=v(i,e.props,r.props,o.isSVG);return function(e,r,i,o){if(r===i)return;var s,u,l,c=0,v=r.length-1,p=0,b=i.length-1,_=Array.from(e.childNodes);for(;c<=v&&p<=b;)if(s=r[c],u=i[p],m(s,u))g(s,u,e,_,p,o),c++,p++;else{if(u=i[b],!m(s=r[v]))break;g(s,u,e,_,b,o),b--,v--}if(c>v&&p>b)return;if(c<=v&&p>b)return void h(e,r,c,v,_[p],o);if(p<=b&&c>v)return void y(e,_,i,p,b);var w=b-p+1,k=v-c+1,S=-1;if(w<k){if((S=t(r,i,c,v,p,b,m))>=0){h(e,r,c,S-1,_[p],o);var A=S+w;for(c=S;c<A;)g(r[c],i[p],e,_,p,o),c++,p++;return b++,void h(e,r,c,v,_[b],o)}}else if(w>k&&(S=t(i,r,p,b,c,v,m))>=0){for(y(e,_,i,p,S-1),A=S+k,p=S;p<A;)g(r[c],i[p],e,_,b,o),c++,p++;return void y(e,_,i,p,b)}if(p===b)return l=_[p],h(e,r,c,v,_[p],o),e.removeChild(l),void d(i[p],l,o);if(c===v)return e.insertBefore(a(r[c],o),_[p]),void y(e,_,i,p,b);var O=n(r,i,m,c,v,p,b);!function(t,e,{diff:r,deleteMap:n},i,o,s,u,l){for(var h,c,v,p,y=0,m=s,b=u;y<r.length;y++){const s=r[y];2===s?(g(i[m],o[b],t,e,b,l),m++,b++):4===s?(h=i[m],null!=(p=null!=h.key?n[h.key]:null)?(v=f(h,o[p],e[p],l),o[p]=void 0):v=a(h,l),t.insertBefore(v,e[b]),m++):8===s&&b++}for(y=0,b=u;y<r.length;y++){const n=r[y];2===n?b++:8===n&&(c=o[b],v=e[b],void 0!==c&&(t.removeChild(v),d(c,v,l)),b++)}}(e,_,O,r,i,c,p,o)}(i,e.children,r.children,o),null!=s&&c(i,e.props,r.props,s),i}return N(e)&&N(r)&&e.type===r.type?(e._state=r._state,e.type.patch(e.props,r.props,e._state,i,o)):a(e,o)}function d(t,e,r){if(!S(t)&&!A(t))if(O(t))for(var n=0;n<t.children.length;n++)d(t.children[n],e.childNodes[n],r);else N(t)&&t.type.unmount(t._state,e,r)}function h(t,e,r=0,n=e.length-1,i,o){for(;r<=n;){var s=e[r++];t.insertBefore(a(s,o),i)}}function c(t,e,r,n){for(var i,o=0;o<n.length;o++){i=n[o];var s=r&&r[i],u=e[i];s!==u&&(t[i]=u)}}function v(t,e,r,n){var i=[];for(var s in e)if(s.startsWith("on")||o.hasOwnProperty(s))i.push(s);else{var u=null!=r?r[s]:void 0,l=e[s];u!==l&&p(t,s,l,n)}for(s in r)s in e||t.removeAttribute(s);if(i.length>0)return i}function p(t,e,r,n){if(!0===r)t.setAttribute(e,"");else if(!1===r)t.removeAttribute(e);else{var i=n?u[e]:void 0;void 0!==i?t.setAttributeNS(i,e,r):t.setAttribute(e,r)}}function y(t,e,r,n=0,i=r.length-1){var o;for(e.length===i-n+1&&(t.textContent="",o=!0);n<=i;){var s=r[n],u=e[n];o||t.removeChild(u),n++,d(s,u)}}function g(t,e,r,n,i,o){var s=n[i],u=f(t,e,s,o);return u!=s&&(n[i]=u,r.replaceChild(u,s),d(e,s,o)),u}function m(t,e){return(null!=t&&null!=t.key?t.key:null)===(null!=e&&null!=e.key?e.key:null)}function b(t,e,r,n){if(r!==n)return!0;for(var i in t)if(t[i]!==e[i])return!0;return!1}const _=Symbol("@petit-dom/component");function w(t){var e=t[_];return null==e&&(e=t[_]=function({render:t,shouldUpdate:e=b}){return{mount(e,r,n){var i=t(e);return r.vnode=i,a(i,n)},patch(r,n,i,o,s){if(!e(r,n))return o;var u=t(r),l=i.vnode;return i.vnode=u,f(u,l,o,s)},unmount(t,e,r){t.wasUnmounted=!0,d(t.vnode,e,r)}}}({render:t,shouldUpdate:t.shouldUpdate})),e}const k={},S=t=>null===t,A=t=>"string"==typeof t||"number"==typeof t,O=t=>null!=t&&128===t.vtype,N=t=>null!=t&&256===t.vtype;function C(t,r=k,...n){const i=null!=r?r.key:null;if("string"==typeof t)return{vtype:128,type:t,key:i,props:r,children:e(n)};if(null!=(o=t)&&null!=o.mount&&null!=o.patch&&null!=o.unmount)return{vtype:256,type:t,key:i,props:Object.assign({},r,{children:n}),_state:null};if("function"==typeof t)return{vtype:256,type:w(t),key:i,props:Object.assign({},r,{children:n}),_state:null};var o;throw new Error("h: Invalid type!")}function j(t,e){var r,n=e.$$petitDomState$$;null==n?(r=a(t),e.appendChild(r)):(r=f(t,n.vnode,n.domNode))!==n.domNode&&(e.replaceChild(r,n.domNode),d(n.vnode,n.domNode)),e.$$petitDomState$$={vnode:t,domNode:r}}class M extends HTMLElement{constructor(){super(),this.useShadowDOM=!0,this.__state={},this.init&&this.init(),this.watchProps=Object.keys(this.__state),this.__attributesToState(),this.document=this.useShadowDOM?this.attachShadow({mode:"open"}):this}__attributesToState(){Object.assign(this.state,Array.from(this.attributes).reduce((t,e)=>Object.assign(t,{[e.name]:e.value}),{}))}get vdom(){return({state:t})=>""}get vstyle(){return({state:t})=>""}setAttribute(t,e){super.setAttribute(t,e),this.watchProps.includes(t)&&(this.state[t]=e)}removeAttribute(t){super.removeAttribute(t),this.watchProps.includes(t)&&t in this.state&&delete this.state[t]}connectedCallback(){this.connected&&this.connected(),this.render()}disconnectedCallback(){this.disconnected&&this.disconnected()}setState(t={}){return Object.assign(this.__state,t)}set state(t){Object.assign(this.__state,t)}get state(){return this.__state}render(t){return this.setState(t),j(C("root",{},[this.vdom({state:this.__state}),this.vstyle({state:this.__state})]),this.document)}}export{M as Component,C as h,j as render};