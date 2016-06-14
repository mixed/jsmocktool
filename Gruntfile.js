module.exports = function( grunt ) {
	var clc = require('cli-color');
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config");
	var banner = ["/**",
		"* Copyright (c) 2015 <%= pkg.author %>.",
		"* @license <%= pkg.license %>",
		"*",
		"* <%= pkg.name %> is Javascript Mock Tool of RSpec Style.",
		"* <%= pkg.homepage %>",
		"*",
		"* @version <%= pkg.version %>",
		"*/\n"];

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-jsdoc');
	
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		qunit : {
			all : ["test/jsmocktool_test.html"]
		},
		webpack : {
			options: webpackConfig,
			development: {
				
			},
			product: {
				plugins: webpackConfig.plugins.concat(
					new webpack.optimize.DedupePlugin(),
			        new webpack.optimize.OccurenceOrderPlugin(),
			        new webpack.optimize.UglifyJsPlugin({
			            mangle: true,
			            compress: {warnings: false}
			        }),
			        new webpack.BannerPlugin(banner.join("\n\r"), { raw: true, entryOnly: true })
				)
			}
		},
		jsdoc : {
	        dist : {
	            src: ['src/*.js', 'src/*/*.js'],
	            options: {
	                destination: 'doc',
					template : "node_modules/ink-docstrap/template",
              		configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
	            }
	        }
	    }
	});

	grunt.event.on('qunit.done', function (failed, passed, total, runtime) {
		console.log(clc.blue("==============================="));
		console.log(clc.white.bgGreen.bold("[Pass] "+passed));
		if(failed > 0){
			console.log(clc.red.bold(failed+" FAIL!!!!"));
			grunt.fail.fatal("Testcase failed");
		}		
		console.log(clc.blue("==============================="));

	});

	grunt.registerTask("default", ["webpack:development","qunit"]);
	grunt.registerTask("build", "webpack:product");
	grunt.registerTask("travis", ["build","qunit"]);

}
