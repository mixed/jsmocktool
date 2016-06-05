var global = window;

class TestDouble{
    static INSTANCE = "instance";
    static OBJECT = "object";

    constructor(name, type){
        this.createTestDouble(name, type);
    }

    createTestDouble(name, type){
        this.returnValue = "_js_testDouble_none";
        this.testDoubleType = type;

        if(typeof name == "string"){
            this.makeEnableObj(name, type);
        }else if(typeof name === "object" || typeof name == "function"){
        	this.testDoubleObj = name;
        }else{
            throw new Error(`Name of ${this.type} is incorrect.The Type only have String or Object or Function.`);
        }
    }

    getTestDouble(){
        if(this.testDoubleType === TestDouble.OBJECT){
            return this.testDoubleObj;
        }else{
            return this.testDoubleObj.prototype;
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
        this.testDoubleObj = returnObj
        if(type === TestDouble.OBJECT && !returnObj){
            this.testDoubleObj = obj[objectName] = {};
        }else if(type === TestDouble.INSTANCE && !returnObj){
            this.testDoubleObj = obj[objectName] = ()=>{};
            this.testDoubleObj.prototype = obj[objectName].prototype = {};
        }
    }
}

export default TestDouble;