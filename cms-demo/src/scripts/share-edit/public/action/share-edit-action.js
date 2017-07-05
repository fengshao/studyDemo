/**
 * Created by fengshao on 2016/11/8.
 */
var PublicAjax = require("../../../../ajax/public-ajax");

function ShareEditAction() {

	this.generateActions(
		'getShareList',
		'addShare',
		'editShare',
		'showAddFrom',
		'showEditFrom',
		'hideEditFrom'
	);

	this.getShareList = function () {
		var _this = this;
		PublicAjax.getShareList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.addShare = function (newData) {
		var _this = this;
		PublicAjax.addShare(newData).then(function (list) {
			//_this.dispatch(list.data);
			_this.actions.getShareList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editShare = function (newData) {
		var _this = this;
		PublicAjax.editShare(newData).then(function (list) {
			_this.actions.getShareList();
			//_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(ShareEditAction);