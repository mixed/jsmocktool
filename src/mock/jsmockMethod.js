
class MockMethod {

	constructor(obj, methodName) {
		this.excuteObjs = new Map();
		// {
		//      key:{
		//          arg:[],
		//          type:'function',
		//          excute : function(){}
		//      }
		// };
		this.record = { total: 0, param: {} };
		this.currentParam = this.transformParamToString([]);
		this.excuteObjs.set(this.currentParam, new Map());
		this.setup(obj, methodName);
	}

	transformParamToString(obj) {
		return JSON.stringify(obj);
	}

	setup(obj, methodName) {
		const that = this;
		const target = obj;
		target[methodName] = function addFunc(...params) {
			that.record.total++;
			const argString = that.transformParamToString(params);

			if (that.record.param[argString]) {
				that.record.param[argString] += 1;
			} else {
				that.record.param[argString] = 1;
			}

			const dataObj = that.excuteObjs.get(argString);

			if (dataObj) {
				const type = dataObj.get('type');
				const excute = dataObj.get('excute');
				if (type === 'function') {
					return excute.apply(dataObj, params);
				} else if (type === 'exception') {
					throw excute;
				} else if (type === 'return') {
					return excute;
				}
			} else {
				for (const [, v] of that.excuteObjs) {
					const arg = v.get('arg');
					const excute = v.get('excute');

					if (arg && (arg.length === params.length)) {
						let paramMatch = true;
						for (let j = 0, l = arg.length; j < l; j++) {
							if (arg[j] !== params[j] && arg[j] !== '_js_mock_anything_param') {
								paramMatch = false;
								break;
							}
						}
						if (paramMatch) {
							return excute;
						}
					}
				}
			}
		};
	}

	with_param(...params) {
		this.currentParam = this.transformParamToString(params);
		this.excuteObjs.set(this.currentParam, (new Map()).set('arg', params));
		return this;
	}

	and_template(type, excute) {
		this.excuteObjs
			.get(this.currentParam)
			.set('type', type)
			.set('excute', excute);

		this.currentParam = this.transformParamToString([]);
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