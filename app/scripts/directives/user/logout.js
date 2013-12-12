angular.module('RPM.directives')
	.directive('logout', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: '=',
			templateUrl: 'scripts/templates/user/logout.html',
			link: function (scope, elem, attrs) {

			}
		};
	});