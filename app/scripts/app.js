//
// set up the imports we wish to inject into angular
//
//
var imports = [
	'RPM.controllers',
	'RPM.services',
	'RPM.directives',
	'RPM.filters',
	'ngRoute'
];

//
// Setup the RPM angular app
// 
// 
angular.module('RPM', imports)
	
	.config([
		'$routeProvider',
		'$locationProvider',
	function (
		$routeProvider,
		$locationProvider
	) {


		$locationProvider.html5Mode(true);


		$routeProvider.when('/capture', {
			templateUrl: 'scripts/templates/capture/capture.html',
			controller: 'Capture'
		});


		$routeProvider.when('/', {
			templateUrl: 'scripts/templates/user/login.html',
			controller: 'User'
		});


		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);

// Setup filters
angular.module('RPM.filters', []);

// Setup services
angular.module('RPM.services', ['ngResource']);

// Setup controllers
angular.module('RPM.controllers', []);

// Setup directives and inject dependencies
angular.module('RPM.directives', [
	'RPM.controllers',
	'RPM.services',
	'RPM.controllers'
]);