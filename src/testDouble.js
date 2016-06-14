import global from './global';

export default class TestDouble {
	constructor(name, type) {
		this.createTestDouble(name, type);
	}

	createTestDouble(name, type) {
		this.returnValue = '_js_testDouble_none';
		this.testDoubleType = type;

		if (typeof name === 'string') {
			this.makeEnableObj(name, type);
		} else if (typeof name === 'object' || typeof name === 'function') {
			this.testDoubleObj = name;
		} else {
			throw new Error(
			`Name of ${this.type} is incorrect.
			The Type only have String or Object or Function.`);
		}
	}

	getTestDouble() {
		if (this.testDoubleType === 'object') {
			return this.testDoubleObj;
		}
		return this.testDoubleObj.prototype;
	}

	makeEnableObj(name, type) {
		const depth = name.split('.');
		let objectName = depth[0];
		let obj = global;
		if (depth.length > 1) {
			depth.splice(0, depth.length - 1).forEach((v) => {
				if (typeof obj[v] === 'undefined') {
					obj[v] = {};
				}
				obj = obj[v];
			});
			objectName = depth[depth.length - 1];
		}

		const returnObj = obj[objectName];
		this.testDoubleObj = returnObj;
		if (type === 'object' && !returnObj) {
			this.testDoubleObj = obj[objectName] = {};
		} else if (type === 'instance' && !returnObj) {
			this.testDoubleObj = obj[objectName] = () => {};
			this.testDoubleObj.prototype = obj[objectName].prototype = {};
		}
	}
}
