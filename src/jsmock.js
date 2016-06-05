
var global = window;


class Mock{
    static INSTANCE = "instance";
    static OBJECT = "object";

    constructor(name, type = "object"){
        this.createMock(name, type);
    }

    createMock(name, type){
        this.returnValue = "_js_mock_none";
        this.mockType = Mock.OBJECT;

        if(typeof name=="string"){
            this.makeEnableObj(name, type);
            this.mockType = type;
        }else if(typeof name === "object" || typeof name == "function"){
            this.mockObj = name;
        }else{
            throw new Error("Name of Mock is incorrect.The Type only have String or Object or Function.");
        }
    }

    getMock(){
        if(this.mockType === Mock.OBJECT){
            return this.mockObj;
        }else{
            return this.mockObj.prototype;
        }
    }

    makeEnableObj(name, type){
        let depth = name.split(".");
        let objectName = depth[0];
        var obj = global;
        var returnObj;

        if(depth.length > 1){
            depth.splice(0,depth.length-1).forEach((v, i) => {
                if (typeof obj[v] == "undefined"){
                    obj[v] = {};
                } 
                obj = obj[v];
            });
            objectName = depth[depth.length-1];
        }

        returnObj = obj[objectName];
        this.mockObj = returnObj
        if(type === Mock.OBJECT && !returnObj){
            this.mockObj = obj[objectName] = {};
        }else if(type === Mock.INSTANCE && !returnObj){
            this.mockObj = obj[objectName] = ()=>{};
            this.mockObj.prototype = obj[objectName].prototype = {};
        }
    }

    should_receive( methodName ){
        return MockFactory.getMethod(this.getMock(),methodName);
    }

    reset_all(){
        var obj = MockFactory.getData(this.getMock());
        for(var i in obj){
            if(i != "current_obj"){
                obj[i].record = {"total":0,"param":{}};
            }
        }
    }

    reset( methodName ){
        var obj = MockFactory.getData(this.getMock());
        obj[methodName].record = {"total":0,"param":{}};
    }

    verify( methodName ){
        var obj = MockFactory.getData(this.getMock());
        if( obj[methodName] ){
            if( obj[methodName].record.total === 0 ){
                throw new Error(methodName+" is not called.");
            }else{
                return obj[methodName].record;
            }
        }else{
            throw new Error(methodName+" isn't method.");
        }
    }

    verify_all(){
        var obj = MockFactory.getData(this.getMock());
        var returnValue = {};
        for( var i in obj ){
            if( i != "current_obj" ) returnValue[i] = this.verify(i);
        }
        return returnValue;
    }

}


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
                            if(arg[j] != currentParam[j] && arg[j] != mockWrap.anything()){
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

}


var MockFactory = {
    storage : [
    //      {
    //          current_obj : {}, object
    //          current_functions : {} mock method
    //      }
    ],
    createData : function(obj){
        var dataObj = {current_obj : obj};
        this.storage.push(dataObj);

        return dataObj;
    },
    createMethod : function(obj, methodName){
        var dataObj = this.getData(obj);
        dataObj[methodName] = new MockMethod(obj,methodName);

        return dataObj[methodName];
    },
    getData : function(obj){
        for (var i = 0, l = this.storage.length; i < l; i++) {
            if (this.storage[i].current_obj == obj) {
                return this.storage[i];
            }
        }
        return this.createData(obj);
    },
    getMethod : function(obj, methodName){
        var dataObj = this.getData(obj);
        if(!dataObj[methodName]){
            dataObj[methodName] = this.createMethod(obj,methodName);
        }
        return dataObj[methodName];
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


function mockWrap(name, type){
    if(!(this instanceof Mock)){
        return new Mock(name,type);
    }else{
        this.createMock(name,type);
    }
};

mockWrap.OBJECT = Mock.OBJECT;
mockWrap.INSTANCE = Mock.INSTANCE;
mockWrap.anything = () => "_js_mock_anything_param";

export default mockWrap;


