
var global = window;

class Stub {
    static INSTANCE = "instance";
    static OBJECT = "object";

    constructor(name, type = "object"){
        this.createStub(name, type);
    }

    createStub(name, type){
        this.returnValue = "_js_stub_none";
        this.stubType = Stub.OBJECT;

        if(typeof name == "string"){
            this.makeEnableObj(name, type);    
            this.stubType = type;
        }else if(typeof name == "object" || typeof name == "function"){
            this.stubObj = name;
        }else{
            throw new Error("Name of Stub is incorrect.Type is String or Object or Function.");
        }
    }    

    getStub(){
        if(this.stubType == Stub.OBJECT){
            return this.stubObj;
        }else{
            return this.stubObj.prototype;
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
        this.stubObj = returnObj
        if(type === Stub.OBJECT && !returnObj){
            this.stubObj = obj[objectName] = {};
        }else if(type === Stub.INSTANCE && !returnObj){
            this.stubObj = obj[objectName] = ()=>{};
            this.stubObj.prototype = obj[objectName].prototype = {};
        }
    }

    should_receive(functionName){
        this.getStub()[functionName] = () => {
            if(this.returnValue != "_js_stub_none"){
                return this.returnValue;
            }
        };
        return new StubMethod(this);
    }


}

class StubMethod{
    constructor(stub){
        this.stub = stub;
    }

    and_return(returnValue){
        this.stub.returnValue = returnValue;
    }
}

function stubWrap(name, type){
    if(!(this instanceof Stub)){
        return new Stub(name,type);
    }else{
        this.createStub(name,type);
    }
};

stubWrap.OBJECT = Stub.OBJECT;
stubWrap.INSTANCE = Stub.INSTANCE;

export default stubWrap;