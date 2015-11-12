angular.module('webApp').factory('NoticeModel',['$q','$http',function ($q,$http) {
    return {
        //获取系统公告列表
        list: function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/manage/notice/all'
            }).success(function(ret) {
                if(ret && ret.code === '0') {
                    d.resolve(ret);
                } else {
                    d.reject('err');
                }
            }).error(function(error) {
                d.reject('获取列表失败');
            });
            return p;
        }

        //添加系统公告
        ,add: function(notice) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/manage/notice',
                data : notice
            }).success(function(ret) {
                if(ret && ret.code === '0') {
                    d.resolve(ret);
                } else {
                    d.reject('err');
                }
            }).error(function(error) {
                d.reject('失败');
            });
            return p;
        }

        //修改系统公告
        ,modify: function(notice) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'PUT',
                url : '/api/manage/notice',
                data : notice
            }).success(function(ret) {
                if(ret && ret.code === '0') {
                    d.resolve(ret);
                } else {
                    d.reject('err');
                }
            }).error(function(error) {
                d.reject('失败');
            });
            return p;
        }

        //预览系统公告
        ,preview: function(notice) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/manage/notice/preview',
                data : notice
            }).success(function(ret) {
                if(ret && ret.code === '0') {
                    d.resolve(ret);
                } else {
                    d.reject('err');
                }
            }).error(function(error) {
                d.reject('失败');
            });
            return p;
        }

        //删除系统公告
        ,delete: function(id) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'DELETE',
                url : '/api/manage/notice',
                params : {
                    id : id
                }
            }).success(function(ret) {
                if(ret && ret.code === '0') {
                    d.resolve(ret);
                } else {
                    d.reject('err');
                }
            }).error(function(error) {
                d.reject('失败');
            });
            return p;
        }
    };
}]);

