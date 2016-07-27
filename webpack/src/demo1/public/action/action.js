/**
 * Created by fengs on 2016/6/24.
 */
var MyAjax = require("../ajax/ajax");

function MyActions() {

  this.generateActions({
    'GetData': 'GetData',
    'GetDetail': 'GetDetail'
  });

  this.GetData = function () {
    var _this = this;
    MyAjax.getImageDatas().then(function (list) {
      _this.dispatch(list);
    }, function (errorMsg) {
      _this.dispatch(errorMsg);
    });
  };

  this.GetDetail = function () {
    this.dispatch(data);
  }
}

module.exports = alt.createActions(MyActions);
