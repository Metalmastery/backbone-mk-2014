'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		clean: {
			tmp : ['tmp'],
			cordova : ['cordovaApp/www']
		},
		copy: {
			tmp: {
				files: [
					// includes files within path
					{expand: true, src: ['index.js' , 'index.html', 'index.css'], dest: 'tmp/', filter: 'isFile'},

					// includes files within path and its sub-directories
					{expand: true, src: ['views/**'], dest: 'tmp/views/'},
					{expand: true, src: ['models/**'], dest: 'tmp/models/'},
					{expand: true, src: ['libs/**'], dest: 'tmp/libs/'},
					{expand: true, src: ['assets/**'], dest: 'tmp/assets/'}

				]
			},
			parse : {expand: true, cwd : './tmp', src: ['**'], dest: 'parse/public'},
			cordova : {expand: true, cwd : './tmp', src: ['**'], dest: 'cordovaApp/www'}
		}



	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['clean:tmp', 'copy:tmp', 'copy:parse', 'copy:cordova', 'clean:tmp']);
//	grunt.registerTask('default', ['copy:tmp', 'copy:tmp2']);

};