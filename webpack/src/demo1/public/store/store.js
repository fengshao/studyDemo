/**
 * Created by fengs on 2016/6/24.
 */
var MyActions = require("../action/action");

function MyStore() {
  this.newImageDatasArr = [];
  this.bgData = null;
  this.bindActions(MyActions);
};

MyStore.prototype.Handledata = function (data) {
  debugger
  var newData = this.getImageUrl(data);
  this.newImageDatasArr = newData;
};

MyStore.prototype.HandleDetail = function (data) {
  this.bgData = data;
};


MyStore.prototype.getImageUrl = function (imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageUrl = require("../../../../images/" + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
};

module.exports = alt.createStore(MyStore, 'MyStore');
