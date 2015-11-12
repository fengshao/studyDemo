
angular.module('webApp').factory('LevelModel',['$q','$http',function ($q,$http) {
    return {
        //编辑
        edit: function(levelObj) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/vip/info',
                data : levelObj
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code == 0)) {
                    d.resolve();
                } else {
                    d.reject('保存失败');
                }
            }).error(function(error) {
                d.reject('保存失败');
            });
            return p;
        }
        //列表
        ,list: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vip/info'
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
        //删除
        ,delete: function(id) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'DELETE',
                url : '/api/vip/info?id=' + id
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code == 0)) {
                    d.resolve(ret.result);
                } else {
                    d.reject('删除失败');
                }
            }).error(function(error) {
                d.reject('删除失败');
            });
            return p;
        }
    };
}]);

