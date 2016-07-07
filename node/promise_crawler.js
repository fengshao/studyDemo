/**
 * Created by fengshao on 2016/7/6.
 */

var http = require("http");
var cheerio = require("cheerio");
var Promise = require("bluebird");

var baseUrl = "http://www.imooc.com/learn/";
var videoIds = [348, 259, 197, 134, 75];

function fillterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $(".chapter");
    var title = $(".course-infos .path a span").text();
    var number = parseInt($($("span.meta-value strong")[3]).text().trim(), 10);

    var courseData = {
        title: title,
        number: number,
        videos: []
    };

    chapters.each(function (item) {
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

        courseData.videos.push(chapter);
    });
    return courseData;
}

function printCourseInfo(coursesData) {
    coursesData.forEach(function (courseData) {
        console.log(courseData.number + " 人学过 " + courseData.title + "\n");
    });

    coursesData.forEach(function (courseData) {
        console.log("##### " + courseData.title + "\n");

        courseData.videos.forEach(function (item) {
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + "\n");
            item.videos.forEach(function (video) {
                console.log("  [" + video.videoId + "]  " + video.videoTitle + "\n");
            });
        });


    });

}
function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        console.log("正在爬取" + url);
        http.get(url, function (res) {
            var html = "";
            res.on("data", function (data) {
                html += data;
            });

            res.on("end", function () {
                resolve(html);
            });

        }).on("error", function () {
            reject(e);
            console.log("出错了。");
        });
    })
}

var fetchCourseArray = [];

videoIds.forEach(function (id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise
    .all(fetchCourseArray)
    .then(function (pages) {
        var courseData = [];
        pages.forEach(function (html) {
            var courses = fillterChapters(html);
            courseData.push(courses);
        });
        courseData.sort(function (a, b) {
            return a.number < b.number;
        });

        printCourseInfo(courseData);

    });

