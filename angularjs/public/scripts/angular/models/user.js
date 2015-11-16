angular.module('webApp').factory('UserModel',['$q','$http',function ($q,$http) {
    return {
        //获取租户列表
        getData : function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                //url : '/angulars/public/scripts/angular/models/Customers_JSON.php'
                url : '../public/scripts/angular/models/Customers_JSON.php'
            }).success(function(ret,code,headers) {
                d.resolve(ret);
            }).error(function(error) {
                d.reject('获取租户列表失败');
            });
            return p;
        }
    };
}]);
