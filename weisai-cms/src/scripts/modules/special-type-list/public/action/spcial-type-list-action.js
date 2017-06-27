/**
 * Created by fengshao on 2016/11/7.
 */
var PublicAjax = require("../../../../ajax/public-ajax");
var APPAction = require("../../../left-menu-action");

function SpecialTypeListAction() {

	this.generateActions(
		'getSpecalTypeList',
		'editSpecialType',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom'
	);

	this.getSpecalTypeList = function (type) {
		var _this = this;
		PublicAjax.getSpecalTypeList().then(function (list) {
			_this.dispatch(list.data);
			if (type) {
				APPAction.getNewLeftMenu(list.data);
			}
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecialType = function (newData) {
		var _this = this;
		PublicAjax.editSpecialType(newData).then(function (list) {
			_this.actions.getSpecalTypeList(true);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(SpecialTypeListAction);