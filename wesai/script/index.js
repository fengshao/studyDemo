/**
 * Created by fengshao on 2016/8/17.
 */
$(function () {

    init();
    headIconBoxFnc();
    addEvent();

    var params = {
        nowUserId: "", //当前点击加油的明星ID
        phone: "",
        verificationCode: ""
    };

    function init() {
        var topHeight = $(".luoxuanquan-cls").position().top + $(".luoxuanquan-cls").height() / 2;
        $(".weisai-logo").css("top", topHeight - $(".weisai-logo").height() / 2)
            .css("left", ($(".luoxuanquan-cls").width() / 2 - $(".weisai-logo").width() / 2));
        $(".weisai-div").css("top", topHeight - $(".weisai-div").height() / 2)
            .css("left", ($(".luoxuanquan-cls").width() / 2 - $(".weisai-logo").width() / 2));
        $(".head-ico-content").css("top", $(".luoxuanquan-cls").position().top).css("height", $(".luoxuanquan-cls").height());
        $(".head-ico-content-copy").css("top", $(".luoxuanquan-cls").position().top).css("height", $(".luoxuanquan-cls").height());
    };

    function headIconBoxFnc() {

        //中心点横坐标
        var dotLeft = $(".head-ico-content").width() / 2;
        //中心点纵坐标
        var dotTop = $(".head-ico-content").height() / 2;
        //起始角度
        var stard = 0;
        //半径
        var radius = 120;
        //每一个BOX对应的角度;
        var avd = 360 / $(".head-ico-content .head-ico-div").length;
        //每一个BOX对应的弧度;
        var ahd = avd * Math.PI / 180;

        $(".head-ico-content .head-ico-div").each(function (index, element) {
            $(this).css({
                "left": Math.sin((ahd * index)) * radius + dotLeft - 30,
                "top": Math.cos((ahd * index)) * radius + dotTop - 30
            });
        });

        $(".head-ico-content-copy .head-ico-div").each(function (index, element) {
            $(this).css({
                "left": Math.sin((ahd * index)) * radius + dotLeft - 25,
                "top": Math.cos((ahd * index)) * radius + dotTop - 30
            });
        });

    };

    function addEvent() {

        var contentElement = $(".content");

        //查看活动规则
        contentElement.delegate(".activity-rule-btn", "click", function () {
            $(".layer-bg-div").show();
            $(".activity-rule-layer").show();
        });

        //关闭活动规则
        contentElement.delegate(".activity-rule-close-btn", "click", function () {
            $(".layer-bg-div").hide();
            $(".activity-rule-layer").hide();
        });

        //点击明星头像弹出明星加油弹层
        contentElement.delegate(".head-ico-content .head-ico-div", "click", function (event) {
            params.nowUserId = $(event.currentTarget).attr("userid");
            $(".layer-bg-div").show();
            $(".give-me-fine-layer").show();
            $(".give-me-fine-logo").addClass(event.currentTarget.id);
        });

        //关闭明星加油弹层
        contentElement.delegate(".give-me-fine-close-btn", "click", function () {
            $(".layer-bg-div").hide();
            $(".give-me-fine-layer").hide();
            $(".give-me-fine-logo").removeClass().addClass("give-me-fine-logo");
            $(".give-me-fine-form-phone input").val("");
            $(".give-me-fine-form-phone input").val("");
        });

        //现场加油
        contentElement.delegate(".gogo-live-btn-cls", "click", function () {
            $(".layer-bg-div").hide();
            $(".head-ico-content").show();
            $(".votes-num-layer").hide();
        });

        //现场加油
        contentElement.delegate(".close-votes-num-layer-btn", "click", function () {
            $(".layer-bg-div").hide();
            $(".head-ico-content").show();
            $(".votes-num-layer").hide();
        });

        //获取手机验证码
        contentElement.delegate(".get-verification-btn", "click", function () {
            params.phone = $(".give-me-fine-form-phone input").val();
            var url = "http://mrsd.wesai.com/user/get_send_message.json";
            var data = {
                "phone": params.phone
            }

            if (!(/^1[3|4|5|7|8]\d{9}$/.test(params.phone))) {
                toastFnc("手机号码有误，请重填");
            } else {
                $.ajax({
                    "type": "get",
                    "data": data,
                    "url": url,
                    "success": function (data) {
                        if (data.error == 0) {
                            params.verificationCode = data.result.code;
                        } else {
                            toastFnc(data.info);
                        }
                    },
                    "error": function (data) {
                        params.phone = "";
                        toastFnc(data.info);
                    }
                });
            }
        });


        //获取手机验证码之后点击加油
        contentElement.delegate(".gogo-btn", "click", function () {
            var verificationCode = $(".give-me-fine-form-verification input").val();
            var phone = $(".give-me-fine-form-phone input").val();
            var url = "http://mrsd.wesai.com/user/get_add_user.json";
            var data = {
                "userid": params.nowUserId,
                "phone": params.phone
            };

            if (params.phone !== phone) {
                toastFnc("请输入当前获取验证码的手机号");
            } else if (verificationCode !== params.verificationCode) {
                toastFnc("请输入正确的验证码");
            } else {
                $.ajax({
                    "type": "get",
                    "data": data,
                    "url": url,
                    "success": function (data) {
                        if (data.error == 0) {
                            $(".give-me-fine-ths-num-label").text(data.result.num);
                        } else {
                            toastFnc(data.info);
                        }
                        $(".give-me-fine-tks").show();
                        $(".give-me-fine-form").hide();
                        params.phone = "";
                        params.verificationCode = "";
                    },
                    "error": function (data) {
                        toastFnc(data.info);
                        params.phone = "";
                    }
                });
            }

        });


        //查看票数排行榜
        contentElement.delegate(".see-votes-num-btn", "click", function () {
            var url = "http://mrsd.wesai.com/user/get_list.json";

            $(".give-me-fine-layer").hide();
            $(".head-ico-content").hide();
            $(".votes-num-layer").show();

            $.ajax({
                "type": "get",
                "url": url,
                "success": function (data) {
                    if (data.error == 0) {
                        if (data.result.data) {
                            setStarVotesNum(data.result.data);
                        }
                    } else {
                        toastFnc(data.info);
                    }
                },
                "error": function (data) {
                    params.phone = "";
                    toastFnc(data.info);
                }
            });
        });

    };

    function setStarVotesNum(data) {
        $(".head-ico-content-copy .head-ico-div").each(function () {
            for (var i = 0; i < data.length; i++) {
                if ($(this).attr("userId") == data[i].userid) {
                    $(this).find(".head-ico-votes-num").text(data[i].num);
                }
            }
        })
    };

    function toastFnc(msg, opts) {
        if (!opts)opts = {};
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
                opts.callback && opts.callback();
            }, 500);
        }, (opts.time || 2000) + 1000);
        $(".give-me-fine-form").prepend(toast);
    }

});