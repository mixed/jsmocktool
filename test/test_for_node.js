var testrunner = require("qunit");

testrunner.setup({
    log: {
        summary: true
    }
});

testrunner.run([
    {
            code: "/Users/mixed/Sites/jsmocktool/src/jsstub.js",
            tests: "/Users/mixed/Sites/jsmocktool/test/jsstubspec.js"
    },
    {
            deps: "/Users/mixed/Sites/jsmocktool/src/tosource.js",
            code: "/Users/mixed/Sites/jsmocktool/src/jsmock.js",
            tests: "/Users/mixed/Sites/jsmocktool/test/jsmockspec.js"
    }
],function(err,report){
    console.dir(report);
});