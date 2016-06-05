import StubMethod from './jsstubMethod';
import TestDouble from '../testDouble';

var global = window;

class Stub extends TestDouble{

    constructor(name, type = "object"){
        super(name, type);
        this.type = "Stub";
        global.console&&console.warn&&console.warn("[WARN] : Deprecated Stub. You should be change to Mock.");
    }

    should_receive(functionName){
        this.getTestDouble()[functionName] = () => {
            if(this.returnValue != "_js_stub_none"){
                return this.returnValue;
            }
        };
        return new StubMethod(this);
    }

}

function stubWrap(name, type){
    if(!(this instanceof Stub)){
        return new Stub(name,type);
    }else{
        this.createTestDouble(name,type);
    }
};

stubWrap.OBJECT = TestDouble.OBJECT;
stubWrap.INSTANCE = TestDouble.INSTANCE;

export default stubWrap;