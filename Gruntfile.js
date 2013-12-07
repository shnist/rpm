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


		watch: {
			jshint: {
				files: [
					'Gruntfile.js',
					'app/scripts/**/*'
				],
				tasks: 'jshint'
			},
			sass: {
				files: ['assets/sass/*.scss'],
				tasks: 'sass'
			}
		}


	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');


	grunt.registerTask('default', ['jshint', 'sass']);
};