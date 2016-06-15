import MockMethodFactory from './jsmockMethodFactory';
import TestDouble from '../testDouble';

/** @class Mock */
class Mock extends TestDouble {
	/**
	 * @access private
	 **/
	constructor(name, type = 'object') {
		super(name, type);
		this.type = 'Mock';
	}
	/**
	 * should_receive make method in mock.
	 * @memberof Mock
	 * @instance
	 * @param {string} methodName - method name in mock.
	 * @function should_receive
	 * @returns {MockMethod}
	 * @example
mock("obj").should_receive("something");
// obj.something();

mock("Sample",mock.INSTANCE).should_receive("something");
// let sample = new Sample();
// sample.something();

// class Test
// end
// let test = new Test();
mock(test).should_receive("something");
// test.something();

mock(Test,mock.INSTANCE).should_receive("instance");
// let test = new Test();
// test.instance()
	 **/
	should_receive(methodName) {
		return MockMethodFactory.getMethod(this.getTestDouble(), methodName);
	}

	/**
	 * Return specific information called method.
	 * @memberof Mock
	 * @instance
	 * @function verify
	 * @example
mock("obj").should_receive("something");
obj.something();
mock("obj").verify("something"); // {"total" : 1, param : {}}
	 **/
	verify(methodName) {
		const methodInfo = MockMethodFactory.getData(this.getTestDouble()).get(methodName);
		if (methodInfo) {
			if (methodInfo.record.total === 0) {
				throw new Error(`${methodName} isn't called.`);
			} else {
				return methodInfo.record;
			}
		} else {
			throw new Error(`${methodName} isn't method.`);
		}
	}

	/**
	 * Return all information called methods.
	 * @memberof Mock
	 * @instance
	 * @function verify_all
	 * @example
mock("obj").should_receive("something");
mock("obj").should_receive("something2");
obj.something();
obj.something2();

mock("obj").verify_all();
//{
//	"something": {total" : 1, param : {}}
//	"something2": {total" : 1, param : {}}
//}
	 **/
	verify_all() {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		const returnValue = {};

		obj.forEach((v, i) => {
			if (i !== 'current_obj') returnValue[i] = this.verify(i);
		});

		return returnValue;
	}

	/**
	 * Resets specific information called method.
	 * @memberof Mock
	 * @instance
	 * @function reset
	 * @example
mock("obj").should_receive("something");
mock("obj").should_receive("something2");
obj.something();
obj.something2();

mock("obj").verify("something"); // {"total" : 1, param : {}}
mock("obj").verify("something2"); // {"total" : 1, param : {}}

mock("obj").reset("something");
mock("obj").verify("something"); // throw new Error(`something isn't called.`);
mock("obj").verify("something2"); // {"total" : 1, param : {}}
	 **/
	reset(methodName) {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		obj.get(methodName).record = { total: 0, param: {} };
	}

	/**
	 * Resets all information called methods.
	 * @memberof Mock
	 * @instance
	 * @function reset_all
	 * @example
mock("obj").should_receive("something");
mock("obj").should_receive("something2");
obj.something();
obj.something2();
mock("obj").verify("something"); // {"total" : 1, param : {}}
mock("obj").verify("something2"); // {"total" : 1, param : {}}

mock("obj").reset_all();
mock("obj").verify("something"); // throw new Error(`something isn't called.`);
mock("obj").verify("something2"); // throw new Error(`something2 isn't called.`);
	 **/
	reset_all() {
		for (const [key, value] of MockMethodFactory.getData(this.getTestDouble())) {
			if (key !== 'current_obj') {
				value.record = { total: 0, param: {} };
			}
		}
	}


}

/**
 * @desc create mock in global.
 * @param {string|object|function|class} name - Mock object of name, object, function or class.
 * @param {string} type - Mock object of type. - mock.INSTANCE, mock.OBJECT(defalut)
 * @function mock
 * @returns {Mock}
 * @example
// If `name` is string and `global` not found `name` object that mock create object in global.
mock("obj").should_receive("something");
mock("Sample",mock.INSTANCE).should_receive("something");

// If `name` is object that mock don`t create object.
mock(obj).should_receive("something");
mock(zlass).should_receive("something");
 **/
export default function mockWrap(name, type) {
	if (this instanceof Mock) {
		this.createTestDouble(name, type);
	} else {
		return new Mock(name, type);
	}
}

/**
 * object string
 * @name mock.OBJECT
 * @global
 * @example
mock("obj", mock.OBJECT);
 **/
mockWrap.OBJECT = 'object';

/**
 * instance string
 * @name mock.INSTANCE
 * @global
 * @example
mock("obj", mock.INSTANCE);
 **/
mockWrap.INSTANCE = 'instance';

/**
 * `anything` return special string.
 * If you use `anything` in `with_param` that
 * `should_receive` execute method regardless of parameter value.
 * @name mock.anything
 * @global
 * @function anything
 * @returns {String} - '_js_mock_anything_param'
 * @example
mock("obj").should_receive("something").with_param(1,mock.anything()).and_return("1");
 **/
mockWrap.anything = () => '_js_mock_anything_param';
