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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var global = window;
	
	var Mock = function () {
	    function Mock(name) {
	        var type = arguments.length <= 1 || arguments[1] === undefined ? "object" : arguments[1];
	
	        _classCallCheck(this, Mock);
	
	        this.createMock(name, type);
	    }
	
	    _createClass(Mock, [{
	        key: "createMock",
	        value: function createMock(name, type) {
	            this.returnValue = "_js_mock_none";
	            this.mockType = Mock.OBJECT;
	
	            if (typeof name == "string") {
	                this.makeEnableObj(name, type);
	                this.mockType = type;
	            } else if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "object" || typeof name == "function") {
	                this.mockObj = name;
	            } else {
	                throw new Error("Name of Mock is incorrect.The Type only have String or Object or Function.");
	            }
	        }
	    }, {
	        key: "getMock",
	        value: function getMock() {
	            if (this.mockType === Mock.OBJECT) {
	                return this.mockObj;
	            } else {
	                return this.mockObj.prototype;
	            }
	        }
	    }, {
	        key: "makeEnableObj",
	        value: function makeEnableObj(name, type) {
	            var depth = name.split(".");
	            var objectName = depth[0];
	            var obj = global;
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
	            this.mockObj = returnObj;
	            if (type === Mock.OBJECT && !returnObj) {
	                this.mockObj = obj[objectName] = {};
	            } else if (type === Mock.INSTANCE && !returnObj) {
	                this.mockObj = obj[objectName] = function () {};
	                this.mockObj.prototype = obj[objectName].prototype = {};
	            }
	        }
	    }, {
	        key: "should_receive",
	        value: function should_receive(methodName) {
	            return MockFactory.getMethod(this.getMock(), methodName);
	        }
	    }, {
	        key: "reset_all",
	        value: function reset_all() {
	            var obj = MockFactory.getData(this.getMock());
	            for (var i in obj) {
	                if (i != "current_obj") {
	                    obj[i].record = { "total": 0, "param": {} };
	                }
	            }
	        }
	    }, {
	        key: "reset",
	        value: function reset(methodName) {
	            var obj = MockFactory.getData(this.getMock());
	            obj[methodName].record = { "total": 0, "param": {} };
	        }
	    }, {
	        key: "verify",
	        value: function verify(methodName) {
	            var obj = MockFactory.getData(this.getMock());
	            if (obj[methodName]) {
	                if (obj[methodName].record.total === 0) {
	                    throw new Error(methodName + " is not called.");
	                } else {
	                    return obj[methodName].record;
	                }
	            } else {
	                throw new Error(methodName + " isn't method.");
	            }
	        }
	    }, {
	        key: "verify_all",
	        value: function verify_all() {
	            var obj = MockFactory.getData(this.getMock());
	            var returnValue = {};
	            for (var i in obj) {
	                if (i != "current_obj") returnValue[i] = this.verify(i);
	            }
	            return returnValue;
	        }
	    }]);
	
	    return Mock;
	}();
	
	Mock.INSTANCE = "instance";
	Mock.OBJECT = "object";
	
	var MockMethod = function () {
	    function MockMethod(obj, methodName) {
	        _classCallCheck(this, MockMethod);
	
	        this.excuteObjs = {
	            //      key:{
	            //          arg:[],
	            //          type:"function",
	            //          excute : function(){}
	            //      }
	        };
	        this.record = { "total": 0, "param": {} };
	        this.currentParam = JSON.stringify([]);
	        this.excuteObjs[this.currentParam] = {};
	        this.setup(obj, methodName);
	    }
	
	    _createClass(MockMethod, [{
	        key: "setup",
	        value: function setup(obj, methodName) {
	            var that = this;
	            obj[methodName] = function () {
	                that.record.total++;
	                var argString = JSON.stringify(argumentsToArray(arguments));
	
	                if (that.record.param[argString]) {
	                    that.record.param[argString] += 1;
	                } else {
	                    that.record.param[argString] = 1;
	                }
	
	                var dataObj = that.excuteObjs[argString];
	
	                if (dataObj) {
	                    if (dataObj.type === "function") {
	                        return dataObj.excute.apply(dataObj, argumentsToArray(arguments));
	                    } else if (dataObj.type === "exception") {
	                        throw dataObj.excute;
	                    } else if (dataObj.type === "return") {
	                        return dataObj.excute;
	                    }
	                } else {
	                    for (var i in that.excuteObjs) {
	                        var currentParam = argumentsToArray(arguments);
	                        var arg = that.excuteObjs[i].arg;
	
	                        if (arg && arg.length === currentParam.length) {
	                            var paramMatch = true;
	                            for (var j = 0, l = arg.length; j < l; j++) {
	                                if (arg[j] != currentParam[j] && arg[j] != mockWrap.anything()) {
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
	    }, {
	        key: "with_param",
	        value: function with_param() {
	            var arg = argumentsToArray(arguments);
	            this.currentParam = JSON.stringify(arg);
	            this.excuteObjs[this.currentParam] = {
	                arg: arg
	            };
	
	            return this;
	        }
	    }, {
	        key: "_and_template",
	        value: function _and_template(type, excute) {
	            this.excuteObjs[this.currentParam].type = type;
	            this.excuteObjs[this.currentParam].excute = excute;
	            this.currentParam = JSON.stringify([]);
	        }
	    }, {
	        key: "and_return",
	        value: function and_return(returnVal) {
	            this._and_template("return", returnVal);
	        }
	    }, {
	        key: "and_function",
	        value: function and_function(returnFunction) {
	            this._and_template("function", returnFunction);
	        }
	    }, {
	        key: "and_throw",
	        value: function and_throw(returnException) {
	            this._and_template("exception", returnException);
	        }
	    }]);
	
	    return MockMethod;
	}();
	
	var MockFactory = {
	    storage: [
	        //      {
	        //          current_obj : {}, object
	        //          current_functions : {} mock method
	        //      }
	    ],
	    createData: function createData(obj) {
	        var dataObj = { current_obj: obj };
	        this.storage.push(dataObj);
	
	        return dataObj;
	    },
	    createMethod: function createMethod(obj, methodName) {
	        var dataObj = this.getData(obj);
	        dataObj[methodName] = new MockMethod(obj, methodName);
	
	        return dataObj[methodName];
	    },
	    getData: function getData(obj) {
	        for (var i = 0, l = this.storage.length; i < l; i++) {
	            if (this.storage[i].current_obj == obj) {
	                return this.storage[i];
	            }
	        }
	        return this.createData(obj);
	    },
	    getMethod: function getMethod(obj, methodName) {
	        var dataObj = this.getData(obj);
	        if (!dataObj[methodName]) {
	            dataObj[methodName] = this.createMethod(obj, methodName);
	        }
	        return dataObj[methodName];
	    }
	};
	
	function argumentsToArray(arg) {
	    var returnVal = [];
	    if (!!arg.length) {
	        for (var i = 0, l = arg.length; i < l; i++) {
	            returnVal[i] = arg[i];
	        }
	    }
	    return returnVal;
	}
	
	function mockWrap(name, type) {
	    if (!(this instanceof Mock)) {
	        return new Mock(name, type);
	    } else {
	        this.createMock(name, type);
	    }
	};
	
	mockWrap.OBJECT = Mock.OBJECT;
	mockWrap.INSTANCE = Mock.INSTANCE;
	mockWrap.anything = function () {
	    return "_js_mock_anything_param";
	};
	
	exports.default = mockWrap;

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
	
	var global = window;
	
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
	            var obj = global;
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