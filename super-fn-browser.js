!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.superFn=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash category="functions"`
 */
;(function(){function n(n){n.length=0,_.length<T&&_.push(n)}function t(n,t,r){t||(t=0),typeof r=="undefined"&&(r=n?n.length:0);var e=-1;r=r-t||0;for(var o=Array(0>r?0:r);++e<r;)o[e]=n[t+e];return o}function r(){}function e(n){function r(){if(u){var n=t(u);et.apply(n,arguments)}if(this instanceof r){var a=o(e.prototype),n=e.apply(a,n||arguments);return m(n)?n:a}return e.apply(i,n||arguments)}var e=n[0],u=n[2],i=n[4];return gt(r,n),r}function o(n){return m(n)?at(n):{}}function u(n,t,r){if(typeof n!="function")return d;
if(typeof t=="undefined"||!("prototype"in n))return n;var e=n.__bindData__;if(typeof e=="undefined"&&(st.funcNames&&(e=!n.name),e=e||!st.funcDecomp,!e)){var o=tt.call(n);st.funcNames||(e=!A.test(o)),e||(e=S.test(o),gt(n,e))}if(false===e||true!==e&&1&e[1])return n;switch(r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,o){return n.call(t,r,e,o)};case 4:return function(r,e,o,u){return n.call(t,r,e,o,u)}}return v(n,t)}function i(n){function r(){var n=p?f:this;
if(a){var v=t(a);et.apply(v,arguments)}return(l||g)&&(v||(v=t(arguments)),l&&et.apply(v,l),g&&v.length<c)?(u|=16,i([e,y?u:-4&u,v,null,f,c])):(v||(v=arguments),s&&(e=n[h]),this instanceof r?(n=o(e.prototype),v=e.apply(n,v),m(v)?v:n):e.apply(n,v))}var e=n[0],u=n[1],a=n[2],l=n[3],f=n[4],c=n[5],p=1&u,s=2&u,g=4&u,y=8&u,h=e;return gt(r,n),r}function a(n,t,r,e){e=(e||0)-1;for(var o=n?n.length:0,u=[];++e<o;){var i=n[e];if(i&&typeof i=="object"&&typeof i.length=="number"&&(yt(i)||s(i))){t||(i=a(i,t,r));var l=-1,f=i.length,c=u.length;
for(u.length+=f;++l<f;)u[c++]=i[l]}else r||u.push(i)}return u}function l(t,r,e,o,u,i){if(e){var a=e(t,r);if(typeof a!="undefined")return!!a}if(t===r)return 0!==t||1/t==1/r;if(t===t&&!(t&&G[typeof t]||r&&G[typeof r]))return false;if(null==t||null==r)return t===r;var f=Z.call(t),c=Z.call(r);if(f==P&&(f=R),c==P&&(c=R),f!=c)return false;switch(f){case F:case I:return+t==+r;case N:return t!=+t?r!=+r:0==t?1/t==1/r:t==+r;case W:case K:return t==r+""}if(c=f==C,!c){var p=rt.call(t,"__wrapped__"),g=rt.call(r,"__wrapped__");
if(p||g)return l(p?t.__wrapped__:t,g?r.__wrapped__:r,e,o,u,i);if(f!=R)return false;if(f=!st.argsObject&&s(t)?Object:t.constructor,p=!st.argsObject&&s(r)?Object:r.constructor,f!=p&&!(y(f)&&f instanceof f&&y(p)&&p instanceof p)&&"constructor"in t&&"constructor"in r)return false}for(f=!u,u||(u=_.pop()||[]),i||(i=_.pop()||[]),p=u.length;p--;)if(u[p]==t)return i[p]==r;var m=0,a=true;if(u.push(t),i.push(r),c){if(p=t.length,m=r.length,(a=m==p)||o)for(;m--;)if(c=p,g=r[m],o)for(;c--&&!(a=l(t[c],g,e,o,u,i)););else if(!(a=l(t[m],g,e,o,u,i)))break
}else vt(r,function(n,r,f){return rt.call(f,r)?(m++,a=rt.call(t,r)&&l(t[r],n,e,o,u,i)):void 0}),a&&!o&&vt(t,function(n,t,r){return rt.call(r,t)?a=-1<--m:void 0});return u.pop(),i.pop(),f&&(n(u),n(i)),a}function f(n,r,o,u,a,l){var c=1&r,p=4&r,s=16&r,g=32&r;if(!(2&r||y(n)))throw new TypeError;s&&!o.length&&(r&=-17,s=o=false),g&&!u.length&&(r&=-33,g=u=false);var m=n&&n.__bindData__;return m&&true!==m?(m=t(m),m[2]&&(m[2]=t(m[2])),m[3]&&(m[3]=t(m[3])),!c||1&m[1]||(m[4]=a),!c&&1&m[1]&&(r|=8),!p||4&m[1]||(m[5]=l),s&&et.apply(m[2]||(m[2]=[]),o),g&&ut.apply(m[3]||(m[3]=[]),u),m[1]|=r,f.apply(null,m)):(1==r||17===r?e:i)([n,r,o,u,a,l])
}function c(){$.h=D,$.b=$.c=$.g=$.i="",$.e="t",$.j=true;for(var n,t=0;n=arguments[t];t++)for(var r in n)$[r]=n[r];t=$.a,$.d=/^[^,]+/.exec(t)[0],n=Function,t="return function("+t+"){",r=$;var e="var n,t="+r.d+",E="+r.e+";if(!t)return E;"+r.i+";";r.b?(e+="var u=t.length;n=-1;if("+r.b+"){",st.unindexedChars&&(e+="if(s(t)){t=t.split('')}"),e+="while(++n<u){"+r.g+";}}else{"):st.nonEnumArgs&&(e+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+r.g+";}}else{"),st.enumPrototypes&&(e+="var G=typeof t=='function';"),st.enumErrorProps&&(e+="var F=t===k||t instanceof Error;");
var o=[];if(st.enumPrototypes&&o.push('!(G&&n=="prototype")'),st.enumErrorProps&&o.push('!(F&&(n=="message"||n=="name"))'),r.j&&r.f)e+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",o.length&&(e+="if("+o.join("&&")+"){"),e+=r.g+";",o.length&&(e+="}"),e+="}";else if(e+="for(n in t){",r.j&&o.push("m.call(t, n)"),o.length&&(e+="if("+o.join("&&")+"){"),e+=r.g+";",o.length&&(e+="}"),e+="}",st.nonEnumShadows){for(e+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)e+="n='"+r.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",r.j||(e+="||(!x[n]&&t[n]!==A[n])"),e+="){"+r.g+"}";
e+="}"}return(r.b||st.nonEnumArgs)&&(e+="}"),e+=r.c+";return E",n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",t+e+"}")(u,B,U,rt,x,s,yt,h,$.f,X,G,pt,K,Y,Z)}function p(n){return typeof n=="function"&&nt.test(n)}function s(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Z.call(n)==P||false}function g(n){var t=[];return vt(n,function(n,r){y(n)&&t.push(r)}),t.sort()}function y(n){return typeof n=="function"}function m(n){return!(!n||!G[typeof n])}function h(n){return typeof n=="string"||n&&typeof n=="object"&&Z.call(n)==K||false
}function v(n,r){return 2<arguments.length?f(n,17,t(arguments,2),null,r):f(n,1,null,null,r)}function b(n,t,r){var e,o,u,i,a,l,f,c=0,p=false,s=true;if(!y(n))throw new TypeError;if(t=ct(0,t)||0,true===r)var g=true,s=false;else m(r)&&(g=r.leading,p="maxWait"in r&&(ct(t,r.maxWait)||0),s="trailing"in r?r.trailing:s);var h=function(){var r=t-(bt()-i);0<r?l=setTimeout(h,r):(o&&clearTimeout(o),r=f,o=l=f=E,r&&(c=bt(),u=n.apply(a,e),l||o||(e=a=null)))},v=function(){l&&clearTimeout(l),o=l=f=E,(s||p!==t)&&(c=bt(),u=n.apply(a,e),l||o||(e=a=null))
};return function(){if(e=arguments,i=bt(),a=this,f=s&&(l||!g),false===p)var r=g&&!l;else{o||g||(c=i);var y=p-(i-c),m=0>=y;m?(o&&(o=clearTimeout(o)),c=i,u=n.apply(a,e)):o||(o=setTimeout(v,y))}return m&&l?l=clearTimeout(l):l||t===p||(l=setTimeout(h,t)),r&&(m=true,u=n.apply(a,e)),!m||l||o||(e=a=null),u}}function d(n){return n}function w(){}function j(n){return function(t){return t[n]}}var E,_=[],x={},O=+new Date+"",T=40,A=/^\s*function[ \n\r\t]+\w/,S=/\bthis\b/,D="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),P="[object Arguments]",C="[object Array]",F="[object Boolean]",I="[object Date]",B="[object Error]",N="[object Number]",R="[object Object]",W="[object RegExp]",K="[object String]",L={leading:false,maxWait:0,trailing:false},z={configurable:false,enumerable:false,value:null,writable:false},$={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},G={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},J=G[typeof window]&&window||this,q=G[typeof exports]&&exports&&!exports.nodeType&&exports,M=G[typeof module]&&module&&!module.nodeType&&module,V=M&&M.exports===q&&q,H=G[typeof global]&&global;
!H||H.global!==H&&H.window!==H||(J=H);var Q=[],U=Error.prototype,X=Object.prototype,Y=String.prototype,Z=X.toString,nt=RegExp("^"+(Z+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),tt=Function.prototype.toString,rt=X.hasOwnProperty,et=Q.push,ot=X.propertyIsEnumerable,ut=Q.unshift,it=function(){try{var n={},t=p(t=Object.defineProperty)&&t,r=t(n,n,n)&&t}catch(e){}return r}(),at=p(at=Object.create)&&at,lt=p(lt=Array.isArray)&&lt,ft=p(ft=Object.keys)&&ft,ct=Math.max,pt={};
pt[C]=pt[I]=pt[N]={constructor:true,toLocaleString:true,toString:true,valueOf:true},pt[F]=pt[K]={constructor:true,toString:true,valueOf:true},pt[B]=pt["[object Function]"]=pt[W]={constructor:true,toString:true},pt[R]={constructor:true},function(){for(var n=D.length;n--;){var t,r=D[n];for(t in pt)rt.call(pt,t)&&!rt.call(pt[t],r)&&(pt[t][r]=false)}}();var st=r.support={};!function(){var n=function(){this.x=1},t={0:1,length:1},r=[];n.prototype={valueOf:1,y:1};for(var e in new n)r.push(e);for(e in arguments);st.argsClass=Z.call(arguments)==P,st.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),st.enumErrorProps=ot.call(U,"message")||ot.call(U,"name"),st.enumPrototypes=ot.call(n,"prototype"),st.funcDecomp=!p(J.WinRTError)&&S.test(function(){return this
}),st.funcNames=typeof Function.name=="string",st.nonEnumArgs=0!=e,st.nonEnumShadows=!/valueOf/.test(r),st.spliceObjects=(Q.splice.call(t,0,1),!t[0]),st.unindexedChars="xx"!="x"[0]+Object("x")[0]}(1),at||(o=function(){function n(){}return function(t){if(m(t)){n.prototype=t;var r=new n;n.prototype=null}return r||J.Object()}}());var gt=it?function(n,t){z.value=t,it(n,"__bindData__",z)}:w;st.argsClass||(s=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&rt.call(n,"callee")&&!ot.call(n,"callee")||false
});var yt=lt||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Z.call(n)==C||false},mt=c({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),ht=ft?function(n){return m(n)?st.enumPrototypes&&typeof n=="function"||st.nonEnumArgs&&n.length&&s(n)?mt(n):ft(n):[]}:mt,H={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:ht,g:"if(e(t[n],n,g)===false)return E"},vt=c(H,{i:"if(!B[typeof t])return E;"+H.i,b:false},{j:false});y(/x/)&&(y=function(n){return typeof n=="function"&&"[object Function]"==Z.call(n)
});var bt=p(bt=Date.now)&&bt||function(){return(new Date).getTime()};r.after=function(n,t){if(!y(t))throw new TypeError;return function(){return 1>--n?t.apply(this,arguments):void 0}},r.bind=v,r.bindAll=function(n){for(var t=1<arguments.length?a(arguments,true,false,1):g(n),r=-1,e=t.length;++r<e;){var o=t[r];n[o]=f(n[o],1,null,null,n)}return n},r.bindKey=function(n,r){return 2<arguments.length?f(r,19,t(arguments,2),null,n):f(r,3,null,null,n)},r.compose=function(){for(var n=arguments,t=n.length;t--;)if(!y(n[t]))throw new TypeError;
return function(){for(var t=arguments,r=n.length;r--;)t=[n[r].apply(this,t)];return t[0]}},r.createCallback=function(n,t,r){var e=typeof n;if(null==n||"function"==e)return u(n,t,r);if("object"!=e)return j(n);var o=ht(n),i=o[0],a=n[i];return 1!=o.length||a!==a||m(a)?function(t){for(var r=o.length,e=false;r--&&(e=l(t[o[r]],n[o[r]],null,true)););return e}:function(n){return n=n[i],a===n&&(0!==a||1/a==1/n)}},r.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,f(n,4,null,null,null,t)},r.debounce=b,r.defer=function(n){if(!y(n))throw new TypeError;
var r=t(arguments,1);return setTimeout(function(){n.apply(E,r)},1)},r.delay=function(n,r){if(!y(n))throw new TypeError;var e=t(arguments,2);return setTimeout(function(){n.apply(E,e)},r)},r.forIn=vt,r.functions=g,r.keys=ht,r.memoize=function(n,t){if(!y(n))throw new TypeError;var r=function(){var e=r.cache,o=t?t.apply(this,arguments):O+arguments[0];return rt.call(e,o)?e[o]:e[o]=n.apply(this,arguments)};return r.cache={},r},r.once=function(n){var t,r;if(!y(n))throw new TypeError;return function(){return t?r:(t=true,r=n.apply(this,arguments),n=null,r)
}},r.partial=function(n){return f(n,16,t(arguments,1))},r.partialRight=function(n){return f(n,32,null,t(arguments,1))},r.property=j,r.throttle=function(n,t,r){var e=true,o=true;if(!y(n))throw new TypeError;return false===r?e=false:m(r)&&(e="leading"in r?r.leading:e,o="trailing"in r?r.trailing:o),L.leading=e,L.maxWait=t,L.trailing=o,b(n,t,L)},r.wrap=function(n,t){return f(t,16,[n])},r.methods=g,r.identity=d,r.isArguments=s,r.isArray=yt,r.isFunction=y,r.isObject=m,r.isString=h,r.noop=w,r.now=bt,r.VERSION="2.4.1",typeof define=="function"&&typeof define.amd=="object"&&define.amd?(J._=r, define(function(){return r
})):q&&M?V?(M.exports=r)._=r:q._=r:J._=r}).call(this);
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
/*! func v0.0.0 - MIT license */
"use strict";

module.exports = ( function() {

  var _ = _dereq_( "./lodash.functions.min.js" );

  function factory( fn ) {
    var func = function() {
      return fn.apply( this, arguments );
    };
    func._original = fn;
    mixin( func, methods );
    members.push( func );
    return func;
  }

  function mixin( target, source ) {
    var key;
    for ( key in source ) {
      target[key] = source[key];
    }
  }

  function isFunction( obj ) {
    return typeof obj === "function";
  }

  function unshiftArgs( argsObj, item ) {
    var arr = slice( argsObj )
    arr.unshift( item );
    return arr;
  }

  var slice = Function.prototype.call.bind( Array.prototype.slice );

  var members = [];

  var methodNames = [
    "throttle",
    "debounce",
    "curry",
    "partial",
    "partialRight",
    "compose",
    "delay",
    "defer",
    "memoize"
  ];

  var methods = {};

  methodNames.forEach( function( fn ) {
    methods[fn] = function() {
      var args = unshiftArgs( arguments, this );
      return factory( _[fn].apply( null, args ) );
    };
  });

  factory.addMethod = function( name, value, noUpdate ) {

    // can't overwrite existing methods.
    if ( name in methods ) {
      throw new Error( "A method already exists with that name." );
    }

    // if the new method returns functions, 
    // those functions get run through the factory
    methods[name] = function() {
      var result = value.apply( this, arguments );
      return ( isFunction( result ) ) ? factory( result ) : result;
    };

    // default behavior is to add new methods to all super functions.
    if ( !noUpdate ) {
      members.forEach( function( fn ){
        fn[name] = value;
      });
    }
  };

  // utility function
  factory.demethodize = function( fn ) {
    return Function.prototype.call.bind( fn );
  };

  return factory;

})();

},{"./lodash.functions.min.js":1}]},{},[2])
(2)
});