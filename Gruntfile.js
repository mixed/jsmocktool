module.exports = function( grunt ) {
	var clc = require('cli-color');
	var pack = grunt.file.readJSON("package.json");
	var version = pack.version;
	var src = 'v/'+version+'/src/';
	var doc = 'v/'+version+'/doc/';
	
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.initConfig({
		gitclone : {
			src : {
				 options: {
					repository: 'https://github.com/mixed/jsmocktool',
					branch: version,
	                directory: 'v/temp'
	            }
			}
		},
		copy: {
			src: {
				expand: true,
				cwd : "v/temp/src/",
				src: '**',
				dest: src
			}
		},
		clean: ['v/temp'],
		jsdoc : {
	        dist : {
	            src: [src+'*.js', src+'*/*.js'],
	            options: {
	                destination: doc,
					template : "node_modules/ink-docstrap/template",
              		configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
	            }
	        }
	    }
	});

	grunt.registerTask("default", ["gitclone:src", "copy:src", "clean","jsdoc:dist"]);

}
