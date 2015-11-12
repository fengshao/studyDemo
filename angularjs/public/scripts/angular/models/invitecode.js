
angular.module('webApp').factory('InviteCodeModel',['$q','$http',function ($q,$http) {
    return {
        //获取邀请码排行榜
        getRanks : function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/invitecode/inviterank'
                //url : '/api/manage/tenants'
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    var list = [];
                    var dataStr = ret.data || "[]";
                    try {
                        list = JSON.parse(dataStr);
                    }catch(e){}
                    if(!$.isArray(list)) {
                        list = [];
                    }
                    d.resolve(list);
                } else {
                    d.reject('获取邀请码排行榜失败');
                }
            }).error(function(error) {
                d.reject('获取邀请码排行榜失败');
            });
            return p;
        },
        //获取邀请详情
        getInviteDetail : function(licenseKey , accountName) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/invitecode/inviteDetail',
                params : {
                    licensekey : licenseKey,
                    accountName : accountName
                }
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    var map = {
                        registerd : ret.registerd,
                        activated : ret.activated,
                        used : ret.used
                    };
                    for(var key in map) {
                        try {
                            map[key] = JSON.parse(map[key]);
                        } catch(e){
                            map[key] = [];
                        }
                    }
                    d.resolve(map);
                } else {
                    d.reject('获取邀请码详情失败');
                }
            }).error(function(error) {
                d.reject('获取邀请码详情失败');
            });
            return p;
        },
        //获取支付申请
        getApplyInfo : function(userId) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/pay/' + userId
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    d.resolve(ret.result || {});
                } else {
                    d.reject();
                }
            }).error(function(error) {
                d.reject();
            });
            return p;
        },
        //给用户支付
        applyForUser : function(userId , number , remarks) {

            remarks = remarks || '已支付' + number + '元';

            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'POST',
                url : '/api/pay/' + userId + '/' + number + '/' + encodeURIComponent(remarks)
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    d.resolve('支付成功');
                } else {
                    d.reject('支付失败');
                }
            }).error(function(error) {
                d.reject('支付失败');
            });
            return p;
        },
        //查看支付历史记录
        viewPayHistory : function(userId) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/pay/records/' + userId
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    d.resolve(ret.result || []);
                } else {
                    d.reject('获取支付历史信息失败');
                }
            }).error(function(error) {
                d.reject('获取支付历史信息失败');
            });
            return p;
        },
        //获取支付申请列表
        getApplyInfoList : function() {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/pay/alldetail'
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    d.resolve(ret.result || []);
                } else {
                    d.reject('获取支付申请状态失败');
                }
            }).error(function(error) {
                d.reject('获取支付申请状态失败');
            });
            return p;
        },
        //记录用户刷单金额
        recordPayInvalid : function(userId , money) {
            var d = $q.defer(),
                p = d.promise;

            $http({
                method : 'GET',
                url : '/api/pay/invalid/' + userId + '/' + money
            }).success(function(ret,code,headers) {
                if(ret && (ret.code === 0 || ret.code === "0")) {
                    d.resolve();
                } else {
                    d.reject('记录用户刷单金额失败');
                }
            }).error(function(error) {
                d.reject('记录用户刷单金额失败');
            });
            return p;
        }
    };
}]);
