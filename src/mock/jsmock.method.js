class MockMethod{

    constructor( obj, methodName ){
        
        this.excuteObjs = {
        //      key:{
        //          arg:[],
        //          type:"function",
        //          excute : function(){}
        //      }
        };
        this.record = {"total":0,"param":{}};
        this.currentParam = JSON.stringify([]);
        this.excuteObjs[this.currentParam] = {};
        this.setup(obj, methodName);

    }

    setup(obj, methodName){
        var that = this;
        obj[methodName] = function(){
            that.record.total++;
            var argString = JSON.stringify(argumentsToArray(arguments));

            if(that.record.param[argString]){
                that.record.param[argString] += 1;
            }else{
                that.record.param[argString] = 1;
            }

            var dataObj = that.excuteObjs[argString];

            if(dataObj){
                if(dataObj.type === "function"){
                    return dataObj.excute.apply(dataObj,argumentsToArray(arguments));
                }else if(dataObj.type === "exception"){
                    throw dataObj.excute;
                }else if(dataObj.type === "return"){
                    return dataObj.excute;
                }
            }else{
                for(var i in that.excuteObjs){
                    var  currentParam = argumentsToArray(arguments);
                    var arg = that.excuteObjs[i].arg;

                    if(arg&&(arg.length === currentParam.length)){
                        var paramMatch = true;
                        for(var j = 0 , l = arg.length; j < l ; j++){
                            if(arg[j] != currentParam[j] && arg[j] != "_js_mock_anything_param"){
                                paramMatch = false;
                                break;
                            }
                        }
                        if(paramMatch){
                            return that.excuteObjs[i].excute;
                        }
                    }
                }
            }
        };

    }

    with_param(){
        var arg = argumentsToArray(arguments);
        this.currentParam = JSON.stringify(arg);
        this.excuteObjs[this.currentParam] = {
            arg : arg
        };

        return this;
    }

    _and_template( type, excute){
        this.excuteObjs[this.currentParam].type = type;
        this.excuteObjs[this.currentParam].excute = excute;
        this.currentParam = JSON.stringify([]);
    }

    and_return( returnVal ){
        this._and_template("return", returnVal);
    }

    and_function( returnFunction ){
        this._and_template("function", returnFunction);
    }

    and_throw( returnException ){
        this._and_template("exception", returnException);
    }

};

function argumentsToArray(arg){
    var returnVal = [];
    if(!!arg.length){
        for(var i = 0 , l = arg.length; i < l; i++){
            returnVal[i] = arg[i];
        }
    }
    return returnVal;
}

export default MockMethod;