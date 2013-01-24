/**
 * @author mixed
 */


module("jsmock",{
  "setup":function(){
    document.getElementById("mock_test1").value = "";
    document.getElementById("mock_test2").value = "";
    document.getElementById("mock_test3").value = "";
  },
  "teardown":function(){
    RECEIVE4 = undefined;
  }
});

test("Must be first prameter is string or object",function(){
  //Given
  //When
  mock("FOO");
  //Then
  deepEqual(FOO,{});
  
  //Given
  var BAR = {};
  //When
  mock(BAR);
  //Then
  deepEqual(BAR,BAR);
});

test("Must be second parameter is 'instance','object',none.",function(){
  //Given
  //When
  mock("FOO2");
  //Then
  deepEqual(FOO2,{});

  //Given
  //When
  mock("FOO3",Mock.INSTANCE);
  //Then
  equal(FOO3.constructor,Function);
});

test("The should_receive is set method of mock Object.",function(){
  //Given
  var receiveMock = mock("RECEIVE");
  //Then
  receiveMock.should_receive("test");
  //When
  equal(RECEIVE.test.constructor,Function);

  //Given
  var receiveMock2 = mock("RECEIVE2",Mock.INSTANCE);
  //Then
  receiveMock2.should_receive("test");
  //When
  equal(RECEIVE2.prototype.test.constructor,Function);
});

test("Return value of should_receive is MockMethod.",function(){
  //Given
  var receive = mock("RECEIVE3");
  //When
  var mock_method = receive.should_receive("test");
  //Then
  ok(mock_method instanceof MockMethod);
});

test("The and_return is  setting value to return.",function(){
  //Given
  var receive = mock("RECEIVE4");
  //When
  receive.should_receive("test").and_return(3);
  //Then
  equal(RECEIVE4.test(),3);
});

test("If use with_param, mock will return value when same param.",function(){
  //Given
  var receive = mock("RECEIVE4");
  //When
  receive.should_receive("test").with_param(1,2).and_return(4);
  //Then
  equal(RECEIVE4.test(1,2),4);  
});

test("Must be work mock before set parameter when add new parameter.",function(){
  //Given
  var receive = mock("RECEIVE4");
  //When
  receive.should_receive("test").and_return(3);
  receive.should_receive("test").with_param(1,2).and_return(4);
  receive.should_receive("test").with_param(1,2,3).and_return(5);
  //Then
  equal(RECEIVE4.test(),3);
  equal(RECEIVE4.test(1,2),4);
  equal(RECEIVE4.test(1,2,3),5);
});

//   	'같은 함수에 파라메터만 변경되었을때에도 기존의 기능은 정상 작동해야 한다.':function(){
//   		mock("RECEIVE4").should_receive("test").with_param(1,2,3).and_return(5);
  		
//   		value_of(RECEIVE4.test()).should_be(3);
//   		value_of(RECEIVE4.test(1,2)).should_be(4);
//   		value_of(RECEIVE4.test(1,2,3)).should_be(5);
//   	},
//   	'같은 함수, 같은 파라메터이고 return만 변경되었을때에 새로 적용된 return값이 리턴 되어야 한다.':function(){
//   		value_of(RECEIVE4.test(1,2,3)).should_be(5);
  		
//   		mock("RECEIVE4").should_receive("test").with_param(1,2,3).and_return(6);
  		
//   		value_of(RECEIVE4.test()).should_be(3);
//   		value_of(RECEIVE4.test(1,2)).should_be(4);
//   		value_of(RECEIVE4.test(1,2,3)).should_be(6);
//   	},
//   	'and_throw은 정상적으로 해당 셋팅된 예외을 던져야 한다.':function(){
//   		mock("RECEIVE4").should_receive("test2").and_throw(new Error("and_throw test."));
//   		var error_message = "";
//   		try{
//   			RECEIVE4.test2();
//   		}catch(e){
//   			error_message = e.message;
//   		}
//   		value_of(error_message).should_be("and_throw test.");
  		
//   	},
//   	'with_param 을 설정한 경우에는 with_param에 맞는 경우만 해당 셋팅된 예외을 던져야 한다.':function(){
//   		mock("RECEIVE4").should_receive("test2").with_param(1,2).and_throw(new Error("and_throw test2."));
  		
//   		var error_message = "";
//   		try{
//   			RECEIVE4.test2(1,2);
//   		}catch(e){
//   			error_message = e.message;
//   		}
  		
//   		value_of(error_message).should_be("and_throw test2.");
//   	}
//   	,
//   	'같은 함수에 파라메터만 변경되었을때에도 기존의 기능(and_throw)은 정상 작동해야 한다.':function(){
  		
//   		mock("RECEIVE4").should_receive("test2").with_param(1,2,3).and_throw(new Error("and_throw test3."));
  		
//   		var error_message = "";
//   		try{
//   			RECEIVE4.test2();
//   		}catch(e){
//   			error_message = e.message;
//   		}
//   		value_of(error_message).should_be("and_throw test.");
  		
//   		try{
//   			RECEIVE4.test2(1,2);
//   		}catch(e){
//   			error_message = e.message;
//   		}
//   		value_of(error_message).should_be("and_throw test2.");
  		
//   		try{
//   			RECEIVE4.test2(1,2,3);
//   		}catch(e){
//   			error_message = e.message;
//   		}
//   		value_of(error_message).should_be("and_throw test3.");
  		
//   	},
//   	'같은 함수, 같은 파라메터이고 thorw만 변경되었을때에 새로 셋팅된 예외을 던져야 한다.':function(){
//   		var error_message = "";
  		
//   		try{
//   			RECEIVE4.test2(1,2,3);
//   		}catch(e){
//   			error_message = e.message;
//   		}
  		
//   		value_of(error_message).should_be("and_throw test3.");
  		
//   		mock("RECEIVE4").should_receive("test2").with_param(1,2,3).and_throw(new Error("and_throw test4."));
  		
//   		try{
//   			RECEIVE4.test2(1,2,3);
//   		}catch(e){
//   			error_message = e.message;
//   		}
//   		value_of(error_message).should_be("and_throw test4.");
//   	},
//   	'and_function은 정상적으로 해당 셋팅된 함수를 실행 시켜야 한다.':function(){
  		
//   		value_of(document.getElementById("mock_test1").value).should_be("");
//   		mock("RECEIVE4").should_receive("test3").and_function(function(){
//   			document.getElementById("mock_test1").value="first";
//   		});
//   		RECEIVE4.test3();
//   		value_of(document.getElementById("mock_test1").value).should_be("first");
  		
//   	},
//   	'with_param 을 설정한 경우에는 with_param에 맞는 경우만 해당 함수가 실행된다.':function(){
//   		value_of(document.getElementById("mock_test2").value).should_be("");
  		
//   		mock("RECEIVE4").should_receive("test3").with_param(1,2).and_function(function(){
//   			document.getElementById("mock_test2").value="second";
//   		});
//   		RECEIVE4.test3(1,2);
  		
//   		value_of(document.getElementById("mock_test2").value).should_be("second");
//   	},
//   	'같은 함수에 파라메터만 변경되었을때에도 기존의 기능은 정상 작동해야 한다3.':function(){
  		
//   		value_of(document.getElementById("mock_test3").value).should_be("");
  		
//   		mock("RECEIVE4").should_receive("test3").with_param(1,2,3).and_function(function(){
//   			document.getElementById("mock_test3").value="third";
//   		});
//   		RECEIVE4.test3(1,2,3);
  		
//   		value_of(document.getElementById("mock_test3").value).should_be("third");
  		
//   		value_of(document.getElementById("mock_test1").value).should_be("");
//   		RECEIVE4.test3();
//   		value_of(document.getElementById("mock_test1").value).should_be("first");
  		
//   		value_of(document.getElementById("mock_test2").value).should_be("");
//   		RECEIVE4.test3(1,2);
//   		value_of(document.getElementById("mock_test2").value).should_be("second");
//   	},
//   	'같은 함수, 같은 파라메터이고 and_function만 변경되었을때에 새로 적용된 함수가 실행되어야 한다.':function(){
  		
//   		RECEIVE4.test3(1,2,3);
//   		value_of(document.getElementById("mock_test3").value).should_be("third");
  		
//   		mock("RECEIVE4").should_receive("test3").with_param(1,2,3).and_function(function(){
//   			document.getElementById("mock_test3").value="third2";
//   		});
  		
//   		RECEIVE4.test3(1,2,3);
//   		value_of(document.getElementById("mock_test3").value).should_be("third2");
  		
//   	},
//   	'instance 타입도 정상 작동 되어야 한다.':function(){
//   		mock("MockInstance",Mock.INSTANCE).should_receive("test").with_param(1).and_return("1");
//   		mock("MockInstance",Mock.INSTANCE).should_receive("test").with_param(2).and_throw(new Error("test"));
//   		mock("MockInstance",Mock.INSTANCE).should_receive("test").with_param(3).and_function(function(){
//   			document.getElementById("mock_test1").value="test";
//   		});
  		
//   		var mockInstance = new MockInstance();
  		
//   		value_of(mockInstance.test(1)).should_be("1");
  		
//   		var errormessage = ""; 
//   		try{
//   			mockInstance.test(2);
//   		}catch(e){
//   			errormessage = e.message;
//   		}
//   		value_of(errormessage).should_be("test");
  		
//   		value_of(document.getElementById("mock_test1").value).should_be("");
//   		mockInstance.test(3);
//   		value_of(document.getElementById("mock_test1").value).should_be("test");
  		
  		
  		
//   	},
//   	'일반 함수도 정상 작동 해야 한다.':function(){
//   		mock(window).should_receive("commonfunc").with_param(1).and_return("1");
//   		mock(window).should_receive("commonfunc").with_param(2).and_throw(new Error("test2"));
//   		mock(window).should_receive("commonfunc").with_param(3).and_function(function(){
//   			document.getElementById("mock_test1").value="commonfunc";
//   		});
  		
  		
//   		value_of(commonfunc(1)).should_be("1");
  		
//   		var errormessage = ""; 
//   		try{
//   			commonfunc(2);
//   		}catch(e){
//   			errormessage = e.message;
//   		}
//   		value_of(errormessage).should_be("test2");
  		
//   		value_of(document.getElementById("mock_test1").value).should_be("");
//   		commonfunc(3);
//   		value_of(document.getElementById("mock_test1").value).should_be("commonfunc");
//   	},
//   	'param에 anything이 들어가면 해당 파라메터에는 어떤 것이 와도 상관 없이 호출되어야 한다.':function(){
//   		mock("Foo").should_receive("test").with_param(1,2).and_return("1");
//   		mock("Foo").should_receive("test").with_param(1,2,Mock.anything()).and_return("2");
//   		mock("Foo").should_receive("test").with_param(1,2,Mock.anything(),Mock.anything()).and_return("3");
  		
//   		value_of(Foo.test(1,2)).should_be("1");
//   		value_of(Foo.test(1,2,3)).should_be("2");
//   		value_of(Foo.test(1,2,1)).should_be("2");
//   		value_of(Foo.test(1,2,4)).should_be("2");
//   		value_of(Foo.test(1,2,4,5)).should_be("3");
//   		value_of(Foo.test(1,2,4,6)).should_be("3");
//   	},
//   	'param에 anything이 들어간 파라메터에서 다시 설정한 경우에 다시 설정한 값으로 반환 해야 한다.':function(){
//   		mock("Foo").should_receive("test").with_param("5","6",Mock.anything()).and_return("5");
//   		value_of(Foo.test("5","6","3")).should_be("5");
  		
//   		mock("Foo").should_receive("test").with_param("5","6",Mock.anything()).and_return("6");
//   		value_of(Foo.test("5","6","3")).should_be("6");
  		
//   	},
//   	'namespace를 사용한 경우에도 정상적으로 사용 가능해야 한다.':function(){
//   		mock("Test").should_receive("test").and_return("test");
//   		value_of(Test.test()).should_be("test");
  		
//   		mock("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
//   		value_of(aaa.bbb.ccc.ddd.test()).should_be("test");
  		
//   		mock("aaaa.bbbb.cccc",Mock.INSTANCE).should_receive("test").and_return("test");
//   		value_of(new aaaa.bbbb.cccc().test()).should_be("test");
  		
//   		window["aaaaa"] = {};
//   		aaaaa.bbbbb = {};
  		
//   		mock("aaaaa.bbbbb").should_receive("test").and_return("test");
//   		value_of(aaaaa.bbbbb.test()).should_be("test");
  		
//   		mock("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
//   		value_of(aaaaa.bbbbb.ccccc.test()).should_be("test");
//   	},
//   	'namespace를 사용한 경우에도 param도 정상 작동 되어야 한다.':function(){
  		
//   		mock("param.test").should_receive("commonfunc").with_param(1).and_return("1");
//   		mock("param.test").should_receive("commonfunc").with_param(2).and_throw(new Error("test2"));
//   		mock("param.test").should_receive("commonfunc").with_param(3).and_function(function(){
//   			document.getElementById("mock_test1").value="commonfunc";
//   		});
  		
  		
//   		value_of(param.test.commonfunc(1)).should_be("1");
  		
//   		var errormessage = ""; 
//   		try{
//   			param.test.commonfunc(2);
//   		}catch(e){
//   			errormessage = e.message;
//   		}
//   		value_of(errormessage).should_be("test2");
  		
//   		value_of(document.getElementById("mock_test1").value).should_be("");
//   		param.test.commonfunc(3);
//   		value_of(document.getElementById("mock_test1").value).should_be("commonfunc");
//   	},
// 	"verify는 정상적으로 호춯되어야 한다.": function(){
// 		mock("Verify").should_receive("kall").with_param(1,2).and_return("1");
// 		mock("Verify").should_receive("kall2").and_return("1");
		
// 		Verify.kall(1,2);
		
// 		value_of(mock("Verify").verify("kall")).should_be({"total":1, "param":{"[1, 2]":1}});
// 		try{
// 			mock("Verify").verify("kall2");
// 		}catch(e){
// 			value_of(e.message).should_be("kall2 is not called.");
// 		}
		
// 		try{
// 			mock("Verify").verify("kall3");
// 		}catch(e){
// 			value_of(e.message).should_be("kall3 isn't method.");
// 		}
		
// 	},
// 	"verify_all은 전체를 확인이 해야 한다.":function(){
// 		mock("Verify2").should_receive("kall").with_param(1,2).and_return("1");
// 		mock("Verify2").should_receive("kall2").and_return("1");
// 		Verify2.kall(1,2);
// 		Verify2.kall2();
// 		value_of(mock("Verify2").verify_all()).should_be({"kall":{"total":1, "param":{"[1, 2]":1}}, "kall2":{"total":1, "param":{"[]":1}}});
		
// 		mock("Verify3").should_receive("kall").with_param(1,2).and_return("1");
// 		try{
// 			mock("Verify3").verify_all();
// 		}catch(e){
// 			value_of(e.message).should_be("kall is not called.");
// 		}
// 	},
// 	"reset은 정상적으로 값이 삭제되어야 한다.":function(){
// 		mock("Verify4").should_receive("kall").with_param(1,2).and_return("1");
// 		Verify4.kall(1,2);
// 		value_of(mock("Verify4").verify_all()).should_be({"kall":{"total":1, "param":{"[1, 2]":1}}});
// 		mock("Verify4").reset("kall");
// 		try{
// 			mock("Verify4").verify("kall");
// 		}catch(e){
// 			value_of(e.message).should_be("kall is not called.");
// 		}
// 	},
// 	"reset_all은 전체를 확인이 해야 한다.":function(){
// 		mock("Verify5").should_receive("kall").with_param(1,2).and_return("1");
// 		mock("Verify5").should_receive("kall2").and_return("1");
// 		Verify5.kall(1,2);
// 		Verify5.kall2();
// 		value_of(mock("Verify5").verify_all()).should_be({"kall":{"total":1, "param":{"[1, 2]":1}}, "kall2":{"total":1, "param":{"[]":1}}});
// 		mock("Verify5").reset_all();
// 		try{
// 			mock("Verify5").verify_all();
// 		}catch(e){
// 			value_of(e.message).should_be("kall is not called.");
// 		}
// 	}
// });

