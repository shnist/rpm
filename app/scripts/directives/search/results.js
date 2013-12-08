angular.module('RPM.directives')
	.directive('results', function () {
		return {
			replace: true,
			restrict: 'E',
			scope: '=',
			templateUrl: 'scripts/templates/search/results.html',
			link: function (scope, elem, attrs) {
				console.log('results scope', scope);
			}
		};
	});