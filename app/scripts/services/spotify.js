angular.module('RPM.services')
	.service('SpotifyService', ['$http', function ($http) {


		this.play = function (uri) {
			console.log('SpotifyService');
			var encoded = encodeURI('/play?uri=' + uri);

			return $http.get(encoded).then(function (res) {
				if (res.data.status === 'error') return false;

				return res;
			});
		};


	}]);