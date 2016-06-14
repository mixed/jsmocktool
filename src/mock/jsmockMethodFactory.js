import MockMethod from './jsmockMethod';

export default {
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
		const data = this.storage.find(value => value.get('current_obj') === obj);
		return data || this.createData(obj);
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
