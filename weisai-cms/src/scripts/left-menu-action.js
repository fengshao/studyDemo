/**
 * Created by fengshao on 2016/12/27.
 */
var PublicAjax = require("../ajax/public-ajax");
function APPAction() {

	this.generateActions(
		'getUserData',
		'getNewLeftMenu',
		'uploadAppHtml',
		'uploadLoadingType',
		'hideMessage'
	);

	this.getUserData = function () {
		var _this = this;
		PublicAjax.getUserData().then(function (data) {
			_this.dispatch(data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
	this.getNewLeftMenu = function (newLeftMenu) {
		var _this = this;
		_this.dispatch(newLeftMenu);
	};
	this.hideMessage = function () {
		var _this = this;
		_this.dispatch();
	};
	this.uploadAppHtml = function () {
		var _this = this;
		PublicAjax.uploadAppHtml().then(function (data) {
			_this.dispatch(data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = altApp.createActions(APPAction);