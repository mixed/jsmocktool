var testrunner = require("qunit");
var clc = require('cli-color');

testrunner.setup({
    log: {
        summary: true
    }
});

testrunner.run([
    {
            code: "/Users/mixed/Sites/jsmocktool/src/jsstub.js",
            tests: "/Users/mixed/Sites/jsmocktool/test/jsstub_test.js"
    },
    {
            code: "/Users/mixed/Sites/jsmocktool/src/jsmock.js",
            tests: "/Users/mixed/Sites/jsmocktool/test/jsmock_test.js"
    }
],function(err,report){
    var str = "Node.js test ";
    if(report.fail > 0){
        console.log(clc.red.bold(str+"FAIL!!!!"));
    }else{
        console.log(clc.white.bgGreen.bold(str+"SUCCESS!"));
    }
});