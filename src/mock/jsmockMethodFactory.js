import MockMethod from './jsmockMethod';

const MockMethodFactory = {
	storage: [
		//      {
		//          current_obj : {}, object
		//          current_functions : {} mock method
		//      }
	],
	createData(obj) {
		const dataObj = { current_obj: obj };
		this.storage.push(dataObj);

		return dataObj;
	},
	createMethod(obj, methodName) {
		const dataObj = this.getData(obj);
		dataObj[methodName] = new MockMethod(obj, methodName);

		return dataObj[methodName];
	},
	getData(obj) {
		for (let i = 0, l = this.storage.length; i < l; i++) {
			if (this.storage[i].current_obj === obj) {
				return this.storage[i];
			}
		}
		return this.createData(obj);
	},
	getMethod(obj, methodName) {
		const dataObj = this.getData(obj);
		if (!dataObj[methodName]) {
			dataObj[methodName] = this.createMethod(obj, methodName);
		}
		return dataObj[methodName];
	},
};

export default MockMethodFactory;
