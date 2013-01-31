
Javascript Mock Tool is Mock library of RSpec style.
============================================================
### Compatibility.
Internet Explorer - 6+
Firefox - 2+
Chrome - 7+
Opera - 10+
Safari - 3+
Mobile Safari - 3+
Android browser - 2+
Node.js - 0.2+

## Stub of JSMockTool.
### Create Stub. and make method.
``` js
    stub(Obj).should_receive("msg");
    stub("Obj").should_receive("msg");
    //make stub
	Obj.msg();
```

### If you want to hava return value of method then Use and_return.
``` js
stub("Obj",Stub.INSTANCE).should_receive("msg").and_return(value);
new Obj().msg();//value
```

## Mock of JSMockTool.

### Create Mock. and make method.
``` js
mock(Obj).should_receive("msg");
mock("Obj").should_receive("msg");
//make mock
Obj.msg();
```

### If you want to hava return value of method then Use and_return.
``` js
mock("Obj",Mock.INSTANCE).should_receive("msg").and_return(value1);
new Obj().msg(); //value1
```

### The mock can set parameter.
``` js
mock("Obj").should_receive("msg").with_param(1,2).and_return(value2);
Obj.msg(1,2); //value2
```

### If you want to raise error when specific status then Use and_raise.
``` js
mock("Obj").should_receive("msg").with_param(1,2,3).and_raise(new Error("error"));
Obj.msg(1,2,3); //throw new Error("error");
```

### If you want to excute function when specific status then Use and_function.
``` js
mock("Obj").should_receive("msg").with_param(1).and_function(function(1){
        alert(1);
});
Obj.msg(1); //alert(1);
```

### If you want to excute function without reference to specific parameter then Use mock#anything().
``` js
mock("Foo").should_receive("test").with_param(1,2,mock.anything()).and_return("2");

Foo.test(1,2,1); // 2
Foo.test(1,2,2); // 2
Foo.test(1,2,3); // 2
//...
Foo.test(1,2, (any parameter) ); // 2   
```

## The Mock has verify methods.

### The mock#verify() is check to call of specific method.
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
``` js
mock("Foo.Bar").should_receive("test").with_param(1,2).and_return("2");
Foo.Bar.test(1,2);
mock("Foo.Bar").verify("test"); //{"total":1,"[1,2]":1};

mock("Foo.Bar").reset("test");
mock("Foo.Bar").verify("test"); //Occour Exception
```

### The mock#reset_all() is initialized to the information you've call of all method.
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
