angular.module('RPM.services')
	.service('SpotifyService', ['$http', function ($http) {


		this.play = function (uri) {
			return $http('/play?uri=' + uri).then(function (res) {
				if (res.data.status === 'error') return false;

				return res;
			});
		};


	}]);