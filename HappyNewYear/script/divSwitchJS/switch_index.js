// JavaScript Document
$(function () {
    var oDiv = document.getElementById('div1');
    var oUl = document.getElementById('ul1');
    var aLi = oUl.getElementsByTagName('li');
    var i = 0;
    var iNow = 0;
    var aA = oDiv.getElementsByTagName('a');
    var ready = true;
    var wait = 0;

    var closeMusicFlag = false;

    $("#container-pic-div").delegate(".pic-music-btn", "click", function () {
        var chongaiMusic = document.getElementById("chongai");
        var yelaixiangMusic = document.getElementById("yelaixiang");
        var dageMusic = document.getElementById("dage");
        var xiaojiuwoMusic = document.getElementById("xiaojiuwo");

        if ($(this).hasClass("close-music-music")) {
            closeMusicFlag = false;
            $(this).removeClass("close-music-music");
            soundsFnc();
        } else {
            closeMusicFlag = true;
            $(this).addClass("close-music-music");
            chongaiMusic.pause();
            yelaixiangMusic.pause();
            dageMusic.pause();
            xiaojiuwoMusic.pause();
        }
    });

    aA[0].onclick = function () {
        tab((iNow - 1 + aLi.length) % aLi.length);
    };

    aA[1].onclick = function () {
        tab((iNow + 1) % aLi.length);
    };

    var arr = [{b: 'webkit', e: 'webkitTransitionEnd'}, {b: 'firefox', e: 'transitionend'}];

    function tEnd(ev) {
        var obj = ev.srcElement || ev.target;
        if (obj.tagName != 'LI')return;
        wait--;
        if (wait <= 0)ready = true;
    }

    for (var i = 0; i < arr.length; i++) {
        if (navigator.userAgent.toLowerCase().search(arr[i].b) != -1) {
            document.addEventListener(arr[i].e, tEnd, false);
            break;
        }
    }

    function m(n) {
        return (n + aLi.length) % aLi.length;
    }

    function tab(now) {
        if (!ready)return;
        ready = false;

        iNow = now;
        // Downloads By http://www.veryhuo.com
        wait = aLi.length;

        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = '';
            aLi[i].onclick = null;
        }
        aLi[m(iNow - 2)].className = 'left2';
        aLi[m(iNow - 1)].className = 'left';
        aLi[iNow].className = 'cur';
        aLi[m(iNow + 1)].className = 'right';
        aLi[m(iNow + 2)].className = 'right2';

        soundsFnc();
        setEv();
    }

    setEv();

    function soundsFnc() {
        if (closeMusicFlag) {
            return;
        }
        var nowPic = $(aLi[iNow]).attr("data-type");
        var chongaiMusic = document.getElementById("chongai");
        var yelaixiangMusic = document.getElementById("yelaixiang");
        var dageMusic = document.getElementById("dage");
        var xiaojiuwoMusic = document.getElementById("xiaojiuwo");

        switch (nowPic) {
            case "01":
            case "02":
            case "03":
            case "04":
            case "05":
            case "06":
                yelaixiangMusic.pause();
                dageMusic.pause();
                xiaojiuwoMusic.pause();
                chongaiMusic.play();
                break;
            case "07":
            case "08":
            case "09":
            case "10":
            case "11":
            case "12":
            case "13":
                yelaixiangMusic.pause();
                dageMusic.pause();
                chongaiMusic.pause();
                xiaojiuwoMusic.play();
                break;
            case "14":
                xiaojiuwoMusic.pause();
                dageMusic.pause();
                chongaiMusic.pause();
                yelaixiangMusic.play();
                break;
            case "15":
                xiaojiuwoMusic.pause();
                chongaiMusic.pause();
                yelaixiangMusic.pause();
                dageMusic.play();
                break;
        }
    }

    function setEv() {
        var scaled = false;
        aLi[m(iNow - 1)].onclick = aA[0].onclick;
        aLi[iNow].onclick = function ()	//放大
        {
            if (scaled) {
                this.className = 'active';
            }
            else {
                this.className = 'cur';
            }
            scaled = !scaled;
        };
        aLi[m(iNow + 1)].onclick = aA[1].onclick;
    }

    document.onkeydown = function (ev) {
        var oEvent = ev || event;

        switch (oEvent.keyCode) {
            case 37:	//←
                aA[0].onclick();
                break;
            case 39:	//→
                aA[1].onclick();
                break;
        }
    };

    var autoPlayTimer = null;

    oDiv.onmouseout = function () {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(function () {
            if (!$("#container-pic-div").hasClass("pt-page-current")) {
                clearInterval(autoPlayTimer);
                return
            }
            aA[1].onclick();
        }, 15000);
    };
    oDiv.onmouseover = function () {
        clearInterval(autoPlayTimer);
    };

    oDiv.onmouseout();

    document.getElementById('rev').onclick = function () {
        if (this.checked) {
            createReflect();
        }
        else {
            removeReflect();
        }
    };

    createReflect();

    function createReflect() {
        removeReflect();

        for (var i = 0; i < aLi.length; i++) {
            var oSpan = document.createElement('span');
            oSpan.innerHTML = aLi[i].innerHTML + '<em></em>';
            aLi[i].appendChild(oSpan);
        }
    }

    function removeReflect() {
        for (var i = 0; i < aLi.length; i++) {
            var aSpan = aLi[i].getElementsByTagName('span');
            while (aSpan.length)aLi[i].removeChild(aSpan[0]);
        }
    }

    (function () {
        var oS = document.createElement('script');

        oS.type = 'text/javascript';
        oS.src = '';

        document.body.appendChild(oS);
    })();
});

