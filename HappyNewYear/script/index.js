/**
 * Created by jinfeng on 2016/1/30.
 */

$(function () {
    var setTimer = null;
    layout();


    var blessingTitle = '在此新春佳节之际，疯子祝大家在新的一年里工作顺利，身体健康，万事如意。' +
        '有对象的祝早日喜结良缘，持证上岗，没对象的祝明年的今天不会再说，老子今年要脱单（@累成狗）。' +
        '再次祝大家新的一年里心想事成，万事如意。词穷了，o(╯□╰)o。开门有彩蛋哟~~~';
    var con = $('#blessing-div');
    var index = 0;
    var length = blessingTitle.length;
    var tId = null;

    function start() {
        con.text('');

        tId = setInterval(function () {
            con.append(blessingTitle.charAt(index));
            if (index++ === length) {
                clearInterval(tId);
                index = 0;
            }
        }, 100);
    }

    start();
    function layout() {
        $("#happy-new-year").css("width", $(window).width()).css("height", $(window).height());
        $(".container").css("width", $(window).width()).css("height", $(window).height());
        $("#blessing-div").css("top", $("#content-div").offset().top);
    }

    $(window).resize(function () {
        layout();
    });
    $("#happy-new-year").delegate(".door-div", "click", function (ev) {
        ev.preventDefault();
        var $this = $(this);
        $this.addClass("open-door");
        clearTimeout(setTimer);
        setTimer = setTimeout(function () {
            $this.removeClass("open-door");
            closeBgMusic($(".music-btn"));
            closeFirecrackersSounds($(".firecrackers-btn"));
            PageTransitions.nextPage("33");
        }, 1800);
    });

    $("#happy-new-year").delegate(".firecrackers-btn", "click", function () {
        if ($(this).hasClass("close-firecrackers-music")) {
            $(this).removeClass("close-firecrackers-music");
            $(".firecrackers-div-swf").show();
        } else {
            closeFirecrackersSounds($(this));
        }
    });

    $("#happy-new-year").delegate(".music-btn", "click", function () {
        var music = document.getElementById("bgMusic");
        if ($(this).hasClass("close-music-music")) {
            $(this).removeClass("close-music-music");
            music.play();
        } else {
            closeBgMusic($(this));
        }
    });

    //关闭背景音乐
    function closeBgMusic($element) {
        var music = document.getElementById("bgMusic");
        $element.addClass("close-music-music");
        music.pause();
    }

//    关闭鞭炮声
    function closeFirecrackersSounds($element) {
        $element.addClass("close-firecrackers-music");
        $(".firecrackers-div-swf").hide();
    }


});