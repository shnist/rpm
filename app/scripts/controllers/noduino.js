angular.module('RPM.controllers').controller('Noduino', 
	['$scope', 'NoduinoService', 
	function ($scope, NoduinoService) {
		console.log(NoduinoService);

		$scope.connectToArduino = function () {
			return NoduinoService.connect();
		};


}]);