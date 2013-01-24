/**
 * @author mixed
 */
describe('JSStub에서', {
    '첫 번째 인자는 string,object여야 한다.': function(){
		stub("FOO");
        value_of(FOO).should_be({});
		
		var BAR = {};
		stub(BAR);
        value_of(BAR).should_be(BAR);
    },
	'이미 있는 오브젝트 인경우는 해당 오브젝트를 사용한다.':function(){
		var Obj = {test:function(){}};
		
		stub("Obj");
        value_of(Obj).should_be(Obj);
		
		stub(Obj);
        value_of(Obj).should_be(Obj);
		
	},
    '두 번째 인자는 없거나 "instance","object" 문자여야 한다.': function(){
		stub("FOO2");
		value_of(FOO2).should_be({});
		
		stub("FOO3",Stub.INSTANCE);
		value_of(FOO3.prototype).should_be({});
    },
	'should_receive는 해당 이름으로 함수가 빈 함수로 셋팅 된다.':function(){
		stub("RECEIVE").should_receive("test");
		value_of(typeof RECEIVE.test == "function").should_be_true();
		
		stub("RECEIVE2",Stub.INSTANCE).should_receive("test");
		value_of(typeof RECEIVE2.prototype.test == "function").should_be_true();
	},
	'이미 있는 함수 인경우는 해당 함수를 변경한다.':function(){
		var funcObj = {test:function(){return false;}};
		stub("funcObj").should_receive("test");
		
        value_of(funcObj.test()).should_be("");
	},
	'should_receive의 반환 값은 and_return을 사용할수 있는 object을 반환한다.':function(){
		var stub_obj = stub("RECEIVE3").should_receive("test");
		value_of(stub_obj instanceof StubMethod).should_be_true();
	},
	'and_return은 해당 함수가 실행되면 and_return에 셋팅된 값이 반환 된다.':function(){
		stub("RECEIVE4").should_receive("test").and_return("test");
		value_of(RECEIVE4.test()).should_be("test");
	},
	'namespace를 사용한 경우에도 정상적으로 사용 가능해야 한다.':function(){
		stub("Test").should_receive("test").and_return("test");
		value_of(Test.test()).should_be("test");
		
		stub("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
		value_of(aaa.bbb.ccc.ddd.test()).should_be("test");
		
		stub("aaaa.bbbb.cccc",Stub.INSTANCE).should_receive("test").and_return("test");
		value_of(new aaaa.bbbb.cccc().test()).should_be("test");
		
		window["aaaaa"] = {};
		aaaaa.bbbbb = {};
		
		stub("aaaaa.bbbbb").should_receive("test").and_return("test");
		value_of(aaaaa.bbbbb.test()).should_be("test");
		
		stub("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
		value_of(aaaaa.bbbbb.ccccc.test()).should_be("test");
	}
});

