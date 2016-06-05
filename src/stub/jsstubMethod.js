class StubMethod{
    constructor(stub){
        this.stub = stub;
    }

    and_return(returnValue){
        this.stub.returnValue = returnValue;
    }
}

export default StubMethod;