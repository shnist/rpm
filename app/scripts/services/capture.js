angular.module('RPM.services')

	.service('CaptureService', ['$http', function ($http) {


		var url = 'http://localhost:8080';


		var json = {
			"status": "okay",
			"error": {
				"message": "there was an error"
			}
		};


		this.saveImage = function () {
			return $http.get(url + '/snap').then(function (res) {

				if (res.status === 200 && res.data.image) {
					delete json.error;
					json.capture = res.data;
				}

				return json;
			});
		};

		this.changeCamera = function (cameraId) {
			return $http.post(url + '/camera', cameraId).then(function (res) {
				return res;
			});
		}

		this.getImage = function () {
			return $http.get(url + '/identify', { cache: false }).then(function (res) {

				return res;

			});
		};


		this.tag = function (params) {

			var path = url + '/update?id=' + params.id + '&artist=' + params.artist + '&albumName=' + params.album;

			return $http.post(path).then(function (res) {
				return res;
			});
		};


	}]);