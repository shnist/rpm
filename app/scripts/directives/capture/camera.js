angular.module('RPM.directives')

	.directive('camera', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'scripts/templates/capture/camera.html',
			link: function (scope, elem, attrs) {

				var createImage = function (data) {
					elem.find('img')[0].src = data;
				};

				scope.getImage().then(function (data) {

					if (data.capture) {
						createImage(data.capture.image);
					}

				});

				console.log('test');

			}
		};
	});