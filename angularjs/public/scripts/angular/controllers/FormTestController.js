/**
 * Created by xiaojinfeng on  2015/11/17 9:23 .
 */
angular.module('webApp').controller('FormTestController', ['$rootScope', '$scope', function ($rootScope, $scope) {
	//标题
	$rootScope.title = '表单测试';
	$scope.test1 = "formTest";
	$scope.pageClass = 'formTest';
	$scope.name = 'testName';
	$scope.email = 'taet@qq.com';

	$scope.getFormStatus = function () {
		console.log($scope.myForm);
	}

}]);

