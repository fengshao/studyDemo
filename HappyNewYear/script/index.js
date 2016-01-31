/**
 * Created by jinfeng on 2016/1/30.
 */

$(function () {
    layout();
    function layout() {
        $("#happy-new-year").css("width", $(window).width()).css("height", $(window).height());
        $(".container").css("width", $(window).width() - 100).css("height", $(window).height() - 100);
    }

    $(window).resize(function () {
        layout();
    });
    $("#happy-new-year").delegate(".door-div", "click", function () {
        $(this).addClass("open-door");
    });

    $("#happy-new-year").delegate(".firecrackers-btn", "click", function () {
        if ($(this).hasClass("close-firecrackers-music")) {
            $(this).removeClass("close-firecrackers-music");
            $(".firecrackers-div-swf").show();
        } else {
            $(this).addClass("close-firecrackers-music");
            $(".firecrackers-div-swf").hide();
        }
    });

    $("#happy-new-year").delegate(".music-btn", "click", function () {
        var music = document.getElementById("bgMusic");
        if ($(this).hasClass("close-music-music")) {
            $(this).removeClass("close-music-music");
            music.play();
        } else {
            $(this).addClass("close-music-music");
            music.pause();
        }
    });

});