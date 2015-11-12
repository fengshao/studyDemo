angular.module('webApp').factory('VolumeModel',['$q','$http','TIME_FORMAT',function ($q,$http,TIME_FORMAT) {
    return {
        //获取系统日志总量
        getLogVolume : function(params) {
            var d = $q.defer(),
                p = d.promise;

            var licensekey = (params && params.licensekey) || "root";

            $http({
                method : 'GET',
                url : '/api/manage/user/total/' + licensekey
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === "0" || ret.code === 0)) {
                    d.resolve(ret);
                } else {
                    d.reject('获取系统日志总量失败');
                }
            }).error(function(error) {
                d.reject('获取系统日志总量失败');
            });
            return p;
        },
        //获取某一个租户在一段时间的上传日志量的统计数据
        /**
         * params里存在的参数如下：
         * startTime 开始时间
         * endTime   结束时间
         * licensekey 租户的licensekey，如果不传，就是查系统所有的日志
         */
        getVolumeChartData : function(params) {
            if(params.startTime && !/^\d+$/.test(params.startTime)) {
               params.startTime = moment(params.startTime , TIME_FORMAT.LONG).toDate().getTime();
            }
            if(params.endTime && !/^\d+$/.test(params.endTime)) {
                params.endTime = moment(params.endTime , TIME_FORMAT.LONG).toDate().getTime();
            }

            var licensekey = (params && params.licensekey) || "root";
            var type = (params && params.type) || 'day';

            var url = '/api/manage/user/metrics/' + licensekey + '/' + type + '/' + params.startTime + '/' + params.endTime;

            var d = $q.defer(),
                p = d.promise;
            $http({
                method : 'GET',
                url : url
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === '0' || ret.code === 0)) {
                    d.resolve(ret.result);
                } else {
                    if(params.licensekey) {
                        d.reject('获取租户的日志统计图数据失败');
                    } else {
                        d.reject('获取系统的日志统计图数据失败');
                    }
                }
            }).error(function(error) {
                if(params.licensekey) {
                    d.reject('获取租户的日志统计图数据失败');
                } else {
                    d.reject('获取系统的日志统计图数据失败');
                }
            });
            return p;
        },

        //获取 当天/当前星期/当前月 的日志总量，日志条数，字节时速，日志条数时速
        getVolumeByCurrentDate : function(params) {

            var licensekey = (params && params.licensekey) || "root";
            var type = (params && params.type) || 'day';
            var startTime = moment().toDate().getTime();

            var d = $q.defer(),
                p = d.promise;
            $http({
                method : 'GET',
                url : '/api/manage/user/metric/' + licensekey + '/' + type + '/' + startTime
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === "0" || ret.code === 0)) {
                    d.resolve(ret);
                } else {
                    if(params && params.licensekey) {
                        d.reject('获取租户的当天/当前星期/当前月 的日志总量，日志条数，字节时速，日志条数时速失败');
                    } else {
                        d.reject('获取系统的当天/当前星期/当前月 的日志总量，日志条数，字节时速，日志条数时速失败');
                    }
                }
            }).error(function(error) {
                if(params && params.licensekey) {
                    d.reject('获取租户的当天/当前星期/当前月 的日志总量，日志条数，字节时速，日志条数时速失败');
                } else {
                    d.reject('获取系统的当天/当前星期/当前月 的日志总量，日志条数，字节时速，日志条数时速失败');
                }
            });
            return p;
        }

    };
}]);
