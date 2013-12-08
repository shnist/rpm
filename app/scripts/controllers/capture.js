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


		$scope.tagImage = function (tag) {

			var temp;
			var data;

			// if (tag.album) temp = tag.album;
			// if (tag.playlist) temp = tag.playlist;

			data.id = $scope.states.image;
			data.artist = tag.album.artist;
			data.album = tag.album.name;

			CaptureService.tag(data);

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