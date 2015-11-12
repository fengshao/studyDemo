angular.module('webApp').factory('DashboardModel',['$q','$http',function ($q,$http) {
    return {
        //获取邀请码排行榜
        createConfig : function(username , password) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/rest/dashboard/createconfig',
                params : {
                    username : username,
                    password : $.md5(password)
                }
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    d.resolve(ret.url);
                } else {
                    d.reject(ret.msg);
                }
            }).error(function(error) {
                d.reject('生成dashboard配置失败');
            });
            return p;
        }
    };
}]);
