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
		requirejs: {
			options: {
				baseUrl: './app/assets/js',
				name: 'main',
				optimize: 'uglify2',
			},
			production: {
				options: {
					out: 'webroot/static/js/main.js',
					uglify2: {
						compress: {
							global_defs: {
								DEBUG: false,
							},
						},
						output: {
							beautify: false,
						},
						mangle: true,
						warnings: false,
					},
					paths: {
						'jquery': 'empty:',
					},
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
		'requirejs:production',
		'stylus:production',
	])
}
