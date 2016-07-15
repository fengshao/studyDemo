'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

var imageDatas = require("../data/imageData.json");


imageDatas = (function getImageUrl(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageUrl = require("../images/" + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);


var GallaryByReactBgApp = React.createClass({
    render: function () {
        return (
            <section>
                test
            </section>
        );
    }
});
React.render(<GallaryByReactBgApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GallaryByReactBgApp;
