angular.module('RPM.directives')

	.directive('search', function () {
		return {

			replace: true,
			restrict: 'E',
			templateUrl: '/scripts/templates/search/search.html',
			scope: '=',
			link: function (scope, elem, attrs) {
				console.log('search directive', scope);

				scope.$watch(function () {
					return scope.states.results;
				}, function (n, o) {
					console.log('search results', scope.states.results);
				});

			}

		};
	});