var closeShare = (function (mqq) {
    function getPower(res) {

        if (res.ret == 0) {
            var timeStamp = Date.parse(new Date());

            var data = res.data;

            mqq.config({
                debug: false, //如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填
                jsApiList: [
                    //'checkJsApi',
                    /*   'onMenuShareTimeline',
                     'onMenuShareAppMessage',
                     'onMenuShareQQ',
                     'onMenuShareQzone'*/
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQzone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    // 'translateVoice',
                    // 'startRecord',
                    // 'stopRecord',
                    // 'onRecordEnd',
                    // 'playVoice',
                    // 'pauseVoice',
                    // 'stopVoice',
                    // 'uploadVoice',
                    // 'downloadVoice',
                    // 'chooseImage',
                    // 'previewImage',
                    // 'uploadImage',
                    // 'downloadImage',
                    'getNetworkType',
                    // 'openLocation',
                    // 'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    // 'scanQRCode',
                    // 'chooseQQPay',
                    // 'openProductSpecificView',
                    // 'addCard',
                    // 'chooseCard',
                    // 'openCard'

                ]
                // 必填
            });
            // var SiteUrl = "http://" + curSiteUrl + "/";
            // if (SiteUrl == location.href || location.href.indexOf("/detail/onlineId") != -1 ) {

            mqq.ready(function (res) {



                // var shareObj = {
                //     title: title, // 分享标题
                //     desc: desc, // 分享描述
                //     link: href, // 分享链接
                //     imgUrl: imgUrl, // 分享图标
                //     success: function () {
                //         // 用户确认分享后执行的回调函数
                //     },
                //     cancel: function () {
                //         // 用户取消分享后执行的回调函数
                //     }
                // };


                mqq.onMenuShareTimeline({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160822/image/wx200.jpg?v=' + timeStamp, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                mqq.onMenuShareAppMessage({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    desc: '麦蒂、吴亦凡、萧敬腾等20位明星巅峰对决！偶像人气就看你的了！', // 分享描述
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160822/image/wx200.jpg?v=' + timeStamp, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });


                mqq.onMenuShareQQ({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    desc: '麦蒂、吴亦凡、萧敬腾等20位明星巅峰对决！偶像人气就看你的了！', // 分享描述
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160822/image/wx200.jpg?v=' + timeStamp, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                mqq.onMenuShareQzone({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    desc: '麦蒂、吴亦凡、萧敬腾等20位明星巅峰对决！偶像人气就看你的了！', // 分享描述
                    link: window.location.href, // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160822/image/wx200.jpg?v=' + timeStamp, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数`
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                mqq.showOptionMenu();
                mqq.showMenuItems({
                    menuList: [
                        'menuItem:share:appMessage',
                        'menuItem:share:qq',
                        'menuItem:share:QZone',
                        'menuItem:share:copyUrl',
                        'menuItem:share:timeline'
                    ]
                });

            })
            mqq.error(function (res) {

                //签名过期导致验证失败
                if (res.errMsg != 'config:ok' && reqCount < 2) { //如果签名失效，不读缓存，强制获取新的签名

                    var script = document.createElement("script");
                    script.src = 'http://mqq.wesai.com/qq/token/CreateJsApiTicket?url=' + href + "&callback=closeShare.getPower&force=1";
                    document.body.insertBefore(script, document.body.firstChild);
                    reqCount++;
                }
            });

        }

    }

    return {
        getPower: getPower
    }
}(mqq));

var reqCount = 0;
var href = window.location.href;
var script = document.createElement("script");
script.src = 'http://mqq.wesai.com/qq/token/CreateJsApiTicket?url=' + encodeURIComponent(href) + "&callback=closeShare.getPower";
document.body.insertBefore(script, document.body.firstChild);
