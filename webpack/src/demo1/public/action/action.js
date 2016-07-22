/**
 * Created by fengs on 2016/6/24.
 */
//var imageDatas = require("../data/imageDatas.json");
//console.log("imageDatas-->" + JSON.stringify(imageDatas));
var MyAjax = require("../ajax/ajax");
function MyActions() {

  this.generateActions(
    'GetData',
    'GetDetail'
  );

  this.GetData = function (input) {
    var _this = this;
    MyAjax.getImageDatas().then(function (list) {
      _this.dispatch(list);
    }, function (errorMsg) {
      _this.dispatch(errorMsg);
    });
  };

  this.GetDetail = function (id) {
    this.dispatch(data);
  }
}

module.exports = alt.createActions(MyActions);
