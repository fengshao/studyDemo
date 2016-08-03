/**
 * Created by fengs on 2016/6/24.
 */

var MyAjax = require("../ajax/ajax");

function MyActions() {

  this.generateActions({
    'handledata': 'handledata',
    'inverse': 'inverse',
    'rearrange': 'rearrange',
    'center': 'center'
  });

  this.handledata = function () {
    var _this = this;
    MyAjax.getImageDatas().then(function (list) {
      _this.dispatch(list.imageDatas);
    }, function (errorMsg) {
      _this.dispatch(errorMsg);
    });
  };

  this.inverse = function (index) {
    this.dispatch(index);
  };

  this.center = function (index, constant) {
    this.dispatch({
      index: index,
      constant: constant
    });
  };
}

module.exports = alt.createActions(MyActions);
