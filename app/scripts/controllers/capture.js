angular.module('RPM.controllers')

	.controller('Capture', ['$scope', '$location', 'CaptureService', 'SearchService', 'SpotifyService', function ($scope, $location, CaptureService, SearchService, SpotifyService) {


		$scope.states = {
			query: null,
			image: null,
			results: null,
			tagged: false
		};


		// store the image data object
		$scope.imageCapture = null;


		$scope.saveImage = function () {
			return CaptureService.saveImage();
		};


		$scope.getImage = function () {
			return CaptureService.getImage();
		};

		$scope.changeCamera = function () {
			return CaptureService.changeCamera(1);
		};

		$scope.tagImage = function () {

			console.log('tag image', this);

			var data = {};
			var uri = this.album.uri;

			data.id = $scope.states.image;
			data.artist = this.album.artist;
			data.album = this.album.uri;

			CaptureService.tag(data).then(function (res) {
				console.log('tagging response', res);

				if (res.data.status === "error") {
					console.log('tag failed', res.data.message);
					return false;
				}

				$scope.states.tagged = true;

				$scope.play(uri);
			});

		};


		$scope.searchSpotify = function (form) {

			var query = form.query.$viewValue;
			var image = $scope.states.image;

			console.log('search', form);

			SearchService.search(query, image).then(function (res) {

				var data = res.data;
				console.log('spotify res', data);
				if (data.spotify.results) {
					$scope.states.query = data.spotify.query;
					$scope.states.results = data.spotify.results;
				}

			});

		};



		$scope.play = function (uri) {

			SpotifyService.play(uri).then(function (res) {
				console.log('spotify service res', res);
			});

		};



		$scope.$watch(function () {
			return $scope.states.tagged;
		}, function (n, o) {
			console.log('tagged change', n);
		});



	}]);