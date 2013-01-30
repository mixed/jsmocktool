module.exports = function( grunt ) {
	grunt.initConfig({
		lint: {
			all: ["lib/*.js"]
		},
		jshint: {
			options: {
				browser: true
			}  
		},
		min :{
			all: {
				src: ['lib/jsmock.js','lib/jsstub.js'],
				dest: 'jsmocktool.min.js'
			}
		},
		qunit : {
			all : ["test/jsmocktool_test.html"]
		}
	});
	grunt.registerTask("node_test",function(){
		var testrunner = require("qunit");
		var clc = require('cli-color');

		testrunner.setup({
		    log: {
		        summary: true
		    }
		});

		testrunner.run([
		    {
		            code: "lib/jsstub.js",
		            tests: "test/jsstub_test.js"
		    },
		    {
		            code: "lib/jsmock.js",
		            tests: "test/jsmock_test.js"
		    }
		],function(err,report){
		    var str = "Node.js test ";
		    if(report.failed > 0){
		        console.log(clc.red.bold(str+"FAIL!!!!"));
		    }else{
		        console.log(clc.white.bgGreen.bold(str+"SUCCESS!"));
		    }
		});
	});

	grunt.registerTask("default", "lint jshint min node_test browser_test");
}
