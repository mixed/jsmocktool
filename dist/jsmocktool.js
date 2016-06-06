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
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mock = exports.stub = undefined;
	
	var _jsstub = __webpack_require__(2);
	
	var _jsstub2 = _interopRequireDefault(_jsstub);
	
	var _jsmock = __webpack_require__(5);
	
	var _jsmock2 = _interopRequireDefault(_jsmock);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.stub = _jsstub2.default;
	exports.mock = _jsmock2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jsstubMethod = __webpack_require__(3);
	
	var _jsstubMethod2 = _interopRequireDefault(_jsstubMethod);
	
	var _testDouble = __webpack_require__(4);
	
	var _testDouble2 = _interopRequireDefault(_testDouble);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var global = window;
	
	function warn(msg) {
		if (global.console && console.warn) {
			console.warn(msg);
		}
	}
	
	var Stub = function (_TestDouble) {
		_inherits(Stub, _TestDouble);
	
		function Stub(name) {
			var type = arguments.length <= 1 || arguments[1] === undefined ? 'object' : arguments[1];
	
			_classCallCheck(this, Stub);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Stub).call(this, name, type));
	
			_this.type = 'Stub';
			warn('[WARN] : Deprecated Stub. You should be change to Mock.');
			return _this;
		}
	
		_createClass(Stub, [{
			key: 'should_receive',
			value: function should_receive(functionName) {
				var _this2 = this;
	
				this.getTestDouble()[functionName] = function () {
					if (_this2.returnValue !== '_js_stub_none') {
						return _this2.returnValue;
					}
				};
				return new _jsstubMethod2.default(this);
			}
		}]);
	
		return Stub;
	}(_testDouble2.default);
	
	function stubWrap(name, type) {
		if (this instanceof Stub) {
			this.createTestDouble(name, type);
		} else {
			return new Stub(name, type);
		}
	}
	
	stubWrap.OBJECT = 'object';
	stubWrap.INSTANCE = 'instance';
	
	exports.default = stubWrap;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	exports.default = StubMethod;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var global = window;
	
	var TestDouble = function () {
		function TestDouble(name, type) {
			_classCallCheck(this, TestDouble);
	
			this.createTestDouble(name, type);
		}
	
		_createClass(TestDouble, [{
			key: 'createTestDouble',
			value: function createTestDouble(name, type) {
				this.returnValue = '_js_testDouble_none';
				this.testDoubleType = type;
	
				if (typeof name === 'string') {
					this.makeEnableObj(name, type);
				} else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' || typeof name === 'function') {
					this.testDoubleObj = name;
				} else {
					throw new Error('Name of ' + this.type + ' is incorrect.\n\t\t\tThe Type only have String or Object or Function.');
				}
			}
		}, {
			key: 'getTestDouble',
			value: function getTestDouble() {
				if (this.testDoubleType === 'object') {
					return this.testDoubleObj;
				}
				return this.testDoubleObj.prototype;
			}
		}, {
			key: 'makeEnableObj',
			value: function makeEnableObj(name, type) {
				var depth = name.split('.');
				var objectName = depth[0];
				var obj = global;
				if (depth.length > 1) {
					depth.splice(0, depth.length - 1).forEach(function (v) {
						if (typeof obj[v] === 'undefined') {
							obj[v] = {};
						}
						obj = obj[v];
					});
					objectName = depth[depth.length - 1];
				}
	
				var returnObj = obj[objectName];
				this.testDoubleObj = returnObj;
				if (type === 'object' && !returnObj) {
					this.testDoubleObj = obj[objectName] = {};
				} else if (type === 'instance' && !returnObj) {
					this.testDoubleObj = obj[objectName] = function () {};
					this.testDoubleObj.prototype = obj[objectName].prototype = {};
				}
			}
		}]);
	
		return TestDouble;
	}();
	
	exports.default = TestDouble;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jsmockMethodFactory = __webpack_require__(6);
	
	var _jsmockMethodFactory2 = _interopRequireDefault(_jsmockMethodFactory);
	
	var _testDouble = __webpack_require__(4);
	
	var _testDouble2 = _interopRequireDefault(_testDouble);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Mock = function (_TestDouble) {
		_inherits(Mock, _TestDouble);
	
		function Mock(name) {
			var type = arguments.length <= 1 || arguments[1] === undefined ? 'object' : arguments[1];
	
			_classCallCheck(this, Mock);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Mock).call(this, name, type));
	
			_this.type = 'Mock';
			return _this;
		}
	
		_createClass(Mock, [{
			key: 'should_receive',
			value: function should_receive(methodName) {
				return _jsmockMethodFactory2.default.getMethod(this.getTestDouble(), methodName);
			}
		}, {
			key: 'reset_all',
			value: function reset_all() {
				var obj = _jsmockMethodFactory2.default.getData(this.getTestDouble());
				for (var i in obj) {
					if (i !== 'current_obj') {
						obj[i].record = { total: 0, param: {} };
					}
				}
			}
		}, {
			key: 'reset',
			value: function reset(methodName) {
				var obj = _jsmockMethodFactory2.default.getData(this.getTestDouble());
				obj[methodName].record = { total: 0, param: {} };
			}
		}, {
			key: 'verify',
			value: function verify(methodName) {
				var obj = _jsmockMethodFactory2.default.getData(this.getTestDouble());
				if (obj[methodName]) {
					if (obj[methodName].record.total === 0) {
						throw new Error(methodName + ' isn\'t called.');
					} else {
						return obj[methodName].record;
					}
				} else {
					throw new Error(methodName + ' isn\'t method.');
				}
			}
		}, {
			key: 'verify_all',
			value: function verify_all() {
				var obj = _jsmockMethodFactory2.default.getData(this.getTestDouble());
				var returnValue = {};
				for (var i in obj) {
					if (i !== 'current_obj') returnValue[i] = this.verify(i);
				}
				return returnValue;
			}
		}]);
	
		return Mock;
	}(_testDouble2.default);
	
	function mockWrap(name, type) {
		if (this instanceof Mock) {
			this.createTestDouble(name, type);
		} else {
			return new Mock(name, type);
		}
	}
	
	mockWrap.OBJECT = 'object';
	mockWrap.INSTANCE = 'instance';
	mockWrap.anything = function () {
		return '_js_mock_anything_param';
	};
	
	exports.default = mockWrap;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jsmockMethod = __webpack_require__(7);
	
	var _jsmockMethod2 = _interopRequireDefault(_jsmockMethod);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MockMethodFactory = {
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
			dataObj[methodName] = new _jsmockMethod2.default(obj, methodName);
	
			return dataObj[methodName];
		},
		getData: function getData(obj) {
			for (var i = 0, l = this.storage.length; i < l; i++) {
				if (this.storage[i].current_obj === obj) {
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
	
	exports.default = MockMethodFactory;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function argumentsToArray(arg) {
		var returnVal = [];
		if (!!arg.length) {
			for (var i = 0, l = arg.length; i < l; i++) {
				returnVal[i] = arg[i];
			}
		}
		return returnVal;
	}
	
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
			this.record = { total: 0, param: {} };
			this.currentParam = JSON.stringify([]);
			this.excuteObjs[this.currentParam] = {};
			this.setup(obj, methodName);
		}
	
		_createClass(MockMethod, [{
			key: 'setup',
			value: function setup(obj, methodName) {
				var that = this;
				var target = obj;
				target[methodName] = function addFunc() {
					that.record.total++;
	
					for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
						params[_key] = arguments[_key];
					}
	
					var argString = JSON.stringify(argumentsToArray(params));
	
					if (that.record.param[argString]) {
						that.record.param[argString] += 1;
					} else {
						that.record.param[argString] = 1;
					}
	
					var dataObj = that.excuteObjs[argString];
	
					if (dataObj) {
						if (dataObj.type === 'function') {
							return dataObj.excute.apply(dataObj, argumentsToArray(params));
						} else if (dataObj.type === 'exception') {
							throw dataObj.excute;
						} else if (dataObj.type === 'return') {
							return dataObj.excute;
						}
					} else {
						for (var i in that.excuteObjs) {
							var currentParam = argumentsToArray(params);
							var arg = that.excuteObjs[i].arg;
	
							if (arg && arg.length === currentParam.length) {
								var paramMatch = true;
								for (var j = 0, l = arg.length; j < l; j++) {
									if (arg[j] !== currentParam[j] && arg[j] !== '_js_mock_anything_param') {
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
			key: 'with_param',
			value: function with_param() {
				for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					params[_key2] = arguments[_key2];
				}
	
				var arg = argumentsToArray(params);
				this.currentParam = JSON.stringify(arg);
				this.excuteObjs[this.currentParam] = { arg: arg };
				return this;
			}
		}, {
			key: 'and_template',
			value: function and_template(type, excute) {
				this.excuteObjs[this.currentParam].type = type;
				this.excuteObjs[this.currentParam].excute = excute;
				this.currentParam = JSON.stringify([]);
			}
		}, {
			key: 'and_return',
			value: function and_return(returnVal) {
				this.and_template('return', returnVal);
			}
		}, {
			key: 'and_function',
			value: function and_function(returnFunction) {
				this.and_template('function', returnFunction);
			}
		}, {
			key: 'and_throw',
			value: function and_throw(returnException) {
				this.and_template('exception', returnException);
			}
		}]);
	
		return MockMethod;
	}();
	
	exports.default = MockMethod;

/***/ }
/******/ ]);
//# sourceMappingURL=jsmocktool.js.map