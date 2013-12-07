angular.module('RPM.controllers')

	.controller('Capture', ['$scope', 'CaptureService', function ($scope, CaptureService) {

		$scope.getImage = function () {
			return CaptureService.getImage();
		};

	}]);