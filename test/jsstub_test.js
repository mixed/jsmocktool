/**
 * @author mixed
 */
 (function(){
 	var global = this;
	if(typeof stub === "undefined"){
		var stub = require("../src/jsstub");
	}
	 QUnit.module("jsstub",{
	 	"beforeEach":function(){
	 		this.stub = stub("STUB");
	 	},
	 	"afterEach":function(){
	 		this.stub = undefined;
	 		STUB = undefined;
	 	}
	 });

	 QUnit.test("The first parameter of stub is must be string,object.",function(assert){
	 	//Given, When
		stub("FOO");
		//Then
		assert.deepEqual(FOO,{});

		//Given
		var BAR = {};
		//When
		stub(BAR);
		//Then
		assert.deepEqual(BAR,BAR);
	 });

	 QUnit.test("The Stub is only add function when already made object.",function(assert){
	 	//Given
		var Obj = {test:function(){}};
		//When
		stub("Obj");
		//Then
		assert.equal(Obj,Obj);

		//When
		stub(Obj);
		//Then
		assert.equal(Obj,Obj);
	 });
	 QUnit.test("The second parameter of stub is must be none, 'instance' or 'object'",function(assert){
	 	//Given
	 	//When
		stub("FOO2");
		//Then
		assert.deepEqual(FOO2,{});

		//when
		stub("FOO3",stub.INSTANCE);
		//Then
		assert.equal(FOO3.constructor,Function);
	 });
	 QUnit.test("The should_receive is set empty function",function(assert){
	 	//Given
	 	//When
		this.stub.should_receive("test");
		//Then
		assert.equal(STUB.test.constructor,Function);

		//Given
		//When
		stub("STUB2",stub.INSTANCE).should_receive("test");
		//Then
		assert.equal(STUB2.prototype.test.constructor,Function);
	 });

	 QUnit.test("The should_receive is change function when already function.",function  (assert) {
	 	//Given
		var funcObj = {test:function(){return false;}};
		//When
		stub("funcObj").should_receive("test");
		//Then
		assert.equal(funcObj.test(),""); 	
	 });

	 QUnit.test("Return value of should_receive is StubMethod.",function (assert) {
	 	//Given
	 	//When
		var stub_obj = this.stub.should_receive("test");
		//Then
		//The StubMethod is private. so I can't test.
		//Instead, I made a Ducktyping test(?).
		//I believe correct when The return value of should_receive have and_return function.
		// ok(stub_obj instanceof StubMethod);
		assert.equal(stub_obj.and_return.constructor,Function);
	 });
	 QUnit.test("The and_return is return value when and_return set value.",function (assert) {
	 	//Given
	 	//When
		this.stub.should_receive("test").and_return("test");
		//Then
		assert.equal(STUB.test(),"test"); 	
	 });
	 QUnit.test("The namespace type is well work too.",function(assert){
	 	//Given
	 	//When
		this.stub.should_receive("test").and_return("test");
		//Then
		assert.equal(STUB.test(),"test");

		//Given
		//When
		stub("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
		//Then
		assert.equal(aaa.bbb.ccc.ddd.test(),"test");

		//Given
		//When
		stub("aaaa.bbbb.cccc",stub.INSTANCE).should_receive("test").and_return("test");
		//Then
		assert.equal(new aaaa.bbbb.cccc().test(),"test");

		//Given
		global["aaaaa"] = {};
		aaaaa.bbbbb = {};

		//When
		stub("aaaaa.bbbbb").should_receive("test").and_return("test");
		//Then
		assert.equal(aaaaa.bbbbb.test(),"test");

		//When
		stub("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
		//Then
		assert.equal(aaaaa.bbbbb.ccccc.test(),"test");
	 });
 })();
 

