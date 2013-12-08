angular.module('RPM.controllers')

	.controller('User', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {


		$scope.connected = false;


		$scope.profile = null;


		$scope.login = function (form) {

			if (!form || !form.username || !form.password) return false;

			if (!form.username.$viewValue || !form.password.$viewValue) return false;

			var user = {
				username: form.username.$viewValue,
				password: form.password.$viewValue
			};

			UserService.login(user).then(function (res) {
				if (res.data.connected) {
					$scope.connected = true;
					$scope.profile = res.data.profile;
				}
				console.log('UserService', res.data);
			});

		};


		$scope.isUserConnected = function () {
			console.log('check if user is connected');
			UserService.check().then(function (res) {
				console.log('isConnected res', res);

				if (!res.data.connected) return false;

				$scope.connected = true;

				$scope.profile = res.data.profile;
			});

		};


		if (!$scope.connected) {
			$scope.isUserConnected();
		}


		$scope.$watch(function () {
			return $scope.connected;
		}, function (n, o) {
			if (n) $location.path('/capture');
		});


	}]);