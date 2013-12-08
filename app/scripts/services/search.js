angular.module('RPM.services')

	.service('SearchService', ['$http', function ($http) {

		this.search = function (params) {
			return $http.post('/stubs/search', params).then(function (res) {
				return res;
			});
		};

	}]);