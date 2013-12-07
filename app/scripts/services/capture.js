angular.module('RPM.services')
	
	.service('CaptureService', ['$http', function ($http) {


		var url = 'http://localhost:8080';


		this.getImage = function () {
			return $http.get(url + '/snap').then(function (res) {

				var json = {
					"status": "okay",
					"error": {
						"message": "there was an error"
					}
				};

				if (res.status === 200 && res.data.image) {
					delete json.error;
					json.capture = res.data;
				}

				return json;
			});
		};


	}]);