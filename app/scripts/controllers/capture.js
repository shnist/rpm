angular.module('RPM.controllers')

	.controller('Capture', ['$scope', 'CaptureService', 'SearchService', function ($scope, CaptureService, SearchService) {


		$scope.states = {
			query: null,
			image: null,
			results: null
		};


		$scope.saveImage = function () {
			return CaptureService.saveImage();
		};


		$scope.getImage = function () {
			return CaptureService.getImage();
		};


		$scope.tagImage = function () {

			console.log('tag image', this);

			var data = {};

			data.id = $scope.states.image;
			data.artist = this.album.artist;
			data.album = this.album.name;

			CaptureService.tag(data).then(function (res) {
				console.log('tagging response', res);
			});

		};


		$scope.searchSpotify = function (form) {

			var query = form.query.$viewValue;
			var image = $scope.states.image;

			SearchService.search(query, image).then(function (res) {

				var data = res.data;

				if (data.spotify.results) {
					$scope.states.query = data.spotify.query;
					$scope.states.results = data.spotify.results;
				}

			});

		};

	}]);