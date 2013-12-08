angular.module('RPM.controllers')

	.controller('Capture', ['$scope', 'CaptureService', 'SearchService', function ($scope, CaptureService, SearchService) {


		$scope.states = {
			query: null,
			image: null,
			results: null
		};


		$scope.imageId = null;


		$scope.saveImage = function () {
			return CaptureService.saveImage();
		};


		$scope.getImage = function () {
			return CaptureService.getImage();
		};


		$scope.searchSpotify = function (form) {

			var data = {
				q: form.query.$viewValue,
				image: $scope.imageId
			};

			SearchService.search(data).then(function (res) {

				var data = res.data;

				if (data.spotify.results) {
					$scope.states.query = data.spotify.query;
					$scope.states.results = data.spotify.results;
				}

			});

		};

	}]);