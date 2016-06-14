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
	
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		qunit : {
			all : ["test/jsmocktool_test.html"]
		},
		webpack : {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					// new webpack.optimize.DedupePlugin(),
			  //       new webpack.optimize.OccurenceOrderPlugin(),
			  //       new webpack.optimize.UglifyJsPlugin({
			  //           mangle: true,
			  //           compress: {warnings: false}
			  //       }),
			  //       new webpack.BannerPlugin(banner.join("\n\r"), { raw: true, entryOnly: true })
				)
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

	grunt.registerTask("default", "qunit");
	grunt.registerTask("build", "webpack:build");
	grunt.registerTask("travis", ["build","qunit"]);

}
