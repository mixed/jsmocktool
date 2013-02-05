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
				dest: 'dist/jsmocktool.min.js'
			}
		},
		qunit : {
			all : ["test/jsmocktool_test.html"]
		}
	});
	grunt.registerTask("node_test",function(){
		var testrunner = require("qunit");
		var clc = require('cli-color');
		var done = this.async();
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
		        done(false);
		    }else{
		        console.log(clc.white.bgGreen.bold(str+"SUCCESS!"));
		        done(true);
		    }

		});
	});

	grunt.registerTask("test", "node_test qunit");
	grunt.registerTask('travis', 'lint node_test');
	grunt.registerTask("default", "node_test qunit lint min");

}
