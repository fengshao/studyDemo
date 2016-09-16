/**
 * Created by fengs on 2016/9/16.
 */
var MainActivityAjax = require("../ajax/MainActivity-setting-ajax");

function MainActivityAction() {

	this.generateActions(
		'getMainActivityList'
	);

	this.getMainActivityList = function () {
		var _this = this;
		MainActivityAjax.getMainActivityList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(MainActivityAction);