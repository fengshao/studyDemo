/**
 * 使用云志系统发送邮件
 */
angular.module('webApp').factory('$SendEmail',['$q','$http',function ($q,$http) {
    /**
     * emailList 邮件列表       字符串(发给一个人)/数组(发给多个人)
     * emailTitle 邮件标题      字符串
     * emailContent 邮件内容    字符串
     */
    return function(emailList , emailTitle , emailContent) {
        var d = $q.defer(),
            p = d.promise;

        var emailParam = "";
        if(typeof emailList === "string") {
            emailParam = emailList;
        } else {
            emailParam = emailList.join(",");
        }
        $http({
            method : 'POST',
            url : '/api/sys/sendmail',
            data : {
                email : emailParam,
                title : emailTitle,
                content : emailContent
            }
        }).success(function(ret,code,headers) {
            if(code === 200 && (ret && ret.code === 0)) {
                d.resolve();
            } else {
                d.reject('邮件发送失败');
            }
        }).error(function(error) {
            d.reject('邮件发送失败');
        });
        return p;
    };
}]);
