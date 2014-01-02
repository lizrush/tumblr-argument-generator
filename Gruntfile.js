module.exports = function (grunt) {
	var matchdep = require('matchdep')

	matchdep.filter('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jade: {
			production: {
				options: {
					pretty: false,
				},
				files: [{
					expand: true,
					cwd: 'app/views',
					src: '**/*.jade',
					dest: 'webroot/',
					ext: '.html',
				}],
			},
		},
		uglify: {
			production: {
				files: {
					'webroot/static/js/main.js': 'app/assets/js/main.js',
				},
			},
		},
		stylus: {
			production: {
				options: {
					debug: false,
					compress: true,
					'include css': true,
					use: [
						require('nib'),
					],
					'import': [
						'nib',
					],
				},
				files: [{
					'webroot/static/css/main.css': [
						'app/assets/styl/main.styl',
					],
				}],
			},
		},
	})

	grunt.registerTask('production', [
		'jade:production',
		'uglify:production',
		'stylus:production',
	])
}
