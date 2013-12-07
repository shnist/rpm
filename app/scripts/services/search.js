angular.module('RPM.services')

	.service('SearchService', ['$http', function ($http) {

		this.search = function (params) {
			return $http.post(url + '/search', params).then(function (res) {
				console.log('search api res', res);
				return res;
			});
		};

	}]);