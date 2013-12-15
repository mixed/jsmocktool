Javascript Mock Tool is Mock library of RSpec style.
RSpec 스타일의 자바스크립트 Mock 라이브러리.
============================================================
### Compatibility.
Internet Explorer - 6+, Firefox - 2+, Chrome - 7+, Opera - 10+, Safari - 3+, Mobile Safari - 3+, Android browser - 2+, Node.js - 0.2+

### Build Status
![ScreenShot](https://travis-ci.org/mixed/jsmocktool.png)

### Installation.
You can install JSMockTool via NPM: 
NPM으로 인스톨 하기.
```
//NodeJS
npm install jsmocktool
```

```
//Browser
git clone git@github.com:mixed/jsmocktool.git
npm install
grunt
```

## Stub of JSMockTool. 
Stub사용법
### Create Stub. and make method. 
스텀 생성하고 매서드 만들기.
``` js
    stub(Obj).should_receive("msg");
    stub("Obj").should_receive("msg");
    //make stub
	Obj.msg();
```

### If you want to hava return value of method then Use and_return. 
and_return을 사용하여 반환값을 설정할 수 있음.
``` js
stub("Obj",Stub.INSTANCE).should_receive("msg").and_return(value);
new Obj().msg();//value
```

## Mock of JSMockTool.
Mock 사용법
### Create Mock. and make method.
Mock생성하고 메서드 만들기.
``` js
mock(Obj).should_receive("msg");
mock("Obj").should_receive("msg");
//make mock
Obj.msg();
```

### If you want to hava return value of method then Use and_return.
and_return을 사용하여 반환값을 설정할 수 있음.
``` js
mock("Obj",Mock.INSTANCE).should_receive("msg").and_return(value1);
new Obj().msg(); //value1
```

### The mock can set parameter.
mock은 파라메터도 설정가능.
``` js
mock("Obj").should_receive("msg").with_param(1,2).and_return(value2);
Obj.msg(1,2); //value2
```

### If you want to raise error when specific status then Use and_raise.
and_raise을 사용하면 에러는 발생시킬 수 있음.
``` js
mock("Obj").should_receive("msg").with_param(1,2,3).and_raise(new Error("error"));
Obj.msg(1,2,3); //throw new Error("error");
```

### If you want to excute function when specific status then Use and_function.
and_function을 사용하면 함수를 실행 시킬 수 있음.
``` js
mock("Obj").should_receive("msg").with_param(1).and_function(function(1){
        alert(1);
});
Obj.msg(1); //alert(1);
```

### If you want to excute function without reference to specific parameter then Use mock#anything().
특정 파라메터와 상관없이 실행시키고 싶다면 mock.anything을 사용.
``` js
mock("Foo").should_receive("test").with_param(1,2,mock.anything()).and_return("2");

Foo.test(1,2,1); // 2
Foo.test(1,2,2); // 2
Foo.test(1,2,3); // 2
//...
Foo.test(1,2, (any parameter) ); // 2   
```

## The Mock has verify methods.
Mock의 검증 메서드.
### The mock#verify() is check to call of specific method.
어떤 메서드가 호출했는지 mock#verify로 확인 가능.
``` js
mock("Foo.Bar").should_receive("test").with_param(1,2).and_return("2");
Foo.Bar.test(1,2);
mock("Foo.Bar").verify("test"); //{"total":1,"[1,2]":1};
//If you can see error then The verify method call that The mock call not method.

mock("Foo.Bar").should_receive("test").with_param(1,2).and_return("2");
mock("Foo.Bar").verify("test");
//Occour exception
```

### The mock#verify_all() is check to call of all method.
모드 메서드가 호출했는지 mock#verify_all로 확인 가능.
``` js
mock("Foo.Bar").should_receive("test").with_param(1,2).and_return("2");
mock("Foo.Bar").should_receive("test2").with_param(1).and_return("2");
Foo.Bar.test(1,2);
Foo.Bar.test2(1);
Foo.Bar.test2(1);
mock("Foo.Bar").verify_all();
//{"test":{"total":1, "param":{"[1,2]":1}}, "test2":{"total":2, "param":{"[1]":2}}}
```

### The mock#reset() is initialized to the information you've call of specific method.
호출한 메서드의 정보를 mock#reset으로 확인 가능.
``` js
mock("Foo.Bar").should_receive("test").with_param(1,2).and_return("2");
Foo.Bar.test(1,2);
mock("Foo.Bar").verify("test"); //{"total":1,"[1,2]":1};

mock("Foo.Bar").reset("test");
mock("Foo.Bar").verify("test"); //Occour Exception
```

### The mock#reset_all() is initialized to the information you've call of all method.
호출한 모든 메서드의 정보를 mock#reset_all으로 확인가능.
``` js
mock("Foo.Bar").should_receive("test").with_param(1,2).and_return("2");
mock("Foo.Bar").should_receive("test2").with_param(1).and_return("2");
Foo.Bar.test(1,2);
Foo.Bar.test2(1);
Foo.Bar.test2(1);
mock("Foo.Bar").verify_all();
//{"test":{"total":1, "param":{"[1,2]":1}}, "test2":{"total":2, "param":{"[1]":2}}}

mock("Foo.Bar").reset_all();
mock("Foo.Bar").verify("test"); //Occour Exception
```

License
-------
The MIT License

Copyright (c) 2011 Arunoda Susiripala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
