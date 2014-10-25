'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		clean: {
			tmp : ['tmp'],
			all : ['tmp', 'cordovaApp/www', 'parse/public' ]
		},
		concat : {}
		,
		copy: {
			tmp: {
				files: [
					// includes files within path
					{expand: true, src: ['index.js' , 'index.html', 'index.css'], dest: 'tmp/', filter: 'isFile'},

					// includes files within path and its sub-directories
					{expand: true, src: ['views/**'], dest: 'tmp/'},
					{expand: true, src: ['models/**'], dest: 'tmp/'},
					{expand: true, src: ['libs/**'], dest: 'tmp/'},
					{expand: true, src: ['assets/**'], dest: 'tmp/'}

				]
			},
			parse : {expand: true, cwd : './tmp', src: ['**'], dest: 'parse/public'},
			cordova : {expand: true, cwd : './tmp', src: ['**'], dest: 'cordovaApp/www'}
		}



	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['clean:all', 'copy:tmp', 'copy:parse', 'copy:cordova', 'clean:tmp']);

};