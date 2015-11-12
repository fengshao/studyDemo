/**
 * 用户管理
 */
angular.module('webApp').controller('UserController', ['$routeParams', '$filter', '$rootScope', '$scope', '$q', function ($routeParams, $filter, $rootScope, $scope, $q) {
	//页面标题
	$rootScope.title = '用户管理';
	$scope.test1 = "test2";
	//当前第几页
	$scope.currentPage = 1;
	//最多显示多少页
	$scope.maxPageSize = 10;
	//每页显示多少条
	$scope.itemsPerPage = 10;
	//一共多少条
	$scope.totalItems;
	var dataList = [];


	function showUserList(resetPage) {
		if (resetPage) {
			$scope.currentPage = 1;
		}
		var filteredList = $filter('filter')(dataList, $scope.keyword);

		var startIdx = ($scope.currentPage - 1) * $scope.itemsPerPage;
		var endIdx = startIdx + $scope.itemsPerPage;

		//保存一共多少条
		$scope.totalItems = filteredList.length;
		//显示到页面的数据
		var list = filteredList.slice(startIdx, endIdx);
		$scope.tenantsList = list;

	}

	tableData();
	function tableData() {
		for (var i = 0; i < 30; i++) {
			var tdData = {
				id: "",
				name: ""
			};
			tdData.id = i;
			tdData.name = "name" + i;
			dataList.push(tdData);
		}
		showUserList();
	}

	//暴露显示用户列表的方法
	$scope.showUserList = showUserList;

}]);
