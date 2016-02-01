var PageTransitions = (function () {

    var $main = $('body'),
        $pages = $main.children('div.pt-page'),
        animcursor = 1,
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
    // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
    // support css animations
        support = Modernizr.cssanimations;

    function init() {

        $pages.each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(current).addClass('pt-page-current');

        $(".container").delegate("#shang-div", "click", function (ev) {
            ev.preventDefault();
            soundsFnc();
            nextPage($(this).attr('data-animation'));
        });

    }

    function soundsFnc() {
        var chongaiMusic = document.getElementById("chongai");
        var yelaixiangMusic = document.getElementById("yelaixiang");
        var dageMusic = document.getElementById("dage");
        var xiaojiuwoMusic = document.getElementById("xiaojiuwo");

        yelaixiangMusic.pause();
        dageMusic.pause();
        xiaojiuwoMusic.pause();
        chongaiMusic.pause();
    }


    function nextPage(animation) {

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(current);

        if (current < pagesCount - 1) {
            ++current;
        }
        else {
            current = 0;
        }

        var $nextPage = $pages.eq(current).addClass('pt-page-current'),
            outClass = '', inClass = '';

        switch (animation) {
            case "32":
                outClass = 'pt-page-flipOutRight';
                inClass = 'pt-page-flipInLeft pt-page-delay500';
                break;
            case "33":
                outClass = 'pt-page-flipOutLeft';
                inClass = 'pt-page-flipInRight pt-page-delay500';
                break;
        }

        $currPage.addClass(outClass).on(animEndEventName, function () {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function () {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
            soundsFnc();
            if ($nextPage.attr("id") == "container-pic-div") {
                //默认播放宠爱
                var music = document.getElementById("chongai");
                music.play();
            }

        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
    }

    init();

    return {init: init, nextPage: nextPage};

})();