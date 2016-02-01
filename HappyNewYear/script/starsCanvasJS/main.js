var can;
var ctx;

var w;
var h;

var padLeft = 0;
var padTop = 0;

var girlWidth = 300;
var girlHeight = 151;

var deltaTime;
var lastTime;

var girlPic = new Image();
var starPic = new Image();
var monkeyPic = new Image();

var stars = [];
var num = 30;

var alive = 0;

var switchy = false;
var monkeyPicPadLeft = 50;
var monkeyPicPadTop = 121;
var monkeyPicWidth = 216;
var monkeyPicHeight = 280;
$(function () {
    init();
});
function init() {
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");

    w = can.width;
    h = can.height;

    //document.addEventListener('mousemove', mousemove, false);
    switchy = true;
    girlPic.src = "image/new_year_img/2016.png";
    starPic.src = "image/new_year_img/star.png";

    for (var i = 0; i < num; i++) {
        stars[i] = new starObj();
        stars[i].init();
    }

    lastTime = Date.now();
    gameLoop();
}

function gameLoop() {
    window.requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    fillCanvas();
    drawGirl();

    drawStars();

    aliveUpdate();
}

function fillCanvas() {
    ctx.fillStyle = "#393550";
    ctx.fillRect(0, 0, w, h);
}

function drawGirl() {
    ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}

function drawMonkey() {
    ctx.drawImage(monkeyPic, monkeyPicPadLeft, monkeyPicPadTop, monkeyPicWidth, monkeyPicHeight);
}

function mousemove(e) {
    if (e.offsetX || e.layerX) {

        var px = e.offsetX == undefined ? e.layerX : e.offsetX;
        var py = e.offsetY == undefined ? e.layerY : e.offsetY;

        if (px > padLeft && px < (padLeft + girlWidth) && py > padTop && py < (padTop + girlHeight)) {
            switchy = true;
        } else {
            switchy = true;
        }
    }
}