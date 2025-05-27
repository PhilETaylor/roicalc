const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this.i=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t.i)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:d}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",g=u.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:+t;break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!n(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this.m(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.v&&[...this.v.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this.m(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static m(){if(this.hasOwnProperty(y("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this.m(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...c(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this.v=new Map;for(const[t,e]of this.elementProperties){const i=this.S(t,e);void 0!==i&&this.v.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static S(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.P=null,this.A()}A(){this.M=new Promise((t=>this.enableUpdating=t)),this.N=new Map,this.U(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this.R??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this.R?.delete(t)}U(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.R?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this.R?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this.q(t,i)}B(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor.S(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this.P=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this.P=null}}q(t,e){const i=this.constructor,s=i.v.get(t);if(void 0!==s&&this.P!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this.P=s,this[s]=o.fromAttribute(e,t.type)??this.W?.get(s)??null,this.P=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this.W?.get(t)&&!this.hasAttribute(s.S(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this.M=this.H())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this.W??=new Map).has(t)&&(this.W.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this.N.has(t)||(this.hasUpdated||i||(e=void 0),this.N.set(t,e)),!0===s&&this.P!==t&&(this.I??=new Set).add(t))}async H(){this.isUpdatePending=!0;try{await this.M}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._){for(const[t,e]of this._)this[t]=e;this._=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this.N.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this.N;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.R?.forEach((t=>t.hostUpdate?.())),this.update(e)):this.V()}catch(e){throw t=!1,this.V(),e}t&&this.Y(e)}willUpdate(t){}Y(t){this.R?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}V(){this.N=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.M}shouldUpdate(t){return!0}update(t){this.I&&=this.I.forEach((t=>this.B(t,this[t]))),this.V()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,g?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.0");const S=globalThis,$=S.trustedTypes,k=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+_,E=`<${P}>`,T=document,A=()=>T.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,O="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,j=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,B=/"/g,W=/^(?:script|style|textarea|title)$/i,H=(t,...e)=>({D:1,strings:t,values:e}),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,D=T.createTreeWalker(T,129);function L(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",a=z;for(let e=0;i>e;e++){const i=t[e];let n,l,h=-1,c=0;for(;i.length>c&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===z?"!--"===l[1]?a=U:void 0!==l[1]?a=j:void 0!==l[2]?(W.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=o??z,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?R:'"'===l[3]?B:q):a===B||a===q?a=R:a===U||a===j?a=z:(a=R,o=void 0);const p=a===R&&t[e+1].startsWith("/>")?" ":"";r+=a===z?i+E:0>h?i+_+(-2===h?e:p):(s.push(n),i.slice(0,h)+C+i.slice(h)+_+p)}return[L(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class F{constructor({strings:t,D:e},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,n=this.parts,[l,h]=J(t,e);if(this.el=F.createElement(l,i),D.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=D.nextNode())&&a>n.length;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=h[r++],i=s.getAttribute(t).split(_),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?Q:"?"===a[1]?tt:"@"===a[1]?et:Z}),s.removeAttribute(t)}else t.startsWith(_)&&(n.push({type:6,index:o}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(_),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;e>i;i++)s.append(t[i],A()),D.nextNode(),n.push({type:2,index:++o});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(_,t+1));)n.push({type:7,index:o}),t+=_.length-1}o++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===I)return e;let o=void 0!==s?i.L?.[s]:i.J;const r=M(e)?void 0:e.F;return o?.constructor!==r&&(o?.G?.(!1),void 0===r?o=void 0:(o=new r(t),o.K(t,i,s)),void 0!==s?(i.L??=[])[s]=o:i.J=o),void 0!==o&&(e=G(t,o.X(t,e.values),o,s)),e}class K{constructor(t,e){this.Z=[],this.tt=void 0,this.et=t,this.st=e}get parentNode(){return this.st.parentNode}get ot(){return this.st.ot}u(t){const{el:{content:e},parts:i}=this.et,s=(t?.creationScope??T).importNode(e,!0);D.currentNode=s;let o=D.nextNode(),r=0,a=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new X(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new it(o,this,t)),this.Z.push(e),n=i[++a]}r!==n?.index&&(o=D.nextNode(),r++)}return D.currentNode=T,s}p(t){let e=0;for(const i of this.Z)void 0!==i&&(void 0!==i.strings?(i.rt(t,i,e),e+=i.strings.length-2):i.rt(t[e])),e++}}class X{get ot(){return this.st?.ot??this.nt}constructor(t,e,i,s){this.type=2,this.lt=V,this.tt=void 0,this.ht=t,this.ct=e,this.st=i,this.options=s,this.nt=s?.isConnected??!0}get parentNode(){let t=this.ht.parentNode;const e=this.st;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this.ht}get endNode(){return this.ct}rt(t,e=this){t=G(this,t,e),M(t)?t===V||null==t||""===t?(this.lt!==V&&this.dt(),this.lt=V):t!==this.lt&&t!==I&&this.ut(t):void 0!==t.D?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this.ut(t)}O(t){return this.ht.parentNode.insertBefore(t,this.ct)}T(t){this.lt!==t&&(this.dt(),this.lt=this.O(t))}ut(t){this.lt!==V&&M(this.lt)?this.ht.nextSibling.data=t:this.T(T.createTextNode(t)),this.lt=t}$(t){const{values:e,D:i}=t,s="number"==typeof i?this.ft(t):(void 0===i.el&&(i.el=F.createElement(L(i.h,i.h[0]),this.options)),i);if(this.lt?.et===s)this.lt.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this.lt=t}}ft(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new F(t)),e}k(t){N(this.lt)||(this.lt=[],this.dt());const e=this.lt;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(A()),this.O(A()),this,this.options)):i=e[s],i.rt(o),s++;e.length>s&&(this.dt(i&&i.ct.nextSibling,s),e.length=s)}dt(t=this.ht.nextSibling,e){for(this.gt?.(!1,!0,e);t&&t!==this.ct;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this.st&&(this.nt=t,this.gt?.(t))}}class Z{get tagName(){return this.element.tagName}get ot(){return this.st.ot}constructor(t,e,i,s,o){this.type=1,this.lt=V,this.tt=void 0,this.element=t,this.name=e,this.st=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this.lt=Array(i.length-1).fill(new String),this.strings=i):this.lt=V}rt(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=G(this,t,e,0),r=!M(t)||t!==this.lt&&t!==I,r&&(this.lt=t);else{const s=t;let a,n;for(t=o[0],a=0;o.length-1>a;a++)n=G(this,s[i+a],e,a),n===I&&(n=this.lt[a]),r||=!M(n)||n!==this.lt[a],n===V?t=V:t!==V&&(t+=(n??"")+o[a+1]),this.lt[a]=n}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class tt extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class et extends Z{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}rt(t,e=this){if((t=G(this,t,e,0)??V)===I)return;const i=this.lt,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this.lt=t}handleEvent(t){"function"==typeof this.lt?this.lt.call(this.options?.host??this.element,t):this.lt.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this.tt=void 0,this.st=e,this.options=i}get ot(){return this.st.ot}rt(t){G(this,t)}}const st=S.litHtmlPolyfillSupport;st?.(F,X),(S.litHtmlVersions??=[]).push("3.3.0");const ot=globalThis;class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this.yt=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.yt=((t,e,i)=>{const s=i?.renderBefore??e;let o=s.bt;if(void 0===o){const t=i?.renderBefore??null;s.bt=o=new X(e.insertBefore(A(),t),t,void 0,i??{})}return o.rt(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.yt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.yt?.setConnected(!1)}render(){return I}}rt.vt=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.0");class nt{constructor(t){}get ot(){return this.st.ot}K(t,e,i){this.xt=t,this.st=e,this.wt=i}X(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class lt extends nt{constructor(t){if(super(t),this.it=V,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===V||null==t)return this.St=void 0,this.it=t;if(t===I)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.St;this.it=t;const e=[t];return e.raw=e,this.St={D:this.constructor.resultType,strings:e,values:[]}}}lt.directiveName="unsafeHTML",lt.resultType=1;const ht=(ct=lt,(...t)=>({F:ct,values:t}));var ct;class pt extends rt{static properties={platform:{type:String},operationalSatisfaction:{type:String},backlogEfficiency:{type:String},challenges:{type:Array},roadmapClarity:{type:String},name:{type:String},email:{type:String},jobTitle:{type:String},companyName:{type:String},formSubmitted:{type:Boolean},formErrors:{type:Object},totalScore:{type:Number},showScore:{type:Boolean},meetingRequested:{type:Boolean},csrfToken:{type:String},portalId:{type:String,attribute:"portal-id"},formGuid:{type:String,attribute:"form-guid"}};constructor(){super(),this.platform="",this.operationalSatisfaction="",this.backlogEfficiency="",this.challenges=[],this.roadmapClarity="",this.name="",this.email="",this.jobTitle="",this.companyName="",this.formSubmitted=!1,this.formErrors={},this.totalScore=0,this.showScore=!1,this.meetingRequested=!1,this.portalId="",this.formGuid="";const t=localStorage.getItem("csrfToken");t?this.csrfToken=t:this.$t()}$t(){try{const t=new Uint8Array(16);window.crypto.getRandomValues(t),this.csrfToken=Array.from(t,(t=>t.toString(16).padStart(2,"0"))).join(""),localStorage.setItem("csrfToken",this.csrfToken)}catch(t){}}kt(){return this.platform}Ct(){return{"Very unhappy":0,Unhappy:.75,Neutral:1.5,Happy:2.25,"Very happy":3}[this.operationalSatisfaction]||0}_t(){return{"Very unhappy":0,Unhappy:.75,Neutral:1.5,Happy:2.25,"Very happy":3}[this.backlogEfficiency]||0}Pt(){return Math.max(0,3-this.challenges.length)}Et(){return{Yes:2,Somewhat:1,No:0}[this.roadmapClarity]||0}Tt(){const t=this.Ct()+this._t()+this.Pt()+this.Et();return t>0?t-Math.floor(t)>.8?Math.min(10,Math.ceil(t)):Math.max(1,Math.min(10,Math.floor(t))):1}static styles=r`
      :host {
          display: block;
          font-family: 'Montserrat', Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
          color: #333;
      }

      .form-header {
          text-align: center;
          margin-bottom: 30px;
      }

      .form-title {
          color: #333;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          margin-top: 0;
      }

      .form-subtitle {
          color: #666;
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 0;
          line-height: 1.5;
      }

      .form-group {
          margin-bottom: 25px;
      }

      label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
      }

      select, input[type="text"], input[type="email"] {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          box-sizing: border-box;
          font-size: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
          background-color: #f9f9f9;
      }

      select:focus, input[type="text"]:focus, input[type="email"]:focus {
          outline: none;
          border-color: #e91e63;
          box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.2);
      }

      .radio-group, .checkbox-group {
          margin-top: 10px;
      }

      .radio-option, .checkbox-option {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          cursor: pointer;
      }

      .radio-option input[type="radio"], .checkbox-option input[type="checkbox"] {
          margin-right: 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid #e0e0e0;
          border-radius: 50%;
          outline: none;
          transition: all 0.2s ease-in-out;
          position: relative;
          cursor: pointer;
      }

      .checkbox-option input[type="checkbox"] {
          border-radius: 4px;
      }

      .radio-option input[type="radio"]:checked, .checkbox-option input[type="checkbox"]:checked {
          border-color: #e91e63;
          background-color: #fff;
      }

      .radio-option input[type="radio"]:checked::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #e91e63;
      }

      .checkbox-option input[type="checkbox"]:checked::after {
          content: '✓';
          position: absolute;
          top: -2px;
          left: 3px;
          font-size: 14px;
          color: #e91e63;
      }

      .error-message {
          color: #e91e63;
          font-size: 14px;
          margin-top: 5px;
      }

      button {
          background-color: #e91e63;
          color: white;
          padding: 14px 28px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          margin-right: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
      }

      button:hover {
          background-color: #d81b60;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(233, 30, 99, 0.4);
      }

      .success-message {
          color: #e91e63;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 20px;
      }

      .score-container {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 30px;
          margin-top: 40px;
          margin-bottom: 40px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      }

      .score-title {
          font-size: 22px;
          margin-bottom: 20px;
          color: #333;
          font-weight: 700;
      }

      .score-value {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 20px;
          display: inline-block;
          position: relative;
      }

      .score-value::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background-color: #e91e63;
      }

      .score-value-red {
          color: #e53935;
      }

      .score-value-amber {
          color: #ff8f00;
      }

      .score-value-yellow {
          color: #fdd835;
      }

      .score-value-green {
          color: #43a047;
      }

      .score-description {
          font-size: 16px;
          margin-bottom: 30px;
          line-height: 1.6;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
          font-weight: bold;
      }

      /* No additional styles needed for request-meeting-button as they're inherited from the base button styles */

      .meeting-requested-message {
          color: #e91e63;
          font-weight: bold;
          margin-top: 15px;
          font-size: 16px;
      }

      .score-summary-text {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
          text-align: left;
          color: #333;
          white-space: pre-line;
      }

      .score-slider-container {
          width: 100%;
          height: 12px;
          margin: 40px 0 30px;
          position: relative;
          background: linear-gradient(to right, #e53935, #ff8f00, #fdd835, #43a047);
          border-radius: 6px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .score-marker {
          position: absolute;
          top: -8px;
          width: 8px;
          height: 28px;
          background-color: #333;
          border-radius: 4px;
          transform: translateX(-50%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      p {
          text-align: left;
      }

      p.form-subtitle {
          text-align: center;
          font-weight: bolder;
      }

  `;render(){return H`
      <div class="roi-calculator-form">
        <div class="form-header">
          <h2 class="form-title">Scale Smarter Health Check</h2>
          <p class="form-subtitle">Evaluate the performance of your commerce platform</p>
          <p>Operational inefficiencies, ongoing challenges, and unclear roadmaps can quietly stall your growth and limit your ability to scale effectively. Without a clear understanding of your platform’s performance, it’s difficult to prioritise investments and address critical gaps.</p> 
          <p>The Scale Smarter Health Check provides a clear, concise score that highlights your current standing, enabling you to make informed, strategic decisions and confidently plan your next steps toward sustainable growth.</p>
        </div>

        ${this.formSubmitted?H`
            ${this.showScore?H`
                <div class="score-container">
                  <div class="score-title">Your current health score</div>
                  <div class="score-value ${this.At()}">${this.totalScore}/10</div>
                  <div class="score-description  ${this.At()}">
                  ${this.Mt(this.totalScore)}
                  </div>

                  <div class="score-slider-container">
                    <div class="score-marker" style="left: ${this.Nt()}%">
                    </div>
                  </div>

                  <div class="score-summary-text">
                    ${ht(this.Ot())}
                  </div>

                  ${this.meetingRequested?H`<div class="meeting-requested-message">Thank you! We'll contact you soon to schedule a meeting.</div>`:H`<button class="request-meeting-button" @click=${this.zt}>BOOK A MEETING</button>`}
                </div>
              `:""}
          `:H`
            <form @submit=${this.Ut}>
              <!-- Commerce Platform -->
              <div class="form-group">
                <label for="platform">What is your commerce platform?</label>
                <select id="platform" @change=${this.jt} .value=${this.platform}>
                  <option value="" disabled selected>Select your platform</option>
                  <option value="Shopify Starter">Shopify Starter</option>
                  <option value="Shopify Basic">Shopify Basic</option>
                  <option value="Standard Shopify">Standard Shopify</option>
                  <option value="Shopify Advanced">Shopify Advanced</option>
                  <option value="Shopify Plus">Shopify Plus</option>
                  <option value="Magento Open Source">Magento Open Source</option>
                  <option value="Adobe Commerce Cloud">Adobe Commerce Cloud</option>
                  <option value="Adobe Commerce On-Prem">Adobe Commerce On-Prem</option>
                  <option value="BigCommerce">BigCommerce</option>
                  <option value="WordPress (WooCommerce)">WordPress (WooCommerce)</option>
                  <option value="Other">Other</option>
                </select>
                ${this.formErrors.platform?H`<div class="error-message">${this.formErrors.platform}</div>`:""}
              </div>

              <!-- Operational Support Satisfaction -->
              <div class="form-group">
                <label>How happy are you with the quality of your operational support?</label>
                <div class="radio-group">
                  ${["Very unhappy","Unhappy","Neutral","Happy","Very happy"].map((t=>H`
                    <label class="radio-option">
                      <input type="radio" name="operationalSatisfaction" value="${t}" 
                        ?checked=${this.operationalSatisfaction===t}
                        @change=${this.Rt}>
                      ${t}
                    </label>
                  `))}
                </div>
                ${this.formErrors.operationalSatisfaction?H`<div class="error-message">${this.formErrors.operationalSatisfaction}</div>`:""}
              </div>

              <!-- Backlog Efficiency Satisfaction -->
              <div class="form-group">
                <label>How happy are you with your backlog efficiency?</label>
                <div class="radio-group">
                  ${["Very unhappy","Unhappy","Neutral","Happy","Very happy"].map((t=>H`
                    <label class="radio-option">
                      <input type="radio" name="backlogEfficiency" value="${t}" 
                        ?checked=${this.backlogEfficiency===t}
                        @change=${this.qt}>
                      ${t}
                    </label>
                  `))}
                </div>
                ${this.formErrors.backlogEfficiency?H`<div class="error-message">${this.formErrors.backlogEfficiency}</div>`:""}
              </div>

              <!-- Challenges -->
              <div class="form-group">
                <label>What are the biggest challenges you face in your role? (select up to 3)</label>
                <div class="checkbox-group">
                  ${["Development delays","Performance issues","Integration gaps","Platform limits","Unclear roadmap","Skills gap"].map((t=>H`
                    <label class="checkbox-option">
                      <input type="checkbox" value="${t}" 
                        ?checked=${this.challenges.includes(t)}
                        @change=${this.Bt}>
                      ${t}
                    </label>
                  `))}
                </div>
                ${this.formErrors.challenges?H`<div class="error-message">${this.formErrors.challenges}</div>`:""}
              </div>

              <!-- Roadmap Clarity -->
              <div class="form-group">
                <label>Do you have clear project roadmaps?</label>
                <div class="radio-group">
                  ${["Yes","Somewhat","No"].map((t=>H`
                    <label class="radio-option">
                      <input type="radio" name="roadmapClarity" value="${t}" 
                        ?checked=${this.roadmapClarity===t}
                        @change=${this.Wt}>
                      ${t}
                    </label>
                  `))}
                </div>
                ${this.formErrors.roadmapClarity?H`<div class="error-message">${this.formErrors.roadmapClarity}</div>`:""}
              </div>

              <!-- Contact Details -->
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" .value=${this.name} @input=${this.Ht}>
                ${this.formErrors.name?H`<div class="error-message">${this.formErrors.name}</div>`:""}
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" .value=${this.email} @input=${this.It}>
                ${this.formErrors.email?H`<div class="error-message">${this.formErrors.email}</div>`:""}
              </div>

              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input type="text" id="jobTitle" .value=${this.jobTitle} @input=${this.Vt}>
                ${this.formErrors.jobTitle?H`<div class="error-message">${this.formErrors.jobTitle}</div>`:""}
              </div>

              <div class="form-group">
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" .value=${this.companyName} @input=${this.Yt}>
                ${this.formErrors.companyName?H`<div class="error-message">${this.formErrors.companyName}</div>`:""}
              </div>

              <button type="submit">VIEW YOUR HEALTH SCORE</button>
            </form>
          `}
      </div>
    `}jt(t){this.platform=t.target.value}Rt(t){this.operationalSatisfaction=t.target.value}qt(t){this.backlogEfficiency=t.target.value}Bt(t){const e=t.target.value;t.target.checked?this.challenges.includes(e)||(3>this.challenges.length?this.challenges=[...this.challenges,e]:(t.target.checked=!1,this.formErrors={...this.formErrors,challenges:"You can select a maximum of 3 challenges"},setTimeout((()=>{this.formErrors={...this.formErrors,challenges:""}}),3e3))):this.challenges=this.challenges.filter((t=>t!==e))}Wt(t){this.roadmapClarity=t.target.value}Ht(t){this.name=t.target.value}It(t){this.email=t.target.value}Vt(t){this.jobTitle=t.target.value}Yt(t){this.companyName=t.target.value}Ut(t){t.preventDefault();const e={};this.platform||(e.platform="Please select your commerce platform"),this.operationalSatisfaction||(e.operationalSatisfaction="Please select your satisfaction level"),this.backlogEfficiency||(e.backlogEfficiency="Please select your efficiency level"),0===this.challenges.length&&(e.challenges="Please select at least one challenge"),this.roadmapClarity||(e.roadmapClarity="Please select your roadmap clarity"),this.name||(e.name="Please enter your name"),this.email?this.Dt(this.email)||(e.email="Please enter a valid email address"):e.email="Please enter your email",this.jobTitle||(e.jobTitle="Please enter your job title"),this.companyName||(e.companyName="Please enter your company name"),this.formErrors=e,0===Object.keys(e).length&&(this.totalScore=this.Tt(),this.formSubmitted=!0,this.showScore=!0,this.dispatchEvent(new CustomEvent("form-submitted",{detail:{platform:this.platform,operationalSatisfaction:this.operationalSatisfaction,backlogEfficiency:this.backlogEfficiency,challenges:this.challenges,roadmapClarity:this.roadmapClarity,name:this.name,email:this.email,jobTitle:this.jobTitle,companyName:this.companyName,totalScore:this.totalScore},bubbles:!0,composed:!0})))}async zt(){try{this.csrfToken||this.$t();const t=`https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${this.formGuid}`,e={fields:[{name:"platform",value:this.platform},{name:"operational_satisfaction",value:this.operationalSatisfaction},{name:"backlog_efficiency",value:this.backlogEfficiency},{name:"challenges",value:this.challenges.join(";")},{name:"roadmap_clarity",value:this.roadmapClarity},{name:"firstname",value:this.name.split(" ")[0]},{name:"lastname",value:this.name.split(" ").slice(1).join(" ")},{name:"email",value:this.email},{name:"jobtitle",value:this.jobTitle},{name:"company",value:this.companyName},{name:"total_score",value:""+this.totalScore}],context:{pageUri:window.location.href,pageName:document.title},legalConsentOptions:{consent:{consentToProcess:!0,text:"I agree to allow the company to store and process my personal data in accordance with the Privacy Policy."}}},i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});i.ok||await i.json();const s=await i.json();this.meetingRequested=!0,this.dispatchEvent(new CustomEvent("meeting-requested",{detail:{name:this.name,email:this.email,jobTitle:this.jobTitle,companyName:this.companyName,totalScore:this.totalScore,csrfToken:this.csrfToken,hubspotResponse:s},bubbles:!0,composed:!0}))}catch(t){alert("Failed to request meeting: "+t.message)}}Dt(t){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}At(){return 8>this.totalScore?6>this.totalScore?4>this.totalScore?"score-value-red":"score-value-amber":"score-value-yellow":"score-value-green"}Mt(){return 8>this.totalScore?6>this.totalScore?4>this.totalScore?"Critical risks are holding back your growth and need urgent attention":"Noticeable inefficiencies and gaps require proactive improvement":"Solid foundation with room to optimise and scale more effectively":"Well-optimised and ready to lead with continuous innovation"}Lt(){return this.companyName?this.companyName.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").split(" ").map((t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase())).join(" "):""}Ot(){const t=this.Lt();return 8>this.totalScore?6>this.totalScore?4>this.totalScore?`Your commerce platform and operational setup at ${t} currently face significant and urgent challenges that are likely holding back your growth and scalability.<br><br> Persistent inefficiencies, unclear or missing roadmaps and ongoing issues create critical risks that demand immediate attention. <br><br>  Without swift and focused action, these obstacles could lead to further delays, increased costs and missed business opportunities. <br><br>  It's essential to prioritise identifying root causes, stabilising your operations and developing a clear strategic plan to begin laying a solid foundation for future success.<br><br> Book a meeting with our experts today, to start addressing these critical risks and put your growth back on track.`:`Your commerce operations at ${t} demonstrate some strengths, but also reveal noticeable inefficiencies and challenges that could slow progress and limit scalability if left unaddressed. <br><br>  These cautionary signals suggest there are gaps in your backlog management, operational workflows or platform capabilities that require focused improvement. <br><br>  While the situation is not critical, it's important to clarify your project roadmaps, address integration or skill gaps, and optimise your processes to prevent bottlenecks and operational strain. <br><br>  Taking proactive steps now will help you build resilience and improve overall performance.<br><br> Schedule a session with our specialists, to explore tailored solutions that close gaps and strengthen your operational foundation.`:`Your commerce platform and operational practices at ${t} are solid but not yet fully optimised. <br><br> There is clear evidence of good fundamentals, including functional backlog efficiency and operational support, yet some areas still require attention to maximise your growth potential.<br><br>  Challenges such as minor performance issues or roadmap ambiguity may persist, which could hinder your ability to scale efficiently. <br><br> By refining your project plans, closing skill gaps, and streamlining workflows, you can unlock stronger scalability and position your organisation for more sustainable growth. <br><br> Set up a meeting with our experts to discover strategies that optimise your operations and unlock your platform's full potential.`:`Your commerce ecosystem at ${t} is well-optimised, demonstrating strong operational efficiency, effective backlog management and a clear, actionable roadmap. <br><br> This advanced level of maturity means you're well-positioned to scale confidently and adapt to future challenges with agility. <br><br> Persistent issues are minimal or well-managed, and your platform's capabilities are fully leveraged to support business objectives. <br><br> Maintaining this high standard will enable you to sustain growth, innovate effectively, and lead your market with confidence. <br><br> Meet with our experts to explore how we can help you stay ahead, identify new growth opportunities and continuously innovate, ensuring you remain ahead of the competition`}Nt(){return 5+this.totalScore/10*90}}customElements.define("roi-calculator-form",pt);
//# sourceMappingURL=roi-calculator-form.js.map
