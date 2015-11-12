
angular.module('webApp').factory('VipapplyModel',['$q','$http',function ($q,$http) {
    return {
        //列表
        list: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vip/applycorporateuser'
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code == 0)) {
                    d.resolve(ret.result);
                } else {
                    d.reject('获取失败');
                }
            }).error(function(error) {
                d.reject('获取失败');
            });
            return p;
        }
        //通过审核的列表
        ,passed: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vip/passcorporateuser'
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code == 0)) {
                    d.resolve(ret.result);
                } else {
                    d.reject('获取失败');
                }
            }).error(function(error) {
                d.reject('获取失败');
            });
            return p;
        }
        //通过申请
        ,pass: function(id) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/vip/applycorporateuser?id=' + id
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code == 0)) {
                    d.resolve('通过审核成功');
                } else {
                    d.reject('通过审核失败');
                }
            }).error(function(error) {
                d.reject('通过审核失败');
            });
            return p;
        }
    };
}]);

