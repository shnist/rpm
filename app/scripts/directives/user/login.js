angular.module('RPM.directives')

	.directive('login', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'scripts/templates/user/login.html',
			scope: '=',
			link: function (scope, elem, attrs) {

				console.log('scope login', scope);

			}
		};
	});