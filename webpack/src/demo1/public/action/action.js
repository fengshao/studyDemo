/**
 * Created by fengs on 2016/6/24.
 */

var MyAjax = require("../ajax/ajax");

function MyActions() {

  this.generateActions({
    'Handledata': 'Handledata',
    'GetDetail': 'GetDetail'
  });

  this.Handledata = function () {
    var _this = this;
    MyAjax.getImageDatas().then(function (list) {
      _this.dispatch(list.imageDatas);
    }, function (errorMsg) {
      _this.dispatch(errorMsg);
    });
  };

  this.GetDetail = function () {
    this.dispatch(data);
  }
}

module.exports = alt.createActions(MyActions);
