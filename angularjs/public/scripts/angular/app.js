angular.module('webApp', [
	'ngRoute',
	'ngSanitize',
	'ngLocale',
	'ui.bootstrap'
]).factory('SafeApply', [function () {
	return function ($scope, fn) {
		var phase = $scope.$root.$$phase;
		if (phase == '$apply' || phase == '$digest') {
			if (fn) {
				$scope.$eval(fn);
			}
		} else {
			if (fn) {
				$scope.$apply(fn);
			} else {
				$scope.$apply();
			}
		}
	};
}]).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../page/test1.html',
			controller: 'InviteDetailController'
		})
		.when('/user', {
			templateUrl: '../page/test2.html',
			controller: 'UserController'
		})
		.otherwise({
			redirectTo: '/'
		});

	$httpProvider.defaults.timeout = 180 * 1000;

}]).run(['$rootScope', '$location', 'SafeApply', function ($rootScope, $location, $SafeApply) {

}]);

