angular.module('webApp').filter('storageUnit',['$filter',function($filter) {
    //将102938293KB转换为TB MB KB GB 的形式
    //格式化数字
    function format(num) {
        return $filter('number')(num , 2);
    }

    //将kb转换为可以显示的内容
    return function(num) {
        if(!num) {
            return '0';
        }
        num = num / 1024;
        if(num > 1024) {
            var mb = num / 1024;
            if(mb > 1024) {
                var gb = mb / 1024;
                if(gb > 1024) {
                    var tb = gb / 1024;
                    return format(tb) + ' TB';
                } else {
                    return format(gb) + ' GB';
                }
            } else {
                return format(mb) + ' MB';
            }
        } else {
            return format(num) + ' KB';
        }
    };
}]).filter('userType',[function() {
    var map = {
        '0':'租户',
        '1':'用户',
        '2':'后台超级管理员',
        '3':'后台普通管理员'
    };
    return function(userType) {
        return map[userType] || map[1];
    };
}]).filter('vipName' , [function() {
    //获取用户类型
    var map = {
        '0' : '免费用户',
        '1' : 'VIP用户',
        '2' : '钻石用户'
    };
    return function(vipId) {
        return map[vipId] || map[0];
    }
}]).filter('volume_usage' , [function() {
    //获取日志使用率
    return function(used,total) {
        var percent = (used / total);
        if(isNaN(percent)) {
            return '-';
        } else {
            return (percent * 100).toFixed(2) + '%';
        }
    }
}]).filter('longToDateTime', ['TIME_FORMAT',function(TIME_FORMAT) {
    return function(millis) {
        var time = moment(parseInt(millis)).format(TIME_FORMAT.LONG);
        if(/^1970/.test(time)) {
            return '';
        }
        return time;
    };
}]).filter('isOnline' , [function() {
    //用户在线状态
    return function(state) {
        if(state === "1" || state === 1) {
            return '在线';
        }
        return '不在线';
    };
}]).filter('payRecordMsg' , [function() {
    return function(msg) {
        msg = msg || '';
        return msg.replace(/licensekey：[\S]+ /,'');
    };
}]).filter('vipCodeStatus' , [function() {
    //vip激活码状态
    var map = {
        '0' : '未分配',
        '1' : '已分配(未激活)',
        '2' : '已激活'
    };
    return function(code) {
        return map[code] || '未定义';
    }
}]).filter('vipApplyStatus' , [function() {
    //vip申请审核状态
    var map = {
        '1' : '待审核',
        '2' : '已审核'
    };
    return function(code) {
        return map[code] || '未定义';
    }
}]);

