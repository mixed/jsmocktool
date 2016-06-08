/**
* Copyright (c) 2015 YongWoo, Jeon <i.nevalose@gmail.com> (http://mixed.kr/).
* @license MIT
*
* jsmocktool is Javascript Mock Tool of RSpec Style.
* https://github.com/mixed/jsmocktool
*
* @version 1.3.0
*/

!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(2),n(1),n(3),n(5),n(4),n(6),e.exports=n(7)},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=window,a=function(){function e(t,r){n(this,e),this.createTestDouble(t,r)}return o(e,[{key:"createTestDouble",value:function(e,t){if(this.returnValue="_js_testDouble_none",this.testDoubleType=t,"string"==typeof e)this.makeEnableObj(e,t);else{if("object"!==("undefined"==typeof e?"undefined":r(e))&&"function"!=typeof e)throw new Error("Name of "+this.type+" is incorrect.\n			The Type only have String or Object or Function.");this.testDoubleObj=e}}},{key:"getTestDouble",value:function(){return"object"===this.testDoubleType?this.testDoubleObj:this.testDoubleObj.prototype}},{key:"makeEnableObj",value:function(e,t){var n=e.split("."),r=n[0],o=u;n.length>1&&(n.splice(0,n.length-1).forEach(function(e){"undefined"==typeof o[e]&&(o[e]={}),o=o[e]}),r=n[n.length-1]);var a=o[r];this.testDoubleObj=a,"object"!==t||a?"instance"!==t||a||(this.testDoubleObj=o[r]=function(){},this.testDoubleObj.prototype=o[r].prototype={}):this.testDoubleObj=o[r]={}}}]),e}();t["default"]=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.mock=t.stub=void 0;var o=n(6),u=r(o),a=n(3),i=r(a);t.stub=u["default"],t.mock=i["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){return this instanceof h?void this.createTestDouble(e,t):new h(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(5),s=r(f),l=n(1),b=r(l),h=function(e){function t(e){var n=arguments.length<=1||void 0===arguments[1]?"object":arguments[1];o(this,t);var r=u(this,Object.getPrototypeOf(t).call(this,e,n));return r.type="Mock",r}return a(t,e),c(t,[{key:"should_receive",value:function(e){return s["default"].getMethod(this.getTestDouble(),e)}},{key:"reset_all",value:function(){var e=s["default"].getData(this.getTestDouble());for(var t in e)"current_obj"!==t&&(e[t].record={total:0,param:{}})}},{key:"reset",value:function(e){var t=s["default"].getData(this.getTestDouble());t[e].record={total:0,param:{}}}},{key:"verify",value:function(e){var t=s["default"].getData(this.getTestDouble());if(t[e]){if(0===t[e].record.total)throw new Error(e+" isn't called.");return t[e].record}throw new Error(e+" isn't method.")}},{key:"verify_all",value:function(){var e=s["default"].getData(this.getTestDouble()),t={};for(var n in e)"current_obj"!==n&&(t[n]=this.verify(n));return t}}]),t}(b["default"]);i.OBJECT="object",i.INSTANCE="instance",i.anything=function(){return"_js_mock_anything_param"},t["default"]=i},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){var t=[];if(e.length)for(var n=0,r=e.length;r>n;n++)t[n]=e[n];return t}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(t,r){n(this,e),this.excuteObjs={},this.record={total:0,param:{}},this.currentParam=JSON.stringify([]),this.excuteObjs[this.currentParam]={},this.setup(t,r)}return o(e,[{key:"setup",value:function(e,t){var n=this,o=e;o[t]=function(){n.record.total++;for(var e=arguments.length,t=Array(e),o=0;e>o;o++)t[o]=arguments[o];var u=JSON.stringify(r(t));n.record.param[u]?n.record.param[u]+=1:n.record.param[u]=1;var a=n.excuteObjs[u];if(a){if("function"===a.type)return a.excute.apply(a,r(t));if("exception"===a.type)throw a.excute;if("return"===a.type)return a.excute}else for(var i in n.excuteObjs){var c=r(t),f=n.excuteObjs[i].arg;if(f&&f.length===c.length){for(var s=!0,l=0,b=f.length;b>l;l++)if(f[l]!==c[l]&&"_js_mock_anything_param"!==f[l]){s=!1;break}if(s)return n.excuteObjs[i].excute}}}}},{key:"with_param",value:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];var o=r(t);return this.currentParam=JSON.stringify(o),this.excuteObjs[this.currentParam]={arg:o},this}},{key:"and_template",value:function(e,t){this.excuteObjs[this.currentParam].type=e,this.excuteObjs[this.currentParam].excute=t,this.currentParam=JSON.stringify([])}},{key:"and_return",value:function(e){this.and_template("return",e)}},{key:"and_function",value:function(e){this.and_template("function",e)}},{key:"and_throw",value:function(e){this.and_template("exception",e)}}]),e}();t["default"]=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(4),u=r(o),a={storage:[],createData:function(e){var t={current_obj:e};return this.storage.push(t),t},createMethod:function(e,t){var n=this.getData(e);return n[t]=new u["default"](e,t),n[t]},getData:function(e){for(var t=0,n=this.storage.length;n>t;t++)if(this.storage[t].current_obj===e)return this.storage[t];return this.createData(e)},getMethod:function(e,t){var n=this.getData(e);return n[t]||(n[t]=this.createMethod(e,t)),n[t]}};t["default"]=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){p.console&&console.warn&&console.warn(e)}function c(e,t){return this instanceof y?void this.createTestDouble(e,t):new y(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(7),l=r(s),b=n(1),h=r(b),p=window,y=function(e){function t(e){var n=arguments.length<=1||void 0===arguments[1]?"object":arguments[1];o(this,t);var r=u(this,Object.getPrototypeOf(t).call(this,e,n));return r.type="Stub",i("[WARN] : Deprecated Stub. You should be change to Mock."),r}return a(t,e),f(t,[{key:"should_receive",value:function(e){var t=this;return this.getTestDouble()[e]=function(){return"_js_stub_none"!==t.returnValue?t.returnValue:void 0},new l["default"](this)}}]),t}(h["default"]);c.OBJECT="object",c.INSTANCE="instance",t["default"]=c},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){n(this,e),this.stub=t}return r(e,[{key:"and_return",value:function(e){this.stub.returnValue=e}}]),e}();t["default"]=o}]);
//# sourceMappingURL=jsmocktool.js.map