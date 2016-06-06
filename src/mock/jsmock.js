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
		const obj = MockMethodFactory.getData(this.getTestDouble());
		for (const i in obj) {
			if (i !== 'current_obj') {
				obj[i].record = { total: 0, param: {} };
			}
		}
	}

	reset(methodName) {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		obj[methodName].record = { total: 0, param: {} };
	}

	verify(methodName) {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		if (obj[methodName]) {
			if (obj[methodName].record.total === 0) {
				throw new Error(`${methodName} isn't called.`);
			} else {
				return obj[methodName].record;
			}
		} else {
			throw new Error(`${methodName} isn't method.`);
		}
	}

	verify_all() {
		const obj = MockMethodFactory.getData(this.getTestDouble());
		const returnValue = {};
		for (const i in obj) {
			if (i !== 'current_obj') returnValue[i] = this.verify(i);
		}
		return returnValue;
	}

}

function mockWrap(name, type) {
	if (this instanceof Mock) {
		this.createTestDouble(name, type);
	} else {
		return new Mock(name, type);
	}
}

mockWrap.OBJECT = 'object';
mockWrap.INSTANCE = 'instance';
mockWrap.anything = () => '_js_mock_anything_param';

export default mockWrap;
