angular.module('RPM.services')

	.service('SearchService', ['$http', function ($http) {

		this.search = function (query, image) {		
			console.log('SearchService', query, image);
			return $http.get('/search?q=' + query + '&image=' + image).then(function (res) {
				return res;
			});
		};

	}]);