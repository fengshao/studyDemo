
angular.module('webApp').factory('VipcodeModel',['$q','$http',function ($q,$http) {
    return {
        //列表
        list: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vipcode/all'
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
        //已激活列表
        ,used: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vipcode/used'
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
        //未激活列表
        ,unused: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vipcode/unused'
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
        //已分配列表
        ,assigned: function(flag) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vipcode/assigned/' + flag
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
        //分配VIP码
        ,update: function(param) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vipcode/update?'
                        + 'startId=' + param.startId
                        + '&endId=' + param.endId
                        + '&company=' + param.company
                        + '&remarks=' + param.remarks
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code == 0)) {
                    d.resolve(ret.result);
                } else {
                    d.reject('分配失败');
                }
            }).error(function(error) {
                d.reject('分配失败');
            });
            return p;
        }
    };
}]);

