
/** @class MockMethod */
export default class MockMethod {
	/**
	 * @access private
	 **/
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

	/**
	 * @access private
	 **/
	transformParamToString(obj) {
		return JSON.stringify(obj);
	}

	/**
	 * @access private
	 **/
	setup(obj, methodName) {
		const that = this;
		const target = obj;
		target[methodName] = (...params) => {
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
				for (const [, info] of that.excuteObjs) {
					const arg = info.get('arg');
					if (
						arg && (arg.length === params.length) &&
						!arg.find((v, i) => (v !== params[i] && v !== '_js_mock_anything_param'))
						) {
						return info.get('excute');
					}
				}
			}
		};
	}
	/**
	 * set parameters of should_receive.
	 * If you use `with_param` that `and_xxx` method execute matching param.
	 * @instance
	 * @memberof MockMethod
	 * @param {...anything} params - list up parameters.
	 * @function with_param
	 * @returns {MockMethod}
	 * @example
mock("obj").should_receive("something").with_param(1,2).and_return("1");
// obj.something(1); => not return anything
// obj.something(1, 2); => "1"

// You can use `mock.anything`.
mock("obj").should_receive("something").with_param(1,mock.anything()).and_return("1");
// obj.something(1, 1); => "1"
// obj.something(1, 2); => "1"
// obj.something(1, 3); => "1"
	 **/
	with_param(...params) {
		this.currentParam = this.transformParamToString(params);
		this.excuteObjs.set(this.currentParam, (new Map()).set('arg', params));
		return this;
	}

	/**
	 * @access private
	 **/
	and_template(type, excute) {
		this.excuteObjs
			.get(this.currentParam)
			.set('type', type)
			.set('excute', excute);

		this.currentParam = this.transformParamToString([]);
	}
	/**
	 * set return value when should_receive called.
	 * @instance
	 * @memberof MockMethod
	 * @param {Object} returnVal - return value
	 * @function and_return
	 * @example
mock("obj").should_receive("something").and_return("1");
// obj.something(1); => "1"
// obj.something(1, 2); => "1"
	 **/
	and_return(returnVal) {
		this.and_template('return', returnVal);
	}
	/**
	 * Set execution function when should_receive called.
	 * @instance
	 * @memberof MockMethod
	 * @param {Function} returnFunction - execute function
	 * @function and_function
	 * @example
mock("obj").should_receive("something").and_function(function(){
	return "1";
});
// obj.something(1); => "1"
// obj.something(1, 2); => "1"
	 **/
	and_function(returnFunction) {
		this.and_template('function', returnFunction);
	}
	/**
	 * Set exception error when should_receive called.
	 * @instance
	 * @memberof MockMethod
	 * @param {String} returnException - exception message
	 * @function and_throw
	 * @example
mock("obj").should_receive("something").and_throw("error");
// obj.something(1); => new Error("error")
// obj.something(1, 2); => new Error("error")
	 **/
	and_throw(returnException) {
		this.and_template('exception', returnException);
	}

}
