/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAjax = require("../ajax/worth-buying-ajax");

function WorthBuyingAction() {

	this.generateActions(
		'getWorthBuyingList'
	);

	this.getWorthBuyingList = function () {
		var _this = this;
		WorthBuyingAjax.getWorthBuyingList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(WorthBuyingAction);