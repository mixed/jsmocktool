/**
 * @author mixed
 */

 module("jsmock",{
 	"setup":function(){
 		this.stub = stub("STUB");
 	},
 	"teardown":function(){
 		this.stub = undefined;
 		STUB = undefined;
 	}
 });

 test("The first parameter of stub is must be string,object.",function(){
 	//Given, When
	stub("FOO");
	//Then
	deepEqual(FOO,{});

	//Given
	var BAR = {};
	//When
	stub(BAR);
	//Then
	deepEqual(BAR,BAR);
 });

 test("The Stub is only add function when already made object.",function(){
 	//Given
	var Obj = {test:function(){}};
	//When
	stub("Obj");
	//Then
	equal(Obj,Obj);

	//When
	stub(Obj);
	//Then
	equal(Obj,Obj);
 });
 test("The second parameter of stub is must be none, 'instance' or 'object'",function(){
 	//Given
 	//When
	stub("FOO2");
	//Then
	deepEqual(FOO2,{});

	//when
	stub("FOO3",Stub.INSTANCE);
	//Then
	equal(FOO3.constructor,Function);
 });
 test("The should_receive is set empty function",function(){
 	//Given
 	//When
	this.stub.should_receive("test");
	//Then
	equal(STUB.test.constructor,Function);

	//Given
	//When
	stub("STUB2",Stub.INSTANCE).should_receive("test");
	//Then
	equal(STUB2.prototype.test.constructor,Function);
 });

 test("The should_receive is change function when already function.",function  () {
 	//Given
	var funcObj = {test:function(){return false;}};
	//When
	stub("funcObj").should_receive("test");
	//Then
	equal(funcObj.test(),""); 	
 });

 test("Return value of should_receive is StubMethod.",function () {
 	//Given
 	//When
	var stub_obj = this.stub.should_receive("test");
	//Then
	ok(stub_obj instanceof StubMethod);
 });
 test("The and_return is return value when and_return set value.",function () {
 	//Given
 	//When
	this.stub.should_receive("test").and_return("test");
	//Then
	equal(STUB.test(),"test"); 	
 });
 test("The namespace type is well work too.",function(){
 	//Given
 	//When
	this.stub.should_receive("test").and_return("test");
	//Then
	equal(STUB.test(),"test");

	//Given
	//When
	stub("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
	//Then
	equal(aaa.bbb.ccc.ddd.test(),"test");

	//Given
	//When
	stub("aaaa.bbbb.cccc",Stub.INSTANCE).should_receive("test").and_return("test");
	//Then
	equal(new aaaa.bbbb.cccc().test(),"test");

	//Given
	window["aaaaa"] = {};
	aaaaa.bbbbb = {};

	//When
	stub("aaaaa.bbbbb").should_receive("test").and_return("test");
	//Then
	equal(aaaaa.bbbbb.test(),"test");

	//When
	stub("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
	//Then
	equal(aaaaa.bbbbb.ccccc.test(),"test");
 });

