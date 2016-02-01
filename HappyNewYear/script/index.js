/**
 * Created by jinfeng on 2016/1/30.
 */

$(function () {
    var setTimer = null;
    layout();
    function layout() {
        $("#happy-new-year").css("width", $(window).width()).css("height", $(window).height());
        $(".container").css("width", $(window).width()).css("height", $(window).height());
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