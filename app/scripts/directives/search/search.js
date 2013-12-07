angular.module('RPM.directives')

	.directive('search', function () {
		return {

			replace: true,
			restrict: 'E',
			templateUrl: '/scripts/templates/search/search.html',
			scope: '=',
			link: function (scope, elem, attrs) {
			}

		};
	});