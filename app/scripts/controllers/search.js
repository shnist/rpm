angular.module('RPM.controllers')

	.controller('Search', ['$scope', 'SearchService', function ($scope, SearchService) {

		$scope.searchSpotify = function (form) {

			var query = form.query.$viewValue;

			console.log(form);

			var search = {
				q: form.query.$viewValue || '',
				image: form.imageId
			};

			//console.log(SearchService.search())

		};

	}]);