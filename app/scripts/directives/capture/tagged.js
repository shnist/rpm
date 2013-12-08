angular.module('RPM.directives')
	.directive('tagged', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'scripts/templates/capture/tagged.html',
			scope: '=',
			link: function (scope, elem, attrs) {
				console.log('tagged directive', scope);
			}
		};
	});