/**
 * Created by fengshao on 2016/8/17.
 */

//判断手机横竖屏状态：
function checkDirect() {
    if (window.orientation == 180 || window.orientation == 0) {
        document.querySelector(".mask").style.display = "none";
    }
    if (window.orientation == 90 || window.orientation == -90) {
        document.querySelector(".mask").style.display = "block";
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", checkDirect, false);
//防止屏幕拖动
document.documentElement.addEventListener('touchmove', function (e) {
    e.preventDefault();
});
/*
 ----> 监控埋点 <----
 pid:  20160819
 page:
 url: http://mini.wesai.com/20160819/
 uid:
 ext: 购票:1 分享：2
 pos:       //业务按钮参数
 */
var statis = {
    'domain': 'http://log.wesai.com',
    'pid': 1,
    'page': 1,
    'pos': 1,
    'ext': '1',
    'uid': '',
    'search': 'http://mini.wesai.com/20160819/',
    'clickV': function (ext) {
        $.ajax({
            'url': this.domain + '/click.html',
            'data': {
                'url': this.search,
                'pid': this.pid,
                'page': this.page,
                'pos': this.pos,
                'uid': this.uid,
                'ext': ext
            },
            'success': function (response, status, xhr) {
            },
            dataType: 'jsonp'
        });
    },
    'viewV': function () {
        $.ajax({
            'url': this.domain + '/view.html',
            'data': {'url': this.search},
            'success': function (response, status, xhr) {
            },
            dataType: 'jsonp'
        });
    },
    'setUrl': function (url) {
        var statId = document.getElementById("statisGa");
        if (!statId) {
            var wsta = document.createElement("script");
            wsta.id = 'statisGa';
            wsta.src = url;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.appendChild(wsta);
        } else {
            statId.setAttribute('src', url);
        }
    }
}

$(function () {
    var params = {
        nowUserId: "", //当前点击加油的明星ID
        phone: "",
        verificationCode: "",
        setAnimate: "",
        setInitTimer: "",
        verificationCodeTimer: "",
        verificationCodeFlag: true,
        scaleHeadIconTimer: ""
    };

    params.setInitTimer = setInterval(function () {
        if ($(".content").css("visibility") !== "hidden") {
            init();
        }
    }, 100);

    addEvent();
    weixinfengxiang();

    $(window).resize(function () {
        var cliWH = document.documentElement.clientWidth;
        var cliHG = document.documentElement.clientHeight;
        $("body").css("height", cliHG).css("width", cliWH);
        init();
    });

    function init() {
        clearInterval(params.setInitTimer);
        var topHeight = $(".luoxuanquan-cls").position().top + $(".luoxuanquan-cls").height() / 2;
        $(".weisai-logo").css("top", topHeight - $(".weisai-logo").height() / 2)
            .css("left", ($(".luoxuanquan-cls").width() / 2 - $(".weisai-logo").width() / 2));
        $(".weisai-div").css("top", topHeight - 120 / 2)
            .css("left", ($(".luoxuanquan-cls").width() / 2 - 120 / 2));
        $(".head-ico-content").css("top", $(".luoxuanquan-cls").position().top).css("height", $(".luoxuanquan-cls").height());
        $(".head-ico-content-copy").css("top", $(".luoxuanquan-cls").position().top).css("height", $(".luoxuanquan-cls").height());

        $(".layer-bg-div").css("height", $(".content").height());

        animationFnc();
        headIconBoxFnc();

        if (params.scaleHeadIconTimer) {
            clearInterval(params.scaleHeadIconTimer);
        }
        params.scaleHeadIconTimer = setInterval(function () {
            scaleHeadIcon();
        }, 3000);
    };

    function animationFnc() {

        $(".top-title-img-index").addClass("top-tite-scale");
        var top_tite_scale_Animation = document.querySelector('.top-title-img-index');
        var logo_Animation = document.querySelector('.weisai-logo');
        var weisai_div_Animation = document.querySelector('.weisai-div');
        var ring_div_Animation = document.querySelector('.luoxuanquan-cls-img');
        var head_icon_div_Animation = document.querySelector('.head-ico-div');
        var aaaa = document.querySelector('.aaaaaa');

        top_tite_scale_Animation.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            //顶部大字图片进场动画结束之后执行后续动画
            $(".top-tite-logo").show();
            $(".top-tite-scale").hide();
            //微赛logo开始进场
            $(".weisai-logo").addClass("weisai-logo-animation").show();
        }, false);

        logo_Animation.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            //微赛logo进场动画结束之后执行微赛底部div进场动画
            $(".weisai-div").addClass("weisai-div-quick-animation").show();
        }, false);

        weisai_div_Animation.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            //微赛底部div进场动画完毕之后执行线圈图片进场动画
            $(".luoxuanquan-cls-img").addClass("luoxuanquan-cls-img-show-animation").css("visibility", "visible");
            $(".zimutiao label").addClass("zimutiao_animation");
        }, false);

        aaaa.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            $(".zimutiao label").addClass("zimutiao_animation1");
        }, false);

        ring_div_Animation.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            //线圈图片进场之后执行线圈图片转圈动画
            $(".luoxuanquan-cls-img").removeClass("luoxuanquan-cls-img-show-animation").addClass("luoxuanquan-cls-img-animation");
            //微赛底部div执行稳定持续动画
            $(".weisai-div").removeClass("weisai-div-quick-animation").addClass("weisai-div-animation");
            //明星头像进场动画
            $(".head-ico-div").addClass("head-ico-div-expand-animation").show();
        }, false);

        head_icon_div_Animation.addEventListener("webkitAnimationEnd", function () { //动画结束时事件
            //明星头像进场动画结束之后执行明星头像转圈动画
            $(".head-ico-content").addClass("head-ico-content-animation");
            $(".head-ico-div").removeClass("head-ico-div-expand-animation").addClass("head-ico-div-turn-animation");
        }, false);
    };

    //明星头像圆形分布
    function headIconBoxFnc() {

        var wh = document.documentElement.clientWidth;
        //中心点横坐标
        var dotLeft = $(".head-ico-content").width() / 2;
        //中心点纵坐标
        var dotTop = $(".head-ico-content").height() / 2;
        //起始角度
        var stard = 0;
        //半径
        var radius = 120;
        if (wh <= 360) {
            radius = 95;
        }
        //每一个BOX对应的角度;
        var avd = 360 / $(".head-ico-content .head-ico-div").length;
        //每一个BOX对应的弧度;
        var ahd = avd * Math.PI / 180;
        //运动的速度
        var speed = 2;

        $(".head-ico-content .head-ico-div").each(function (index, element) {
            $(this).css({
                "left": Math.sin((ahd * index)) * radius + dotLeft - 35,
                "top": Math.cos((ahd * index)) * radius + dotTop - 30
            });
        });

        $(".head-ico-content-copy .head-ico-div").each(function (index, element) {
            $(this).css({
                "left": Math.sin((ahd * index)) * radius + dotLeft - 25,
                "top": Math.cos((ahd * index)) * radius + dotTop - 30
            });
        });

        //运动函数
        var fun_animat = function () {

            speed = speed < 360 ? speed : 2;

            //运运的速度
            speed += 2;
            //运动距离，即运动的弧度数;
            var ainhd = speed * Math.PI / 180;

            //按速度来定位DIV元素
            $(".head-ico-content .head-ico-div").each(function (index, element) {
                $(this).css({
                    "left": Math.sin((ahd * index + ainhd)) * radius + dotLeft - 35,
                    "top": Math.cos((ahd * index + ainhd)) * radius + dotTop - 30
                });
            });
        };


        //定时调用运动函数
        if (params.setAnimate) {
            clearInterval(params.setAnimate);
        }
        params.setAnimate = setInterval(fun_animat, 80);

    };

    function scaleHeadIcon() {

        var numIcon = Math.floor(Math.random() * 4 + 1);
        $(".head-ico-content .head-ico-div").removeClass("scal-class");
        for (var i = 0; i <= numIcon; i++) {
            var index = Math.floor(Math.random() * 5);
            $(".head-ico-content .head-ico-div:eq(" + index + ")").addClass("scal-class");
        }
    };

    function addEvent() {

        var contentElement = $(".content");

        //查看活动规则
        contentElement.delegate(".activity-rule-btn", "click", function () {
            $(".layer-content-div").show();
            $(".layer-bg-div").show();
            $(".activity-rule-layer").show();
            $(".layer-bg-div").css("height", $(".content").height());
        });

        //关闭活动规则
        contentElement.delegate(".activity-rule-close-btn", "click", function () {
            $(".layer-bg-div").hide();
            $(".activity-rule-layer").hide();
            $(".layer-content-div").hide();
        });

        //点击明星头像弹出明星加油弹层
        contentElement.delegate(".head-ico-content .head-ico-div", "click", function (event) {
            params.nowUserId = $(event.currentTarget).attr("userid");
            $(".layer-bg-div").show();
            $(".layer-content-div").show();
            $(".give-me-fine-layer").show();
            $(".give-me-fine-form").show();
            $(".give-me-fine-tks").hide();
            $(".give-me-fine-logo").addClass(event.currentTarget.id);
            $(".layer-bg-div").css("height", $(".content").height());
        });

        //关闭明星加油弹层
        contentElement.delegate(".give-me-fine-close-btn", "click", function () {
            $(".layer-bg-div").hide();
            $(".give-me-fine-layer").hide();
            $(".layer-content-div").hide();
            $(".give-me-fine-logo").removeClass().addClass("give-me-fine-logo");
            $(".give-me-fine-form-phone input").val("");
            $(".give-me-fine-form-phone input").val("");
        });

        //现场加油
        contentElement.delegate(".gogo-live-btn-cls", "click", function () {
            statis.clickV(1);
            window.location.href = "http://sports.wepiao.com/wechat/detail/onlineId=c6f6e2c7519545a68618b7956752f51e&x-from=dianzan";
            $(".layer-bg-div").hide();
            $(".head-ico-content").show();
            $(".votes-num-layer").hide();
        });

        //关闭票数排行榜弹层
        contentElement.delegate(".close-votes-num-layer-btn", "click", function () {
            $(".layer-bg-div").hide();
            $(".head-ico-content").show();
            $(".shouye-see-votes-num-btn").css("visibility", "visible");
            $(".votes-num-layer").hide();
            $(".weisai-logo").removeClass("show-votes-weisai");
        });

        //喊人加油
        contentElement.delegate(".gogo-hanr-btn-cls", "click", function () {
            statis.clickV(2);
            $(".votes-num-layer").hide();
            $(".head-ico-content").show();
            $(".fenxiang-ayer-bg-div").show();
            $(".shouye-see-votes-num-btn").css("visibility", "visible");
        });

        contentElement.delegate(".fenxiang-ayer-bg-div", "click", function () {
            hideFenxiangLayer();
        });

        //获取手机验证码
        contentElement.delegate(".get-verification-btn", "click", function () {
            params.phone = $(".give-me-fine-form-phone input").val();
            var url = "http://mini.wesai.com/api/user/get_send_message.json";
            var data = {
                "phone": params.phone
            };
            if (!params.phone) {
                toastFnc("请填写手机号码", $(".give-me-fine-form"));
                return;
            }

            if (!(/^1[3|4|5|7|8]\d{9}$/.test(params.phone))) {
                toastFnc("手机号码有误，请重新输入", $(".give-me-fine-form"));
                return;
            }

            if (!params.verificationCodeFlag) {
                toastFnc("验证码正在发送中...", $(".give-me-fine-form"));
                return;
            }
            params.verificationCodeFlag = false;
            if (params.verificationCodeTimer) {
                clearTimeout(params.verificationCodeTimer);
            }
            params.verificationCodeTimer = setTimeout(function () {
                params.verificationCodeFlag = true;
                clearTimeout(params.verificationCodeTimer);
            }, 30000);


            $.ajax({
                "type": "get",
                "data": data,
                "url": url,
                "success": function (data) {

                    // alert(JSON.stringify(data));
                    if (data.error == 0) {
                        params.verificationCode = data.result.code;
                    } else {
                        toastFnc(data.info ? data.info : "获取验证码失败。", $(".give-me-fine-form"));
                        params.verificationCodeFlag = true;
                        clearTimeout(params.verificationCodeTimer);
                    }
                },
                "error": function (data) {
                    // alert(JSON.stringify(data) + "wocou");
                    toastFnc(data.info ? data.info : "获取验证码失败。", $(".give-me-fine-form"));
                    params.verificationCodeFlag = true;
                    clearTimeout(params.verificationCodeTimer);
                }
            });
        });


        //获取手机验证码之后点击加油
        contentElement.delegate(".gogo-btn", "click", function () {
            var verificationCode = $(".give-me-fine-form-verification input").val();
            var phone = $(".give-me-fine-form-phone input").val();
            var url = "http://mini.wesai.com/api/user/get_add_user.json";

            var data = {
                "userid": params.nowUserId,
                "phone": params.phone
            };


            if (!phone) {
                toastFnc("请填写手机号码", $(".give-me-fine-form"));
                return;
            }
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
                toastFnc("手机号码有误，请重新输入", $(".give-me-fine-form"));
                return;
            }

            if (params.phone !== phone) {
                toastFnc("请输入当前获取验证码的手机号", $(".give-me-fine-form"));
                return;
            }
            if (!verificationCode || verificationCode !== params.verificationCode) {
                toastFnc("请输入正确的验证码", $(".give-me-fine-form"));
                return;
            }
            $.ajax({
                "type": "get",
                "data": data,
                "url": url,
                "success": function (data) {
                    if (data.error == 0) {
                        $(".give-me-fine-ths-num-label").text(data.result.num ? data.result.num : 0);
                    } else {
                        toastFnc(data.info ? data.info : "加油失败，请重试。", $(".give-me-fine-form"));
                    }
                    $(".give-me-fine-tks").show();
                    $(".give-me-fine-form").hide();
                    params.phone = "";
                    params.verificationCode = "";
                },
                "error": function (data) {
                    toastFnc(data.info ? data.info : "加油失败，请重试。", $(".give-me-fine-form"));
                    params.phone = "";
                }
            });
        });


        //查看票数排行榜
        contentElement.delegate(".weisai-logo, .see-votes-num-btn", "click", function () {
            var url = "http://mini.wesai.com/api/user/get_list.json";
            $(".layer-content-div").hide();
            $(".give-me-fine-layer").hide();
            $(".head-ico-content").hide();
            $(".shouye-see-votes-num-btn").css("visibility", "hidden");
            $(".votes-num-layer").show();
            $(".layer-bg-div").show().addClass("show-votes");
            $(".weisai-logo").addClass("show-votes-weisai");
            $(".layer-bg-div").css("height", $(".content").height());
            // alert($(".content").height() + "," + $(".layer-bg-div").height() + "," + $("body").height() + "a111");
            $.ajax({
                "type": "get",
                "url": url,
                "success": function (data) {
                    if (data.error == 0) {
                        if (data.result.data) {
                            setStarVotesNum(data.result.data);
                        }
                    } else {
                        toastFnc(data.info ? data.info : "获取票数失败", $(".votes-num-layer"));
                    }
                },
                "error": function (data) {
                    params.phone = "";
                    toastFnc(data.info ? data.info : "获取票数失败", $(".votes-num-layer"));
                }
            });
        });

        $("body").delegate(".music-btn", "click", function () {
            var music = document.getElementById("mp3");
            if ($(this).hasClass("close-music-music")) {
                $(this).removeClass("close-music-music");
                music.play();
            } else {
                $(this).addClass("close-music-music");
                music.pause();
            }
        });

    };

    //投票排行赋值
    function setStarVotesNum(data) {
        $(".head-ico-content-copy .head-ico-div").each(function () {
            for (var i = 0; i < data.length; i++) {
                if ($(this).attr("userId") == data[i].userid) {
                    $(this).find(".head-ico-votes-num").text(data[i].num ? data[i].num : 0);
                }
            }
        })
    };

    //错误信息提示
    function toastFnc(msg, element) {
        if (element.find(".toast").length > 0) {
            return;
        }
        var toast = document.createElement('div');
        toast.className = 'toast fadeIn';
        var toastText = document.createElement('div');
        toastText.className = 'toast-text';
        toast.appendChild(toastText);
        toastText.innerHTML = msg || '';
        setTimeout(function () {
            toast.className = 'toast fadeOut';
            setTimeout(function () {
                $(toast).remove();
            }, 500);
        }, 3000);
        element.prepend(toast);
    };

    function hideFenxiangLayer() {
        $(".layer-bg-div").removeClass("show-votes");
        $(".weisai-logo").removeClass("show-votes-weisai");
        $(".layer-bg-div").hide();
        $(".fenxiang-ayer-bg-div").hide();
    };

    function weixinfengxiang() {
        var wxDate = {};
        var href = encodeURIComponent(location.href.split('#')[0]);
        $.getJSON('http://wx.t.wesai.com/token/CreateJsApiTicket?url=' + href + '&callback=?', function (data) {
            wxDate = data.data;
        }).done(function () {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxDate.appId, // 必填，公众号的唯一标识
                timestamp: wxDate.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxDate.nonceStr, // 必填，生成签名的随机串
                signature: wxDate.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline',
                    'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {

                wx.onMenuShareTimeline({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    link: decodeURIComponent(href), // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160819/image/wx200.jpg', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        hideFenxiangLayer();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        hideFenxiangLayer();
                    }
                });

                wx.onMenuShareAppMessage({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    desc: '麦蒂、吴亦凡、萧敬腾等20位明星巅峰对决！偶像人气就看你的了！', // 分享描述
                    link: decodeURIComponent(href), // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160819/image/wx200.jpg', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        hideFenxiangLayer();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        hideFenxiangLayer();
                    }
                });

                wx.onMenuShareWeibo({
                    title: '企鹅明星赛！助威赢门票只等你揭榜！', // 分享标题
                    desc: '麦蒂、吴亦凡、萧敬腾等20位明星巅峰对决！偶像人气就看你的了！', // 分享描述
                    link: decodeURIComponent(href), // 分享链接
                    imgUrl: 'http://mini.wesai.com/20160819/image/wx200.jpg', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        hideFenxiangLayer();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        hideFenxiangLayer();
                    }
                });


            });
        });
    }
});