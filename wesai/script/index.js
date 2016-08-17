/**
 * Created by fengshao on 2016/8/17.
 */
$(function () {

    init();
    headIconBoxFnc();


    function init() {
        $(".content").css("width", document.documentElement.clientWidth).css("height", document.documentElement.clientHeight);
        var topHeight = $(".luoxuanquan-cls").position().top + $(".luoxuanquan-cls").height() / 2;
        $(".weisai-logo").css("top", topHeight - $(".weisai-logo").height() / 2);
        $(".weisai-div").css("top", topHeight - $(".weisai-div").height() / 2);
        $(".head-ico-content").css("top", $(".luoxuanquan-cls").position().top).css("height", $(".luoxuanquan-cls").height());
    };

    function headIconBoxFnc() {

        //中心点横坐标
        var dotLeft = $(".head-ico-content").width() / 2;
        //中心点纵坐标
        var dotTop = $(".head-ico-content").height() / 2;
        //起始角度
        var stard = 0;
        //半径
        var radius = 300;
        //每一个BOX对应的角度;
        var avd = 360 / $(".head-ico-div").length;
        //每一个BOX对应的弧度;
        var ahd = avd * Math.PI / 180;

        $(".head-ico-div").each(function (index, element) {
            $(this).css({
                "left": Math.sin((ahd * index)) * radius + dotLeft - 50,
                "top": Math.cos((ahd * index)) * radius + dotTop - 75
            });
        });
    }

});