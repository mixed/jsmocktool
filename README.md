
![ScreenShot](https://travis-ci.org/mixed/jsmocktool.png)

# What is the jsmocktools?
`jsmocktool` is a JavaScript mock framework inspired by RSpec. Consequently, API is very similar to [RSpec Mock](http://rspec.info/documentation/3.4/rspec-mocks/). If you are rubyist, easy to use it. 


# Install
`jsmocktool` supports browers and node.js. Browser compatibility is IE9+, chrome(newest), safari(newest), opera(newest), firefox(newest) and Node.js 0.10+.
```
npm install jsmocktool --save-dev
bower install jsmocktool --save-dev
```
or You can build using grunt.
```
git clone https://github.com/your-id/jsmocktool
cd jsmocktool
npm install
grunt
```

# How to use it?
`jsmocktool` support es6 and global. If you use `jsmocktool.global.js` that `mock` is expose to global.
```html
// ES6 Style
<script type="text/javascript">
import {mock} from 'jsmocktool/dist/jsmocktool';
</script>

// insert script
<script type="text/javascript" src="node_modules/jsmocktool/dist/jsmocktool.global.js"></script>
```

# API
API is very simple.

## mock
 - create mock object or set mock object. [[link]](https://mixed.github.io/jsmocktool/v/2.0.0/doc/global.html#mock__anchor)

### method
 - [should_receive()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/Mock.html#should_receive__anchor) : create method.
 - [with_param()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/MockMethod.html#with_param__anchor) : set parameters of `should_receive`.
 - [and_return()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/MockMethod.html#and_return__anchor) : return something when `should_receive` called.
 - [and_function()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/MockMethod.html#and_function__anchor) : called function when `should_receive` called.
 - [and_throw()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/MockMethod.html#and_throw__anchor) : throw exception when `should_receive` called.
 - [reset()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/Mock.html#reset__anchor) : resets specific information called method.
 - [reset_all()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/Mock.html#reset_all__anchor) : resets all information called methods.
 - [verify()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/Mock.html#verify__anchor) : return specific information called method.
 - [verify_all()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/Mock.html#verify_all__anchor) : return all information called methods.

### etc
 - [mock.OBJECT](https://mixed.github.io/jsmocktool/v/2.0.0/doc/global.html#OBJECT) : object type of mock.(default)
 - [mock.INSTANCE](https://mixed.github.io/jsmocktool/v/2.0.0/doc/global.html#INSTANCE) : instance type of mock.
 - [mock.anything()](https://mixed.github.io/jsmocktool/v/2.0.0/doc/global.html#anything) : spacial parameter in `with_param`.

## stub
 - Deprecated Object. If you use it you have to migrate to mock.


License
-------
The MIT License


