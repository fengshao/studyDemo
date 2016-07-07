var http = require("http");
var cheerio = require("cheerio");

var url = "http://www.imooc.com/learn/348";

function filterHtml(html) {
    var $ = cheerio.load(html);
    var element = $(".chapter");
    console.log("ss" + element);

    var arr = [];

    element.each(function (item) {
        var chapterElemengt = $(this);
        var chapterTitle = chapterElemengt.find("h3 strong").text();
        var videos = chapterElemengt.find("ul.video li");

        var chapter = {
            chapterTitle: chapterTitle,
            videos: []
        };

        videos.each(function (i) {
            var videoElement = $(this).find("a.studyvideo");
            var videoTitle = videoElement.text();
            var videoId = videoElement.attr("href").split("video/")[1];
            chapter.videos.push({
                videoId: videoId,
                videoTitle: videoTitle
            });

        });

        arr.push(chapter);
    });
    return arr;
};

function filterArr(data) {
    data.forEach(function (item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + "\n");
        item.videos.forEach(function (video) {
            console.log("  [" + video.videoId + "]  " + video.videoTitle + "\n");
        });
    });

};

http.get(url, function (res) {
    var html = "";
    res.on("data", function (data) {
        html += data;
    });

    res.on("end", function () {
        var elementArr = filterHtml(html);
        filterArr(elementArr);
    })

}).on("error", function () {
    console.log("出错了。");
});