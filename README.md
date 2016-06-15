
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
 - create mock object or set mock object.

### method
 - should_receive : create method.
 - with_param : set parameters of `should_receive`.
 - and_return : return something when `should_receive` called.
 - and_function : called function when `should_receive` called.
 - and_throw : throw exception when `should_receive` called.

### etc
 - mock.OBJECT : object type of mock.(default)
 - mock.INSTANCE : instance type of mock.
 - mock.anything() : spacial parameter in `with_param`.

## stub
 - Deprecated Object. If you use it you have to migrate to mock.


License
-------
The MIT License


