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

	__webpack_require__(3);
	module.exports = __webpack_require__(4);


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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _jsmock = __webpack_require__(1);
	
	var _jsmock2 = _interopRequireDefault(_jsmock);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var global = window; /**
	                      * @author mixed
	                      */
	
	QUnit.module("jsmock - Object type", {
	  "beforeEach": function beforeEach() {
	    this.mock = (0, _jsmock2.default)("RECEIVE");
	    this.mock_test1 = "";
	    this.mock_test2 = "";
	    this.mock_test3 = "";
	  },
	  "afterEach": function afterEach() {
	    this.mock = undefined;
	    RECEIVE = undefined;
	  }
	});
	
	QUnit.test("Must be first prameter is string or object", function (assert) {
	  //Given
	  //When
	  (0, _jsmock2.default)("FOO");
	  //Then
	  assert.deepEqual(FOO, {});
	
	  //Given
	  var BAR = {};
	  //When
	  (0, _jsmock2.default)(BAR);
	  //Then
	  assert.deepEqual(BAR, BAR);
	});
	
	QUnit.test("Must be second parameter is 'instance','object',none.", function (assert) {
	  //Given
	  //When
	  (0, _jsmock2.default)("FOO2");
	  //Then
	  assert.deepEqual(FOO2, {});
	
	  //Given
	  //When
	  (0, _jsmock2.default)("FOO3", _jsmock2.default.INSTANCE);
	  //Then
	  assert.equal(FOO3.constructor, Function);
	});
	
	QUnit.test("The should_receive is set method of mock Object.", function (assert) {
	  //Given
	  var receiveMock = (0, _jsmock2.default)("RECEIVE");
	  //Then
	  receiveMock.should_receive("test");
	  //When
	  assert.equal(RECEIVE.test.constructor, Function);
	
	  //Given
	  var receiveMock2 = (0, _jsmock2.default)("RECEIVE2", _jsmock2.default.INSTANCE);
	  //Then
	  receiveMock2.should_receive("test");
	  //When
	  assert.equal(RECEIVE2.prototype.test.constructor, Function);
	});
	
	QUnit.test("Return value of should_receive is MockMethod.", function (assert) {
	  //Given
	  var receive = (0, _jsmock2.default)("RECEIVE3");
	  //When
	  var mock_method = receive.should_receive("test");
	  //The MockMethod is private. so I can't test.
	  //Instead, I made a Ducktyping test(?).
	  //I believe correct when The return value of should_receive have and_return function.
	  // ok(stub_obj instanceof MockMethod);
	  //Then
	  assert.equal(mock_method.and_return.constructor, Function);
	});
	
	QUnit.test("The and_return is  setting value to return.", function (assert) {
	  //Given
	  (0, _jsmock2.default)("RECEIVE4").should_receive("test").and_return(3);
	  //When
	  var returnVal = RECEIVE4.test();
	  //Then
	  assert.equal(returnVal, 3);
	});
	
	QUnit.test("If use with_param, mock will return value when same param.", function (assert) {
	  //Given
	  (0, _jsmock2.default)("RECEIVE4").should_receive("test").with_param(1, 2).and_return(4);
	  //When
	  var returnVal = RECEIVE4.test(1, 2);
	  //Then
	  assert.equal(returnVal, 4);
	});
	
	QUnit.test("The Mock must be work mock before set parameter when add new parameter.", function (assert) {
	  //Given
	  this.mock.should_receive("test").and_return(3);
	  this.mock.should_receive("test").with_param(1, 2).and_return(4);
	  this.mock.should_receive("test").with_param(1, 2, 3).and_return(5);
	  //When
	  var noneParam = RECEIVE.test();
	  var oneParam = RECEIVE.test(1, 2);
	  var twoParam = RECEIVE.test(1, 2, 3);
	  //Then
	  assert.equal(noneParam, 3);
	  assert.equal(oneParam, 4);
	  assert.equal(twoParam, 5);
	});
	
	QUnit.test("The Mock must be change return value when add same parameter.", function (assert) {
	  //Given
	  this.mock.should_receive("test").and_return(3);
	  this.mock.should_receive("test").with_param(1, 2).and_return(4);
	  this.mock.should_receive("test").with_param(1, 2).and_return(5);
	  //When
	  var noneParam = RECEIVE.test();
	  var twoParam = RECEIVE.test(1, 2);
	  //Then
	  assert.equal(noneParam, 3);
	  assert.equal(twoParam, 5);
	});
	
	QUnit.test("The add_throw is throw exception when match param.", function (assert) {
	  //Given
	  var error_message = "";
	  this.mock.should_receive("test2").and_throw(new Error("and_throw test."));
	  //When
	  try {
	    RECEIVE.test2();
	  } catch (e) {
	    error_message = e.message;
	  }
	  //Then
	  assert.equal(error_message, "and_throw test.");
	});
	
	QUnit.test("If set with_param of and_throw then throw exception when match parameter.", function (assert) {
	  //Given
	  this.mock.should_receive("test2").with_param(1, 2).and_throw(new Error("and_throw test2."));
	  var error_message = "";
	
	  //When
	  try {
	    RECEIVE.test2(1, 2);
	  } catch (e) {
	    error_message = e.message;
	  }
	
	  //Then
	  assert.equal(error_message, "and_throw test2.");
	});
	
	QUnit.test("The and_throw is well work when change parameter", function (assert) {
	  //Given
	  this.mock.should_receive("test2").with_param().and_throw(new Error("and_throw test"));
	  this.mock.should_receive("test2").with_param(1, 2).and_throw(new Error("and_throw test2"));
	  this.mock.should_receive("test2").with_param(1, 2, 3).and_throw(new Error("and_throw test3"));
	  var error_message = "";
	
	  //When
	  try {
	    RECEIVE.test2();
	  } catch (e) {
	    error_message = e.message;
	  }
	  //Then
	  assert.equal(error_message, "and_throw test");
	
	  //When
	  try {
	    RECEIVE.test2(1, 2);
	  } catch (e) {
	    error_message = e.message;
	  }
	  //Then
	  assert.equal(error_message, "and_throw test2");
	
	  //When
	  try {
	    RECEIVE.test2(1, 2, 3);
	  } catch (e) {
	    error_message = e.message;
	  }
	  //Then
	  assert.equal(error_message, "and_throw test3");
	});
	QUnit.test("The and_throw throw new exception when some function, same parameter, change exception.", function (assert) {
	  //Given
	  this.mock.should_receive("test2").with_param(1, 2, 3).and_throw(new Error("and_throw test"));
	  var error_message = "";
	  //When
	  try {
	    RECEIVE.test2(1, 2, 3);
	  } catch (e) {
	    error_message = e.message;
	  }
	  //Then
	  assert.equal(error_message, "and_throw test");
	
	  //Then
	  this.mock.should_receive("test2").with_param(1, 2, 3).and_throw(new Error("change throw"));
	  try {
	    RECEIVE.test2(1, 2, 3);
	  } catch (e) {
	    error_message = e.message;
	  }
	  //When
	  assert.equal(error_message, "change throw");
	});
	
	QUnit.test("The and_function run function when set new function", function (assert) {
	
	  //Given
	  var that = this;
	  this.mock.should_receive("test3").and_function(function () {
	    that.mock_test1 = "first";
	  });
	  //Then
	  RECEIVE.test3();
	  //When
	  assert.equal(that.mock_test1, "first");
	});
	
	QUnit.test("If set a with_param then the and_functon run function when only match parameter.", function (assert) {
	  //Given
	  var that = this;
	  this.mock.should_receive("test3").with_param(1, 2).and_function(function () {
	    that.mock_test2 = "second";
	  });
	  //Then
	  RECEIVE.test3(1, 2);
	  //When
	  assert.equal(that.mock_test2, "second");
	});
	
	QUnit.test("Then and_function is well work when same function change parameter.", function (assert) {
	  //Given
	  var that = this;
	  this.mock.should_receive("test3").with_param().and_function(function () {
	    that.mock_test1 = "first";
	  });
	  this.mock.should_receive("test3").with_param(1, 2).and_function(function () {
	    that.mock_test2 = "second";
	  });
	  this.mock.should_receive("test3").with_param(1, 2, 3).and_function(function () {
	    that.mock_test3 = "third";
	  });
	  //When
	  RECEIVE.test3();
	  //Then
	  assert.equal(that.mock_test1, "first");
	
	  //When
	  RECEIVE.test3(1, 2);
	  //Then
	  assert.equal(that.mock_test2, "second");
	
	  //When
	  RECEIVE.test3(1, 2, 3);
	  //Then
	  assert.equal(that.mock_test3, "third");
	});
	QUnit.test("The and_function run new function when some function, same parameter, change and_function.", function (assert) {
	  //Given
	  var that = this;
	  this.mock.should_receive("test3").with_param(1, 2, 3).and_function(function () {
	    that.mock_test3 = "third";
	  });
	  this.mock.should_receive("test3").with_param(1, 2, 3).and_function(function () {
	    that.mock_test3 = "change third";
	  });
	  //When
	  RECEIVE.test3(1, 2, 3);
	  //Then
	  assert.equal(that.mock_test3, "change third");
	});
	QUnit.test("If use Mock.anything when run function without reference to parameter.", function (assert) {
	  //Given
	  this.mock.should_receive("test").with_param(1, 2).and_return("1");
	  this.mock.should_receive("test").with_param(1, 2, _jsmock2.default.anything()).and_return("2");
	  this.mock.should_receive("test").with_param(1, 2, _jsmock2.default.anything(), _jsmock2.default.anything()).and_return("3");
	
	  //When, Then
	  assert.equal(RECEIVE.test(1, 2), "1");
	  assert.equal(RECEIVE.test(1, 2, 3), "2");
	  assert.equal(RECEIVE.test(1, 2, 1), "2");
	  assert.equal(RECEIVE.test(1, 2, 4), "2");
	  assert.equal(RECEIVE.test(1, 2, 4, 5), "3");
	  assert.equal(RECEIVE.test(1, 2, 4, 6), "3");
	});
	
	//    'param에 anything이 들어간 파라메터에서 다시 설정한 경우에 다시 설정한 값으로 반환 해야 한다.':function(){
	//      mock("Foo").should_receive("test").with_param("5","6",Mock.anything()).and_return("5");
	//      value_of(Foo.test("5","6","3")).should_be("5");
	
	//      mock("Foo").should_receive("test").with_param("5","6",Mock.anything()).and_return("6");
	//      value_of(Foo.test("5","6","3")).should_be("6");
	
	//    },
	
	QUnit.module("jsmock - other type", {
	  "beforeEach": function beforeEach() {
	
	    this.mock_test1 = "";
	    this.mock_test2 = "";
	    this.mock_test3 = "";
	  },
	  "afterEach": function afterEach() {
	    this.mock = undefined;
	    MockInstance = undefined;
	  }
	});
	
	QUnit.test("The instance type is well work too.", function (assert) {
	  //Given
	  var that = this;
	  var receive = (0, _jsmock2.default)("MockInstance", _jsmock2.default.INSTANCE);
	  receive.should_receive("test").with_param(1).and_return("1");
	  receive.should_receive("test").with_param(2).and_throw(new Error("test"));
	  receive.should_receive("test").with_param(3).and_function(function () {
	    that.mock_test1 = "test";
	  });
	  var errormessage = "";
	
	  //When
	  var mockInstance = new MockInstance();
	  //Then
	  assert.equal(mockInstance.test(1), "1");
	
	  //When
	  try {
	    mockInstance.test(2);
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //Then
	  assert.equal(errormessage, "test");
	
	  //When
	  mockInstance.test(3);
	  //Then
	  assert.equal(that.mock_test1, "test");
	});
	
	QUnit.test("The normal functon is well work too.", function (assert) {
	  //Given
	  var that = this;
	  var receive = (0, _jsmock2.default)(global);
	  receive.should_receive("commonfunc").with_param(1).and_return("1");
	  receive.should_receive("commonfunc").with_param(2).and_throw(new Error("test2"));
	  receive.should_receive("commonfunc").with_param(3).and_function(function () {
	    that.mock_test1 = "commonfunc";
	  });
	  var errormessage = "";
	
	  //Then
	  var returnVal = commonfunc(1);
	  //When
	  assert.equal(returnVal, "1");
	
	  //Then
	  try {
	    commonfunc(2);
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //When
	  assert.equal(errormessage, "test2");
	
	  //Then
	  commonfunc(3);
	  //When
	  assert.equal(that.mock_test1, "commonfunc");
	});
	QUnit.test("The namespace type is well work too.", function (assert) {
	  //Given
	  (0, _jsmock2.default)("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
	  //Then,When
	  assert.equal(aaa.bbb.ccc.ddd.test(), "test");
	
	  //Given
	  (0, _jsmock2.default)("aaaa.bbbb.cccc", _jsmock2.default.INSTANCE).should_receive("test").and_return("test");
	  //Then,When
	  assert.equal(new aaaa.bbbb.cccc().test(), "test");
	
	  //Given
	  global["aaaaa"] = {};
	  aaaaa.bbbbb = {};
	  (0, _jsmock2.default)("aaaaa.bbbbb").should_receive("test").and_return("test");
	  //Then,When
	  assert.equal(aaaaa.bbbbb.test(), "test");
	
	  //Given
	  (0, _jsmock2.default)("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
	  //Then,When
	  assert.equal(aaaaa.bbbbb.ccccc.test(), "test");
	});
	
	QUnit.test("The with_param well work when use namespace.", function (assert) {
	  //Given
	  var that = this;
	  (0, _jsmock2.default)("param.test").should_receive("commonfunc").with_param(1).and_return("1");
	  (0, _jsmock2.default)("param.test").should_receive("commonfunc").with_param(2).and_throw(new Error("test2"));
	  (0, _jsmock2.default)("param.test").should_receive("commonfunc").with_param(3).and_function(function () {
	    that.mock_test1 = "commonfunc";
	  });
	
	  //Then, When
	  assert.equal(param.test.commonfunc(1), "1");
	
	  //Given
	  var errormessage = "";
	  try {
	    param.test.commonfunc(2);
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //Then, When
	  assert.equal(errormessage, "test2");
	
	  //Then
	  param.test.commonfunc(3);
	  //When
	  assert.equal(that.mock_test1, "commonfunc");
	});
	
	QUnit.module("jsmock - verify", {
	  "beforeEach": function beforeEach() {
	    this.mock = (0, _jsmock2.default)("Verify");
	    this.mock_test1 = "";
	    this.mock_test2 = "";
	    this.mock_test3 = "";
	  },
	  "afterEach": function afterEach() {
	    this.mock = undefined;
	    Verify = undefined;
	  }
	});
	
	QUnit.test("The verify is well work.", function (assert) {
	  //Given
	  this.mock.should_receive("kall").with_param(1, 2).and_return("1");
	  this.mock.should_receive("kall2").and_return("1");
	  Verify.kall(1, 2);
	  var errormessage = "";
	  //Then
	  var result = this.mock.verify("kall");
	  //When
	  assert.deepEqual(result, { "total": 1, "param": { "[1,2]": 1 } });
	
	  //Then
	  try {
	    (0, _jsmock2.default)("Verify").verify("kall2");
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //When
	  assert.equal(errormessage, "kall2 is not called.");
	
	  //Then
	  try {
	    (0, _jsmock2.default)("Verify").verify("kall3");
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //When
	  assert.equal(errormessage, "kall3 isn't method.");
	});
	QUnit.test("The verify_all is check all method.", function (assert) {
	
	  //Given
	  (0, _jsmock2.default)("Verify2").should_receive("kall").with_param(1, 2).and_return("1");
	  (0, _jsmock2.default)("Verify2").should_receive("kall2").and_return("1");
	  Verify2.kall(1, 2);
	  Verify2.kall2();
	  var returnVal;
	  //Then
	  returnVal = (0, _jsmock2.default)("Verify2").verify_all();
	  //When
	  assert.deepEqual(returnVal, { "kall": { "total": 1, "param": { "[1,2]": 1 } }, "kall2": { "total": 1, "param": { "[]": 1 } } });
	
	  //Given
	  (0, _jsmock2.default)("Verify3").should_receive("kall").with_param(1, 2).and_return("1");
	  var errormessage;
	  //Then
	  try {
	    (0, _jsmock2.default)("Verify3").verify_all();
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //When
	  assert.equal(errormessage, "kall is not called.");
	});
	QUnit.test("The reset is remove info of function call.", function (assert) {
	  //Given
	  (0, _jsmock2.default)("Verify4").should_receive("kall").with_param(1, 2).and_return("1");
	  Verify4.kall(1, 2);
	  //Then
	  var returnVal = (0, _jsmock2.default)("Verify4").verify_all();
	  //When
	  assert.deepEqual(returnVal, { "kall": { "total": 1, "param": { "[1,2]": 1 } } });
	
	  //Given
	  var errormessage;
	  //Then
	  (0, _jsmock2.default)("Verify4").reset("kall");
	  try {
	    (0, _jsmock2.default)("Verify4").verify("kall");
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //When
	  assert.equal(errormessage, "kall is not called.");
	});
	
	QUnit.test("The reset_all is remove all info of function call.", function (assert) {
	  //Given
	  (0, _jsmock2.default)("Verify5").should_receive("kall").with_param(1, 2).and_return("1");
	  (0, _jsmock2.default)("Verify5").should_receive("kall2").and_return("1");
	  Verify5.kall(1, 2);
	  Verify5.kall2();
	  //Then
	  var returnVal = (0, _jsmock2.default)("Verify5").verify_all();
	  //When
	  assert.deepEqual(returnVal, { "kall": { "total": 1, "param": { "[1,2]": 1 } }, "kall2": { "total": 1, "param": { "[]": 1 } } });
	
	  //Given
	  var errormessage;
	  //Then
	  (0, _jsmock2.default)("Verify5").reset_all();
	  try {
	    (0, _jsmock2.default)("Verify5").verify_all();
	  } catch (e) {
	    errormessage = e.message;
	  }
	  //When
	  assert.equal(errormessage, "kall is not called.");
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _jsstub = __webpack_require__(2);
	
	var _jsstub2 = _interopRequireDefault(_jsstub);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var global = window; /**
	                      * @author mixed
	                      */
	
	QUnit.module("jsstub", {
		"beforeEach": function beforeEach() {
			this.stub = (0, _jsstub2.default)("STUB");
		},
		"afterEach": function afterEach() {
			this.stub = undefined;
			STUB = undefined;
		}
	});
	
	QUnit.test("The first parameter of stub is must be string,object.", function (assert) {
		//Given, When
		(0, _jsstub2.default)("FOO");
		//Then
		assert.deepEqual(FOO, {});
	
		//Given
		var BAR = {};
		//When
		(0, _jsstub2.default)(BAR);
		//Then
		assert.deepEqual(BAR, BAR);
	});
	
	QUnit.test("The Stub is only add function when already made object.", function (assert) {
		//Given
		var Obj = { test: function test() {} };
		//When
		(0, _jsstub2.default)("Obj");
		//Then
		assert.equal(Obj, Obj);
	
		//When
		(0, _jsstub2.default)(Obj);
		//Then
		assert.equal(Obj, Obj);
	});
	QUnit.test("The second parameter of stub is must be none, 'instance' or 'object'", function (assert) {
		//Given
		//When
		(0, _jsstub2.default)("FOO2");
		//Then
		assert.deepEqual(FOO2, {});
	
		//when
		(0, _jsstub2.default)("FOO3", _jsstub2.default.INSTANCE);
		//Then
		assert.equal(FOO3.constructor, Function);
	});
	QUnit.test("The should_receive is set empty function", function (assert) {
		//Given
		//When
		this.stub.should_receive("test");
		//Then
		assert.equal(STUB.test.constructor, Function);
	
		//Given
		//When
		(0, _jsstub2.default)("STUB2", _jsstub2.default.INSTANCE).should_receive("test");
		//Then
		assert.equal(STUB2.prototype.test.constructor, Function);
	});
	
	QUnit.test("The should_receive is change function when already function.", function (assert) {
		//Given
		var funcObj = { test: function test() {
				return false;
			} };
		//When
		(0, _jsstub2.default)("funcObj").should_receive("test");
		//Then
		assert.equal(funcObj.test(), "");
	});
	
	QUnit.test("Return value of should_receive is StubMethod.", function (assert) {
		//Given
		//When
		var stub_obj = this.stub.should_receive("test");
		//Then
		//The StubMethod is private. so I can't test.
		//Instead, I made a Ducktyping test(?).
		//I believe correct when The return value of should_receive have and_return function.
		// ok(stub_obj instanceof StubMethod);
		assert.equal(stub_obj.and_return.constructor, Function);
	});
	QUnit.test("The and_return is return value when and_return set value.", function (assert) {
		//Given
		//When
		this.stub.should_receive("test").and_return("test");
		//Then
		assert.equal(STUB.test(), "test");
	});
	QUnit.test("The namespace type is well work too.", function (assert) {
		//Given
		//When
		this.stub.should_receive("test").and_return("test");
		//Then
		assert.equal(STUB.test(), "test");
	
		//Given
		//When
		(0, _jsstub2.default)("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
		//Then
		assert.equal(aaa.bbb.ccc.ddd.test(), "test");
	
		//Given
		//When
		(0, _jsstub2.default)("aaaa.bbbb.cccc", _jsstub2.default.INSTANCE).should_receive("test").and_return("test");
		//Then
		assert.equal(new aaaa.bbbb.cccc().test(), "test");
	
		//Given
		global["aaaaa"] = {};
		aaaaa.bbbbb = {};
	
		//When
		(0, _jsstub2.default)("aaaaa.bbbbb").should_receive("test").and_return("test");
		//Then
		assert.equal(aaaaa.bbbbb.test(), "test");
	
		//When
		(0, _jsstub2.default)("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
		//Then
		assert.equal(aaaaa.bbbbb.ccccc.test(), "test");
	});

/***/ }
/******/ ]);
//# sourceMappingURL=jsmocktool.test.js.map