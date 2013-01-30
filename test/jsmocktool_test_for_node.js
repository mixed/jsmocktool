var testrunner = require("qunit");
var clc = require('cli-color');

testrunner.setup({
    log: {
        summary: true
    }
});

testrunner.run([
    {
            code: "../lib/jsstub.js",
            tests: "jsstub_test.js"
    },
    {
            code: "../lib/jsmock.js",
            tests: "jsmock_test.js"
    }
],function(err,report){
    var str = "Node.js test ";
    if(report.failed > 0){
        console.log(clc.red.bold(str+"FAIL!!!!"));
    }else{
        console.log(clc.white.bgGreen.bold(str+"SUCCESS!"));
    }
});