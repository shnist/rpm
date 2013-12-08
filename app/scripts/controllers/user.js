angular.module('RPM.controllers')

	.controller('User', ['$scope', function ($scope, UserService) {


		$scope.login = function (form) {

			if (!form || !form.username || !form.password) return false;

			if (!form.username.$viewValue || !form.password.$viewValue) return false;

			var user = {
				username: form.username.$viewValue,
				password: form.password.$viewValue
			};

		};

	}]);