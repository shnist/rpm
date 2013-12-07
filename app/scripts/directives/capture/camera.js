angular.module('RPM.directives')

	.directive('camera', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'scripts/templates/capture/camera.html',
			scope: '=',
			link: function (scope, elem, attrs) {

				var createImage = function (data) {
					elem.find('img')[0].src = data;
				};


				var saveImage = function () {

					scope.saveImage().then(function (data) {

						if (data.capture) {
							createImage(data.capture.image);
							scope.imageId = data.capture.id;
						}

					});

				};


				var getImage = function () {
					scope.getImage();
				};

				saveImage();
				console.log(scope);

			}
		};
	});