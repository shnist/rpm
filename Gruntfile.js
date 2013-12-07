module.exports = function (grunt) {


	grunt.initConfig({


		jshint: {
			files: [
				'Gruntfile.js',
				'app/scripts/**/*.js'
			],
			options: {
				ignores: ['app/assets/lib/*.js']
			},
			globals: {
				angular: true,
				jQuery: true
			}
		},


		sass: {
			dist: {
				options: {
					lineNumbers: true,
					style: 'expanded'
				},
				files: {
					'app/assets/css/style.css': 'app/assets/sass/style.scss'
				}
			}
		},


		concat: {
			dist: {
				src: 'app/scripts/**/*.js',
				dest: 'app/dist/RPM.js'
			}
		},


		watch: {
			jshint: {
				files: [
					'Gruntfile.js',
					'app/scripts/**/*'
				],
				tasks: ['jshint', 'concat']
			},
			sass: {
				files: ['assets/sass/*.scss'],
				tasks: 'sass'
			}
		},

		// starts the dev server
		open : {
			dev : {
				path: 'http://localhost:3000/'
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-open');                   // Open browser when server has been created


	//Register tasks!
	grunt.registerTask('server', 'Start a custom web server', function() {
		grunt.log.writeln('Started web server on port 3000');
		require('./server/app.js');
	});

	//run a web server and run the watch command.
	grunt.registerTask('default', ['build', 'server', 'open:dev', 'watch']);

	grunt.registerTask('build', ['jshint', 'concat', 'sass']);

	//grunt.registerTask('default', ['jshint', 'concat', 'sass']);
};