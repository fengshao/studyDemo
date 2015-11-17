angular.module('webApp', [
	'ngRoute',
	'ngSanitize',
	'ngLocale',
	'ngAnimate',
	'ui.bootstrap'
]).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../page/test1.html',
			controller: 'InviteDetailController'
		})
		.when('/user', {
			templateUrl: '../page/test2.html',
			controller: 'UserController'
		})
		.when('/formTest', {
			templateUrl: '../page/formTest.html',
			controller: 'FormTestController'
		})
		.otherwise({
			redirectTo: '/user'
		});

	$httpProvider.defaults.timeout = 180 * 1000;

}]);

