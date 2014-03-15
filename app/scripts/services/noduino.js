angular.module('RPM.services')
	.service('NoduinoService', ['$http', function ($http) {

		this.connect = function () {
			return $http.get('/connect').then(function (res) {
				return res;
			});
		};

	}]);