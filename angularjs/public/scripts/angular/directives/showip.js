angular.module('webApp')
    .directive('showip', ['$http','$rootScope',function ($http,$rootScope) {
        var tooltipArr = [];
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                var ip = attrs.showip.replace(/\:.+?\:/ , '');
                if(!ip) {
                    return;
                }
                var $tooltip ;
                $(el).on("mouseenter", function() {
                    var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + ip;
                    var script = $('<script></script>');
                    $('body').append(script);
                    script[0].onload = function() {
                        var msg = '';
                        if(/\:\:f/.test(attrs.showip)) {
                            msg = '本地局域网';
                        } else {
                            msg = remote_ip_info.country + ' ' + remote_ip_info.province + ' ' + remote_ip_info.city;
                        }
                        msg += '<br />点击查看详情'
                        for(var i = 0, len = tooltipArr.length ; i < len ; i++) {
                            tooltipArr[i].tooltip('destroy');
                        }
                        tooltipArr.length = 0;
                        $tooltip = $(el).tooltip({
                            title : msg,
                            html :true,
                            container : 'body'
                        }).tooltip('show');
                        tooltipArr.push($tooltip);
                    };
                    script[0].src = url;
                }).on('click' , function(){
                    window.open('http://www.ip138.com/ips138.asp?ip=' + ip + '&action=2');
                });
                //页面跳转的时候删除IP信息
                var $off = $rootScope.$on('$locationChangeStart', function() {
                    $('body>.tooltip').remove();
                    $off();
                });
            }
        };
    }]);