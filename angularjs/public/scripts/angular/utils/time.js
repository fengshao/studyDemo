angular.module('webApp')
    .factory('TIME_FORMAT', [function () {
        return {
            LONG: 'YYYY-MM-DD HH:mm:ss',
            YEAR: 'YYYY',
            HOUR_MINUTE: 'HH:mm',
            MONTH_DAY: 'MM-DD',
            FULL_TIME: 'HH:mm:ss',
            MONTH_DAY_HOUR_MINUTE: 'MM-DD HH:mm',
            FULL_DATE: 'YYYY-MM-DD'
        };
    }])
    .factory('TimeUtil', ['TIME_FORMAT', function (TIME_FORMAT) {
        return {
            //获取subtract的日期
            getSubtractDate: function (num, unit) {
                num = parseInt(num);
                var startTime = moment().subtract(num, unit).format('YYYY-MM-DD HH:mm:ss');
                var endTime = moment().format('YYYY-MM-DD HH:mm:ss');
                return {
                    startTime: startTime,
                    endTime: endTime
                };
            },
            //获取日期时间
            getDateTimeString : function(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss");
            },
            //获取时间表示形式
            getPrettyFormatTimeStr: function (max, min, timeArr) {
                var maxMoment = moment(max);
                var minMoment = moment(min);
                var targetFormat = TIME_FORMAT.LONG;
                //一开始理想的时间
                var list = [
                    TIME_FORMAT.FULL_DATE, //YYYY-MM-DD
                    TIME_FORMAT.MONTH_DAY,//MM-DD
                    TIME_FORMAT.HOUR_MINUTE,//HH:mm
                    TIME_FORMAT.FULL_TIME //HH:mm:ss
                ];
                //不够用了之后，妥协的时间
                var targetList = [
                    null,
                    TIME_FORMAT.FULL_DATE,//YYYY-MM-DD
                    TIME_FORMAT.MONTH_DAY_HOUR_MINUTE,//MM-DD HH:mm
                    TIME_FORMAT.FULL_TIME //HH:mm:ss
                ];
                //如果跨年了，返回 YYYY-MM-DD
                if (maxMoment.format(TIME_FORMAT.YEAR) != minMoment.format(TIME_FORMAT.YEAR)) {
                    targetFormat = TIME_FORMAT.FULL_DATE;
                    //如果跨天了
                } else if (maxMoment.format(TIME_FORMAT.MONTH_DAY) != minMoment.format(TIME_FORMAT.MONTH_DAY)) {
                    targetFormat = TIME_FORMAT.MONTH_DAY;
                    //如果跨分钟了
                } else if (maxMoment.format(TIME_FORMAT.HOUR_MINUTE) != minMoment.format(TIME_FORMAT.HOUR_MINUTE)) {
                    targetFormat = TIME_FORMAT.HOUR_MINUTE;
                    //精确到秒
                } else {
                    targetFormat = TIME_FORMAT.FULL_TIME;
                }

                var categoryList = _.chain(timeArr).map(function (time) {
                    return moment(time).format(targetFormat);
                }).uniq().value();

                //如果有一半时间都相同，可以考虑用下一级时间
                if ((categoryList.length / timeArr.length) < 0.5) {
                    var idx = -1;
                    for (var i = 0, len = list.length; i < len; i++) {
                        if (targetFormat === list[i]) {
                            idx = i;
                            break;
                        }
                    }
                    if (idx != -1) {
                        idx++;
                        if (targetList[idx]) {
                            targetFormat = targetList[idx];
                        }
                    }
                }
                //这时候返回的format，就可用了
                return targetFormat;
            },
            //获取开始时间的整型值
            getStartTimeMillis : function(timeStr) {
                if(!timeStr) {
                    return 0;
                }
                var m = moment(timeStr).format(TIME_FORMAT.FULL_DATE) + ' 00:00:00';
                return moment(m , TIME_FORMAT.LONG).toDate().getTime();
            },
            //获取结束时间的整型值
            getEndTimeMillis : function(timeStr) {
                if(!timeStr) {
                    return new Date().getTime();
                }
                var m = moment(timeStr).format(TIME_FORMAT.FULL_DATE) + ' 23:59:59';
                return moment(m , TIME_FORMAT.LONG).toDate().getTime();
            }
        };
    }]);
