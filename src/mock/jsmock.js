import MockMethodFactory from './jsmockMethodFactory';
import TestDouble from '../testDouble';

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

	reset_all() {
		for (const [key, value] of MockMethodFactory.getData(this.getTestDouble())) {
			if (key !== 'current_obj') {
				value.record = { total: 0, param: {} };
			}
		}
	}

	reset(methodName) {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		obj.get(methodName).record = { total: 0, param: {} };
	}

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

	verify_all() {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		const returnValue = {};

		obj.forEach((v, i) => {
			if (i !== 'current_obj') returnValue[i] = this.verify(i);
		});

		return returnValue;
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

mockWrap.OBJECT = 'object';
mockWrap.INSTANCE = 'instance';
/**
 * `anything` return special string. 
 * If you use `anything` in `with_param` that `should_receive` execute method regardless of parameter value. 
 * @function anything
 * @returns {String} - '_js_mock_anything_param'
 **/
mockWrap.anything = () => '_js_mock_anything_param';
