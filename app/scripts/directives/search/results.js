angular.module('RPM.directives')
	.directive('results', function () {
		return {
			replace: true,
			restrict: 'E',
			scope: '=',
			templateUrl: 'scripts/templates/search/results.html',
			link: function (scope, elem, attrs) {

				scope.tagImage = function () {
					console.log('tag image', this);
				};

			}
		};
	});