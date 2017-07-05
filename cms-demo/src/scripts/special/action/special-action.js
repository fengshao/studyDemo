/**
 * Created by fengs on 2016/9/16.
 */

var PublicAjax = require("../../../ajax/public-ajax");

function SpecialAction() {

	this.generateActions(
		'getSpecialList',
		'deleteSpecial',
		'addSpecial',
		'editSpecial',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom'
	);

	this.getSpecialList = function () {
		var _this = this;
		PublicAjax.getSpecialList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.addSpecial = function (newData) {
		var _this = this;
		newData.type_id = "5";
		PublicAjax.addSpecial(newData).then(function (list) {
			//_this.dispatch(list.data);
			_this.actions.getSpecialList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecial = function (newData) {
		var _this = this;
		PublicAjax.editSpecial(newData).then(function (list) {
			_this.actions.getSpecialList();
			//_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.deleteSpecial = function (id) {
		var _this = this;
		PublicAjax.deleteSpecial(id).then(function (data) {
			_this.dispatch({
				id: id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(SpecialAction);