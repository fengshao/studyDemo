angular.module('webApp').factory('VolumeUtil',['TimeUtil',function ($TimeUtil) {
    return {
        //获取日志量统计图使用的数据
        formatVolumeChartData : function(startTime, endTime , list) {
            //抽取出时间值
            var timeArr = _.map(list , function(obj) {
                return parseInt(obj.time);
            });
            //获取合适的format
            var timeFormat = $TimeUtil.getPrettyFormatTimeStr(startTime , endTime , timeArr);
            //换成angular-echarts
            var ret0 = _.map(list , function(obj) {
                return {
                    x : $TimeUtil.getDateTimeString(parseInt(obj.time)),
                    y : Math.floor(parseInt(obj.bytes) / 1024)
                };
            });
            var ret1 = _.map(list , function(obj) {
                return {
                    x : $TimeUtil.getDateTimeString(parseInt(obj.time)),
                    y : parseInt(obj.count)
                };
            });
            return [ret0 , ret1];
        }
    };
}]);
