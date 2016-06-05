/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var global = window;
	var _toSource;
	if (Object.prototype.toSource) {
	    _toSource = function _toSource(vValue) {
	        return vValue.toSource();
	    };
	} else {
	    _toSource = function _toSource(vValue) {
	        var func = {
	            $: function $(_$) {
	                if (typeof _$ == "undefined") return '""';
	                if (typeof _$ == "boolean") return _$ ? "true" : "false";
	                if (typeof _$ == "string") return this.s(_$);
	                if (typeof _$ == "number") return _$;
	                if (_$ instanceof Array) return this.a(_$);
	                if (_$ instanceof Object) return this.o(_$);
	            },
	            s: function s(_s) {
	                var e = { '"': '\\"', "\\": "\\\\", "\n": "\\n", "\r": "\\r", "\t": "\\t" };
	                var c = function c(m) {
	                    return typeof e[m] != "undefined" ? e[m] : m;
	                };
	                return '"' + _s.replace(/[\\"'\n\r\t]/g, c) + '"';
	            },
	            a: function a(_a) {
	                var s = "[",
	                    c = "",
	                    n = _a.length;
	                for (var i = 0; i < n; i++) {
	                    if (typeof _a[i] == "function") continue;
	                    s += c + this.$(_a[i]);
	                    if (!c) c = ",";
	                }
	                return s + "]";
	            },
	            o: function o(_o) {
	                var s = "{",
	                    c = "";
	                for (var x in _o) {
	                    if (typeof _o[x] == "function") continue;
	                    s += c + this.s(x) + ":" + this.$(_o[x]);
	                    if (!c) c = ",";
	                }
	                return s + "}";
	            }
	        };
	
	        return func.$(vValue);
	    };
	}
	
	function Mock(vName, sType) {
	    if (!(this instanceof Mock)) {
	        return new Mock(vName, sType);
	    } else {
	        this.createMock(vName, sType || Mock.OBJECT);
	    }
	}
	
	Mock.prototype.createMock = function (vName, sType) {
	    this._vReturnValue = "_js_mock_none";
	    this._mockType = Mock.OBJECT;
	    if (typeof vName == "string") {
	        this.makeEnableObj(vName, sType);
	        this._mockType = sType;
	    } else if ((typeof vName === "undefined" ? "undefined" : _typeof(vName)) == "object" || typeof vName == "function") {
	        this._mockObj = vName;
	    } else {
	        throw new Error("Name of Mock is incorrect.The Type only have String or Object or Function.");
	    }
	};
	
	Mock.prototype.getMock = function () {
	    if (this._mockType == Mock.OBJECT) {
	        return this._mockObj;
	    } else {
	        return this._mockObj.prototype;
	    }
	};
	
	Mock.prototype.makeEnableObj = function (sName, sType) {
	    var depth = sName.split(".");
	    var objectName = depth[0];
	    var obj;
	    if (depth.length > 1) {
	        obj = global;
	
	        for (var i = 0, l = depth.length; i < l - 1; i++) {
	            if (typeof obj[depth[i]] == "undefined") {
	                obj[depth[i]] = {};
	            }
	
	            obj = obj[depth[i]];
	        }
	        objectName = depth[depth.length - 1];
	    } else {
	        obj = global;
	    }
	
	    var returnObj;
	    if (sType == Mock.OBJECT) {
	        returnObj = obj[objectName];
	        if (returnObj) {
	            this._mockObj = returnObj;
	        } else {
	            this._mockObj = obj[objectName] = {};
	        }
	    } else if (sType == Mock.INSTANCE) {
	        returnObj = obj[objectName];
	        if (returnObj) {
	            this._mockObj = returnObj;
	        } else {
	            this._mockObj = obj[objectName] = function () {};
	            this._mockObj.prototype = obj[objectName].prototype = {};
	        }
	    }
	};
	
	Mock.prototype.should_receive = function (sMethodName) {
	    return MockFactory.getMockMethod(this.getMock(), sMethodName);
	};
	
	Mock.prototype.reset_all = function () {
	    var oObj = MockFactory.getData(this.getMock());
	    for (var i in oObj) {
	        if (i != "current_obj") oObj[i].record = { "total": 0, "param": {} };
	    }
	};
	
	Mock.prototype.reset = function (sMethodName) {
	    var oObj = MockFactory.getData(this.getMock());
	    oObj[sMethodName].record = { "total": 0, "param": {} };
	};
	
	Mock.prototype.verify = function (sMethodName) {
	    var oObj = MockFactory.getData(this.getMock());
	    if (oObj[sMethodName]) {
	        if (oObj[sMethodName].record.total === 0) {
	            throw new Error(sMethodName + " is not called.");
	        } else {
	            return oObj[sMethodName].record;
	        }
	    } else {
	        throw new Error(sMethodName + " isn't method.");
	    }
	};
	
	Mock.prototype.verify_all = function () {
	    var oObj = MockFactory.getData(this.getMock());
	    var oReturn = {};
	    for (var i in oObj) {
	        if (i != "current_obj") oReturn[i] = this.verify(i);
	    }
	    return oReturn;
	};
	
	Mock.INSTANCE = "instance";
	Mock.OBJECT = "object";
	
	Mock.anything = function () {
	    return "_js_mock_anything_param";
	};
	
	function MockMethod(oObj, sMethodName) {
	    var that = this;
	    this.excuteObjs = {
	        //      key:{
	        //          arg:[],
	        //          type:"function",
	        //          excute : function(){}
	        //      }
	    };
	    this.record = { "total": 0, "param": {} };
	    this.currentParam = _toSource([]);
	    this.excuteObjs[this.currentParam] = {};
	    oObj[sMethodName] = function () {
	        that.record.total++;
	        var argString = _toSource(argumentsToArray(arguments));
	        if (that.record.param[argString]) {
	            that.record.param[argString] += 1;
	        } else {
	            that.record.param[argString] = 1;
	        }
	        var dataObj = that.excuteObjs[argString];
	        if (dataObj) {
	            if (dataObj.type == "function") {
	                return dataObj.excute.apply(dataObj, argumentsToArray(arguments));
	            } else if (dataObj.type == "exception") {
	                throw dataObj.excute;
	            } else if (dataObj.type == "return") {
	                return dataObj.excute;
	            }
	        } else {
	            for (var i in that.excuteObjs) {
	                var currentParam = argumentsToArray(arguments);
	                var arg = that.excuteObjs[i].arg;
	
	                if (arg && arg.length == currentParam.length) {
	                    var paramMatch = true;
	                    for (var j = 0, l = arg.length; j < l; j++) {
	                        if (arg[j] != currentParam[j] && arg[j] != "_js_mock_anything_param") {
	                            paramMatch = false;
	                            break;
	                        }
	                    }
	                    if (paramMatch) {
	                        return that.excuteObjs[i].excute;
	                    }
	                }
	            }
	        }
	    };
	}
	
	MockMethod.prototype.with_param = function () {
	    var arg = argumentsToArray(arguments);
	    this.currentParam = _toSource(arg);
	    this.excuteObjs[this.currentParam] = {
	        arg: arg
	    };
	
	    return this;
	};
	
	MockMethod.prototype._and_template = function (sType, vExcute) {
	    this.excuteObjs[this.currentParam].type = sType;
	    this.excuteObjs[this.currentParam].excute = vExcute;
	    this.currentParam = _toSource([]);
	};
	
	MockMethod.prototype.and_return = function (vReturnValue) {
	    this._and_template("return", vReturnValue);
	};
	
	MockMethod.prototype.and_function = function (fpFunction) {
	    this._and_template("function", fpFunction);
	};
	
	MockMethod.prototype.and_throw = function (xException) {
	    this._and_template("exception", xException);
	};
	
	var MockFactory = {
	    storage: [
	        //      {
	        //          current_obj : {}, object
	        //          current_functions : {} mock method
	        //      }
	    ],
	    createData: function createData(oObj) {
	        var dataObj = { current_obj: oObj };
	        this.storage.push(dataObj);
	
	        return dataObj;
	    },
	    createMockMethod: function createMockMethod(oObj, sMethodName) {
	        var dataObj = this.getData(oObj);
	        dataObj[sMethodName] = new MockMethod(oObj, sMethodName);
	
	        return dataObj[sMethodName];
	    },
	    getData: function getData(oObj) {
	        for (var i = 0, l = this.storage.length; i < l; i++) {
	            if (this.storage[i].current_obj == oObj) {
	                return this.storage[i];
	            }
	        }
	        return this.createData(oObj);
	    },
	    getMockMethod: function getMockMethod(oObj, sMethodName) {
	        var dataObj = this.getData(oObj);
	        if (!dataObj[sMethodName]) {
	            dataObj[sMethodName] = this.createMockMethod(oObj, sMethodName);
	        }
	        return dataObj[sMethodName];
	    }
	};
	
	function argumentsToArray(aArg) {
	    var returnVal = [];
	    if (!!aArg.length) {
	        for (var i = 0, l = aArg.length; i < l; i++) {
	            returnVal[i] = aArg[i];
	        }
	    }
	    return returnVal;
	}
	
	if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Mock;
	} else {
	    global.mock = global.Mock = Mock;
	}
	exports.default = Mock;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Stub = function () {
	    function Stub(name) {
	        var type = arguments.length <= 1 || arguments[1] === undefined ? "object" : arguments[1];
	
	        _classCallCheck(this, Stub);
	
	        this.createStub(name, type);
	    }
	
	    _createClass(Stub, [{
	        key: "createStub",
	        value: function createStub(name, type) {
	            this.returnValue = "_js_stub_none";
	            this.stubType = Stub.OBJECT;
	
	            if (typeof name == "string") {
	                this.makeEnableObj(name, type);
	                this.stubType = type;
	            } else if ((typeof name === "undefined" ? "undefined" : _typeof(name)) == "object" || typeof name == "function") {
	                this.stubObj = name;
	            } else {
	                throw new Error("Name of Stub is incorrect.Type is String or Object or Function.");
	            }
	        }
	    }, {
	        key: "getStub",
	        value: function getStub() {
	            if (this.stubType == Stub.OBJECT) {
	                return this.stubObj;
	            } else {
	                return this.stubObj.prototype;
	            }
	        }
	    }, {
	        key: "makeEnableObj",
	        value: function makeEnableObj(name, type) {
	            var depth = name.split(".");
	            var objectName = depth[0];
	            var obj = window;
	            var returnObj;
	
	            if (depth.length > 1) {
	                depth.splice(0, depth.length - 1).forEach(function (v, i) {
	                    if (typeof obj[v] == "undefined") {
	                        obj[v] = {};
	                    }
	                    obj = obj[v];
	                });
	                objectName = depth[depth.length - 1];
	            }
	
	            returnObj = obj[objectName];
	            this.stubObj = returnObj;
	            if (type === Stub.OBJECT && !returnObj) {
	                this.stubObj = obj[objectName] = {};
	            } else if (type === Stub.INSTANCE && !returnObj) {
	                this.stubObj = obj[objectName] = function () {};
	                this.stubObj.prototype = obj[objectName].prototype = {};
	            }
	        }
	    }, {
	        key: "should_receive",
	        value: function should_receive(functionName) {
	            var _this = this;
	
	            this.getStub()[functionName] = function () {
	                if (_this.returnValue != "_js_stub_none") {
	                    return _this.returnValue;
	                }
	            };
	            return new StubMethod(this);
	        }
	    }]);
	
	    return Stub;
	}();
	
	Stub.INSTANCE = "instance";
	Stub.OBJECT = "object";
	
	var StubMethod = function () {
	    function StubMethod(stub) {
	        _classCallCheck(this, StubMethod);
	
	        this.stub = stub;
	    }
	
	    _createClass(StubMethod, [{
	        key: "and_return",
	        value: function and_return(returnValue) {
	            this.stub.returnValue = returnValue;
	        }
	    }]);
	
	    return StubMethod;
	}();
	
	function stubWrap(name, type) {
	    if (!(this instanceof Stub)) {
	        return new Stub(name, type);
	    } else {
	        this.createStub(name, type);
	    }
	};
	
	stubWrap.OBJECT = Stub.OBJECT;
	stubWrap.INSTANCE = Stub.INSTANCE;
	
	exports.default = stubWrap;

/***/ }
/******/ ]);
//# sourceMappingURL=jsmocktool.js.map