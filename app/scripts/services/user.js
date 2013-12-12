angular.module('RPM.services')
	.service('UserService', ['$http', function ($http) {

		this.login = function (user) {
			return $http.post('/login', user).then(function (res) {
				return res;
			});
		};


		this.check = function () {
			return $http.get('/api/spotify', function (res) {
				return res;
			});
		};

	}]);