import MockMethodFactory from './jsmockMethodFactory';
import TestDouble from '../testDouble';

class Mock extends TestDouble{

    constructor(name, type = "object"){
        super(name, type);
        this.type = "Mock";
    }

    should_receive( methodName ){
        return MockMethodFactory.getMethod(this.getTestDouble(),methodName);
    }

    reset_all(){
        var obj = MockMethodFactory.getData(this.getTestDouble());
        for(var i in obj){
            if(i != "current_obj"){
                obj[i].record = {"total":0,"param":{}};
            }
        }
    }

    reset( methodName ){
        var obj = MockMethodFactory.getData(this.getTestDouble());
        obj[methodName].record = {"total":0,"param":{}};
    }

    verify( methodName ){
        var obj = MockMethodFactory.getData(this.getTestDouble());
        if( obj[methodName] ){
            if( obj[methodName].record.total === 0 ){
                throw new Error(`${methodName} isn't called.`);
            }else{
                return obj[methodName].record;
            }
        }else{
            throw new Error(`${methodName} isn't method.`);
        }
    }

    verify_all(){
        var obj = MockMethodFactory.getData(this.getTestDouble());
        var returnValue = {};
        for( var i in obj ){
            if( i != "current_obj" ) returnValue[i] = this.verify(i);
        }
        return returnValue;
    }

}

function mockWrap(name, type){
    if(!(this instanceof Mock)){
        return new Mock(name,type);
    }else{
        this.createTestDouble(name,type);
    }
};

mockWrap.OBJECT = TestDouble.OBJECT;
mockWrap.INSTANCE = TestDouble.INSTANCE;
mockWrap.anything = () => "_js_mock_anything_param";

export default mockWrap;


