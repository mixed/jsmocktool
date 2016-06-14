import MockMethodFactory from './jsmockMethodFactory';
import TestDouble from '../testDouble';

class Mock extends TestDouble {
	constructor(name, type = 'object') {
		super(name, type);
		this.type = 'Mock';
	}

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

export default function mockWrap(name, type) {
	if (this instanceof Mock) {
		this.createTestDouble(name, type);
	} else {
		return new Mock(name, type);
	}
}

mockWrap.OBJECT = 'object';
mockWrap.INSTANCE = 'instance';
mockWrap.anything = () => '_js_mock_anything_param';
