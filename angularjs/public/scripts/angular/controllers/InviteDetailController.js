/**
 * 用户管理
 */
angular.module('webApp').controller('InviteDetailController',['$routeParams','$rootScope','$scope',function ($routeParams,$rootScope,$scope) {
    //页面标题
    $rootScope.title = '邀请码';
    //左侧菜单
    $rootScope.leftNav = 'invitecode';
    //显示邀请码详细
    $rootScope.invitecodedetail = true;
    //隐藏 用户、日志量、操作日志
    $rootScope.licensekey = '';
    $scope.test1 = "test1";
    $scope.pageClass = 'test1';

}]);
