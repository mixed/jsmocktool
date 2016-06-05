import MockMethod from './jsmock.method';

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

export default MockFactory;