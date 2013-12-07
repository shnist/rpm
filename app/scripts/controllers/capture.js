angular.module('RPM.controllers')

	.controller('Capture', ['$scope', 'CaptureService', 'SearchService', function ($scope, CaptureService, SearchService) {


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

			console.log(data);

		};

	}]);