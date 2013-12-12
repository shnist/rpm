angular.module('RPM.controllers')
	.controller('Identify', ['$scope', 'CaptureService', 'SpotifyService', function ($scope, CaptureService, SpotifySerivce) {

		$scope.getImage = function () {
			return CaptureService.getImage().then(function (res) {

				console.log('get image', res.data);

				SpotifySerivce.play(res.data.albumName).then(function (res) {


					console.log('NOW PLAYING', res.data);

				});


			});
		};


	}]);