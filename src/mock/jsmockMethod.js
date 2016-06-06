

function argumentsToArray(arg) {
	const returnVal = [];
	if (!!arg.length) {
		for (let i = 0, l = arg.length; i < l; i++) {
			returnVal[i] = arg[i];
		}
	}
	return returnVal;
}

class MockMethod {

	constructor(obj, methodName) {
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

	setup(obj, methodName) {
		const that = this;
		const target = obj;
		target[methodName] = function addFunc(...params) {
			that.record.total++;
			const argString = JSON.stringify(argumentsToArray(params));

			if (that.record.param[argString]) {
				that.record.param[argString] += 1;
			} else {
				that.record.param[argString] = 1;
			}

			const dataObj = that.excuteObjs[argString];

			if (dataObj) {
				if (dataObj.type === 'function') {
					return dataObj.excute.apply(dataObj, argumentsToArray(params));
				} else if (dataObj.type === 'exception') {
					throw dataObj.excute;
				} else if (dataObj.type === 'return') {
					return dataObj.excute;
				}
			} else {
				for (const i in that.excuteObjs) {
					const currentParam = argumentsToArray(params);
					const arg = that.excuteObjs[i].arg;

					if (arg && (arg.length === currentParam.length)) {
						let paramMatch = true;
						for (let j = 0, l = arg.length; j < l; j++) {
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

	with_param(...params) {
		const arg = argumentsToArray(params);
		this.currentParam = JSON.stringify(arg);
		this.excuteObjs[this.currentParam] = { arg };
		return this;
	}

	and_template(type, excute) {
		this.excuteObjs[this.currentParam].type = type;
		this.excuteObjs[this.currentParam].excute = excute;
		this.currentParam = JSON.stringify([]);
	}

	and_return(returnVal) {
		this.and_template('return', returnVal);
	}

	and_function(returnFunction) {
		this.and_template('function', returnFunction);
	}

	and_throw(returnException) {
		this.and_template('exception', returnException);
	}

}

export default MockMethod;
