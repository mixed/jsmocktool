/**
 * @author mixed
 */

function getValueById(id){
  return document.getElementById(id).value;
}
function $ (id) {
  return document.getElementById(id);
}
module("jsmock - Object type",{
  "setup":function(){
    this.mock = mock("RECEIVE");
    $("mock_test1").value = "";
    $("mock_test2").value = "";
    $("mock_test3").value = "";
  },
  "teardown":function(){
    this.mock = undefined;
    RECEIVE = undefined;
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
  mock("RECEIVE4").should_receive("test").and_return(3);
  //When
  var returnVal = RECEIVE4.test();
  //Then
  equal(returnVal,3);
});

test("If use with_param, mock will return value when same param.",function(){
  //Given
  mock("RECEIVE4").should_receive("test").with_param(1,2).and_return(4);
  //When
  var returnVal = RECEIVE4.test(1,2);
  //Then
  equal(returnVal,4);  
});

test("The Mock must be work mock before set parameter when add new parameter.",function(){
  //Given
  this.mock.should_receive("test").and_return(3);
  this.mock.should_receive("test").with_param(1,2).and_return(4);
  this.mock.should_receive("test").with_param(1,2,3).and_return(5);
  //When
  var noneParam = RECEIVE.test();
  var oneParam  = RECEIVE.test(1,2);
  var twoParam  = RECEIVE.test(1,2,3);
  //Then
  equal(noneParam , 3);
  equal(oneParam  , 4);
  equal(twoParam  , 5);
});

test("The Mock must be change return value when add same parameter.",function(){
  //Given
  this.mock.should_receive("test").and_return(3);
  this.mock.should_receive("test").with_param(1,2).and_return(4);
  this.mock.should_receive("test").with_param(1,2).and_return(5);
  //When
  var noneParam = RECEIVE.test();
  var twoParam  = RECEIVE.test(1,2);
  //Then
  equal(noneParam, 3);
  equal(twoParam , 5);
});

test("The add_throw is throw exception when match param.",function() {
  //Given
  var error_message = "";
  this.mock.should_receive("test2").and_throw(new Error("and_throw test."));
  //When
  try{
    RECEIVE.test2();
  }catch(e){
    error_message = e.message;
  }
  //Then
  equal(error_message,"and_throw test.");
});

test("If set with_param of and_throw then throw exception when match parameter.",function() {
  //Given
  this.mock.should_receive("test2").with_param(1,2).and_throw(new Error("and_throw test2."));
  var error_message = "";

  //When
  try{
    RECEIVE.test2(1,2);
  }catch(e){
    error_message = e.message;
  }

  //Then
  equal(error_message,"and_throw test2.");
});

test("The and_throw is well work when change parameter",function  () {
  //Given
  this.mock.should_receive("test2").with_param().and_throw(new Error("and_throw test"));
  this.mock.should_receive("test2").with_param(1,2).and_throw(new Error("and_throw test2"));
  this.mock.should_receive("test2").with_param(1,2,3).and_throw(new Error("and_throw test3"));
  var error_message = "";

  //When
  try{
   RECEIVE.test2();
  }catch(e){
   error_message = e.message;
  }
  //Then
  equal(error_message,"and_throw test");

  //When
  try{
   RECEIVE.test2(1,2);
  }catch(e){
   error_message = e.message;
  }
  //Then
  equal(error_message,"and_throw test2");

  //When
  try{
   RECEIVE.test2(1,2,3);
  }catch(e){
   error_message = e.message;
  }
  //Then
  equal(error_message,"and_throw test3");
});
test("The and_throw throw new exception when some function, same parameter, change exception.",function  () {
  //Given
  this.mock.should_receive("test2").with_param(1,2,3).and_throw(new Error("and_throw test"));
  var error_message = "";
  //When
  try{
   RECEIVE.test2(1,2,3);
  }catch(e){
   error_message = e.message;
  }
  //Then
  equal(error_message,"and_throw test");

  //Then
  this.mock.should_receive("test2").with_param(1,2,3).and_throw(new Error("change throw"));
  try{
   RECEIVE.test2(1,2,3);
  }catch(e){
   error_message = e.message;
  }
  //When
  equal(error_message,"change throw"); 
});

test("The and_function run function when set new function",function  () {

  //Given
  this.mock.should_receive("test3").and_function(function(){
    $("mock_test1").value="first";
  });
  //Then
  RECEIVE.test3();
  //When
  equal(getValueById("mock_test1"),"first");  
});

test("If set a with_param then the and_functon run function when only match parameter.",function(){
  //Given
  this.mock.should_receive("test3").with_param(1,2).and_function(function(){
   $("mock_test2").value = "second";
  });
  //Then
  RECEIVE.test3(1,2);
  //When
  equal(getValueById("mock_test2"),"second");
});

test("Then and_function is well work when same function change parameter.",function(){
  //Given
  this.mock.should_receive("test3").with_param().and_function(function(){
   $("mock_test1").value="first";
  });
  this.mock.should_receive("test3").with_param(1,2).and_function(function(){
   $("mock_test2").value="second";
  });
  this.mock.should_receive("test3").with_param(1,2,3).and_function(function(){
   $("mock_test3").value="third";
  });
  //When
  RECEIVE.test3();
  //Then
  equal(getValueById("mock_test1"),"first");

  //When
  RECEIVE.test3(1,2);
  //Then
  equal(getValueById("mock_test2"),"second");

  //When
  RECEIVE.test3(1,2,3);
  //Then
  equal(getValueById("mock_test3"),"third");
});
test("The and_function run new function when some function, same parameter, change and_function.",function(){
  //Given
  this.mock.should_receive("test3").with_param(1,2,3).and_function(function(){
   $("mock_test3").value="third";
  });
  this.mock.should_receive("test3").with_param(1,2,3).and_function(function(){
   $("mock_test3").value="change third";
  });
  //When
  RECEIVE.test3(1,2,3);
  //Then
  equal(getValueById("mock_test3"),"change third");
});
test("If use Mock.anything when run function without reference to parameter.",function(){
  //Given
  this.mock.should_receive("test").with_param(1,2).and_return("1");
  this.mock.should_receive("test").with_param(1,2,Mock.anything()).and_return("2");
  this.mock.should_receive("test").with_param(1,2,Mock.anything(),Mock.anything()).and_return("3");

  //When, Then
  equal(RECEIVE.test(1,2),"1");
  equal(RECEIVE.test(1,2,3),"2");
  equal(RECEIVE.test(1,2,1),"2");
  equal(RECEIVE.test(1,2,4),"2");
  equal(RECEIVE.test(1,2,4,5),"3");
  equal(RECEIVE.test(1,2,4,6),"3");
});

//    'param에 anything이 들어간 파라메터에서 다시 설정한 경우에 다시 설정한 값으로 반환 해야 한다.':function(){
//      mock("Foo").should_receive("test").with_param("5","6",Mock.anything()).and_return("5");
//      value_of(Foo.test("5","6","3")).should_be("5");
      
//      mock("Foo").should_receive("test").with_param("5","6",Mock.anything()).and_return("6");
//      value_of(Foo.test("5","6","3")).should_be("6");
      
//    },

module("jsmock - other type",{
  "setup":function(){
    
    $("mock_test1").value = "";
    $("mock_test2").value = "";
    $("mock_test3").value = "";
  },
  "teardown":function(){
    this.mock = undefined;
    MockInstance = undefined;
  }
});

test("The instance type is well work too.",function(){
  //Given
  var receive = mock("MockInstance",Mock.INSTANCE);
  receive.should_receive("test").with_param(1).and_return("1");
  receive.should_receive("test").with_param(2).and_throw(new Error("test"));
  receive.should_receive("test").with_param(3).and_function(function(){
    $("mock_test1").value="test";
  });
  var errormessage = ""; 

  //When
  var mockInstance = new MockInstance();
  //Then
  equal(mockInstance.test(1),"1");

  //When
  try{
   mockInstance.test(2);
  }catch(e){
   errormessage = e.message;
  }
  //Then
  equal(errormessage,"test");

  //When
  mockInstance.test(3);
  //Then
  equal(getValueById("mock_test1"),"test");
});

test("The normal functon is well work too.",function(){
  //Given
  var receive = mock(window);
  receive.should_receive("commonfunc").with_param(1).and_return("1");
  receive.should_receive("commonfunc").with_param(2).and_throw(new Error("test2"));
  receive.should_receive("commonfunc").with_param(3).and_function(function(){
   $("mock_test1").value="commonfunc";
  });
  var errormessage = ""; 

  //Then
  var returnVal = commonfunc(1);
  //When
  equal(returnVal,"1");

  //Then
  try{
   commonfunc(2);
  }catch(e){
   errormessage = e.message;
  }
  //When
  equal(errormessage,"test2");

  //Then
  commonfunc(3);
  //When
  equal(getValueById("mock_test1"),"commonfunc");
});
test("The namespace type is well work too.",function(){
  //Given
  mock("aaa.bbb.ccc.ddd").should_receive("test").and_return("test");
  //Then,When
  equal(aaa.bbb.ccc.ddd.test(),"test");

  //Given
  mock("aaaa.bbbb.cccc",Mock.INSTANCE).should_receive("test").and_return("test");
  //Then,When
  equal(new aaaa.bbbb.cccc().test(),"test");

  //Given
  window["aaaaa"] = {};
  aaaaa.bbbbb = {};
  mock("aaaaa.bbbbb").should_receive("test").and_return("test");
  //Then,When
  equal(aaaaa.bbbbb.test(),"test");

  //Given
  mock("aaaaa.bbbbb.ccccc").should_receive("test").and_return("test");
  //Then,When
  equal(aaaaa.bbbbb.ccccc.test(),"test");
});

test("The with_param well work when use namespace.",function(){
  //Given
  mock("param.test").should_receive("commonfunc").with_param(1).and_return("1");
  mock("param.test").should_receive("commonfunc").with_param(2).and_throw(new Error("test2"));
  mock("param.test").should_receive("commonfunc").with_param(3).and_function(function(){
   $("mock_test1").value="commonfunc";
  });

  //Then, When
  equal(param.test.commonfunc(1),"1");

  //Given
  var errormessage = ""; 
  try{
   param.test.commonfunc(2);
  }catch(e){
   errormessage = e.message;
  }
  //Then, When
  equal(errormessage,"test2");

  //Then
  param.test.commonfunc(3);
  //When
  equal(getValueById("mock_test1"),"commonfunc");  
});

module("jsmock - verify",{
  "setup":function(){
    this.mock = mock("Verify");
    $("mock_test1").value = "";
    $("mock_test2").value = "";
    $("mock_test3").value = "";
  },
  "teardown":function(){
    this.mock = undefined;
    Verify = undefined;
  }
});

test("The verify is well work.",function(){
  //Given
  this.mock.should_receive("kall").with_param(1,2).and_return("1");
  this.mock.should_receive("kall2").and_return("1");
  Verify.kall(1,2);
  var errormessage = "";
  //Then
  var result = this.mock.verify("kall");
  //When
  deepEqual(result,{"total":1, "param":{"[1,2]":1}});

  //Then
  try{
    mock("Verify").verify("kall2");
  }catch(e){
    errormessage = e.message;
  }
  //When
  equal(errormessage,"kall2 is not called.");

  //Then
  try{
    mock("Verify").verify("kall3");
  }catch(e){
    errormessage = e.message;
  }
  //When
  equal(errormessage,"kall3 isn't method.");
});
test("The verify_all is check all method.",function(){

  //Given
  mock("Verify2").should_receive("kall").with_param(1,2).and_return("1");
  mock("Verify2").should_receive("kall2").and_return("1");
  Verify2.kall(1,2);
  Verify2.kall2();
  var returnVal;
  //Then
  returnVal = mock("Verify2").verify_all();
  //When
  deepEqual(returnVal,{"kall":{"total":1, "param":{"[1,2]":1}}, "kall2":{"total":1, "param":{"[]":1}}});


  //Given
  mock("Verify3").should_receive("kall").with_param(1,2).and_return("1");
  var errormessage;
  //Then
  try{
    mock("Verify3").verify_all();
  }catch(e){
    errormessage = e.message;
  }
  //When
  equal(errormessage,"kall is not called.");
});
test("The reset is remove info of function call.",function(){
  //Given
  mock("Verify4").should_receive("kall").with_param(1,2).and_return("1");
  Verify4.kall(1,2);
  //Then
  var returnVal = mock("Verify4").verify_all();
  //When
  deepEqual(returnVal,{"kall":{"total":1, "param":{"[1,2]":1}}});
  
  //Given
  var errormessage;
  //Then
  mock("Verify4").reset("kall");
  try{
    mock("Verify4").verify("kall");
  }catch(e){
    errormessage = e.message;
  }
  //When
  equal(errormessage,"kall is not called.");
});
test("The reset_all is remove all info of function call.",function(){
  //Given
  mock("Verify5").should_receive("kall").with_param(1,2).and_return("1");
  mock("Verify5").should_receive("kall2").and_return("1");
  Verify5.kall(1,2);
  Verify5.kall2();
  //Then
  var returnVal = mock("Verify5").verify_all();
  //When
  deepEqual(returnVal,{"kall":{"total":1, "param":{"[1,2]":1}}, "kall2":{"total":1, "param":{"[]":1}}});

  //Given
  var errormessage;
  //Then
  mock("Verify5").reset_all();
  try{
    mock("Verify5").verify_all();
  }catch(e){
    errormessage = e.message;
  }
  //When
  equal(errormessage,"kall is not called.");
});



