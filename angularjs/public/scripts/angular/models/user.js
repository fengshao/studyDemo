angular.module('webApp').factory('UserModel',['$q','$http',function ($q,$http) {
    return {
        //获取租户列表
        getTenants : function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/manage/tenants'
            }).success(function(ret,code,headers) {
                d.resolve(ret);
            }).error(function(error) {
                d.reject('获取租户列表失败');
            });
            return p;
        },
        //根据licensekey获取某个租户下面的账号列表
        getUsersByTenant : function(licensekey) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/manage/users',
                params : {
                    licensekey : licensekey
                }
            }).success(function(ret,code,headers) {
                d.resolve(ret);
            }).error(function(error) {
                d.reject('获取某个租户下的用户列表失败');
            });
            return p;
        },
        //获取一个用户的操作日志
        /**
         * start_time:开始时间
         * end_time:结束时间
         * keyWord:关键词
         * pageNum:第几页
         * pageSize:一页多少条
         * licensekey:指定用户licensekey
         */
        getUserOperations : function(params) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/auditlog',
                params : params
            }).success(function(ret,code,headers) {
                d.resolve(ret);
            }).error(function(error) {
                d.reject('获取用户操作日志列表失败');
            });
            return p;
        },
        /**
         * 获取用户信息
         * userid为用户的id
         */
        getUserInfo : function(userid) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : 'api/user/' + userid
            }).success(function(ret,code,headers) {
                d.resolve(ret);
            }).error(function(error) {
                d.reject('获取用户信息失败');
            });
            return p;
        },
        /**
         * 修改密码
         */
        modifyPass : function(userid,oldPassword,newpass) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/user/' + userid,
                data : {
                    oldPassword : oldPassword,
                    newPassword : newpass
                }
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret === true || ret === "true")) {
                    d.resolve();
                } else {
                    d.reject('修改密码失败');
                }
            }).error(function(error) {
                d.reject('修改密码失败');
            });
            return p;
        }

        /**
         * 获取全部vip
         */
        ,getAllVip: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/vip/users'
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code === '0')) {
                    d.resolve(ret);
                } else {
                    d.reject('获取全部vip失败');
                }
            }).error(function(error) {
                d.reject('获取全部vip失败');
            });
            return p;
        }

        /**
         * 根据licensekey获取vip信息
         */
        ,getVipInfo : function(licensekey) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : 'api/vip/user/' + licensekey
            }).success(function(ret,code,headers) {
                d.resolve(ret);
            }).error(function(error) {
                d.reject('获取信息失败');
            });
            return p;
        }

        /**
         * 普通用户升vip
         */
        ,addVip: function(licensekey, vipId, monthNumber) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/vip/user/add?licensekey=' + licensekey + '&vipId=' + vipId + '&number=' + monthNumber
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code === '0')) {
                    d.resolve();
                } else {
                    d.reject('升级失败');
                }
            }).error(function(error) {
                d.reject('升级失败');
            });
            return p;
        }

        /**
         * 变更级别
         */
        ,updateVip : function(licensekey, vipId, monthNumber) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/vip/user/add?licensekey=' + licensekey + '&vipId=' + vipId + '&number=' + monthNumber
            }).success(function(ret,code,headers) {
                if(code === 200 && (ret.code === '0')) {
                    d.resolve();
                } else {
                    d.reject('级别变更失败');
                }
            }).error(function(error) {
                d.reject('级别变更失败');
            });
            return p;
        }

        /**
         * 获取在线用户
         */
        ,getOnline: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/manage/tenants/online'
            }).success(function(ret,code,headers) {
                if(code === 200) {
                    d.resolve(ret);
                } else {
                    d.reject('获取失败');
                }
            }).error(function(error) {
                d.reject('获取失败');
            });
            return p;
        },
        exportUsers : function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/rest/user/export'
            }).success(function(ret,code,headers) {
                if(code === 200) {
                    d.resolve(ret);
                } else {
                    d.reject('导出通讯录失败');
                }
            }).error(function(error) {
                d.reject('导出通讯录失败');
            });
            return p;
        }
    };
}]);
