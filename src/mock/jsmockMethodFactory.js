import MockMethod from './jsmockMethod';

const MockMethodFactory = {
	storage: [
		//      {
		//          current_obj : {}, object
		//          current_functions : {} mock method
		//      }
	],
	createData(obj) {
		const dataObj = (new Map()).set('current_obj', obj);
		this.storage.push(dataObj);

		return dataObj;
	},
	createMethod(obj, methodName) {
		return new MockMethod(obj, methodName);
	},
	getData(obj) {
		for (const value of this.storage) {
			if (value.get('current_obj') === obj) {
				return value;
			}
		}
		return this.createData(obj);
	},
	getMethod(obj, methodName) {
		const dataObj = this.getData(obj);
		let methodObj = dataObj.get(methodName);
		if (!methodObj) {
			methodObj = this.createMethod(obj, methodName);
			dataObj.set(methodName, methodObj);
		}
		return methodObj;
	},
};

export default MockMethodFactory;
