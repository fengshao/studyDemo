/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../../ajax/public-ajax");

function MainActivityAction() {

	this.generateActions(
		'getMainActivityList',
		'addSpecial',
		'editSpecial',
		'deleteSpecial',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom'
	);

	this.getMainActivity = function (typeID) {
		var _this = this;
		PublicAjax.getSpecialList(typeID).then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.addSpecial = function (newData) {
		var _this = this;
		PublicAjax.addSpecial(newData).then(function (list) {
			//_this.dispatch(list.data);
			_this.actions.getMainActivity(newData.type_id);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecial = function (newData) {
		var _this = this;
		PublicAjax.editSpecial(newData).then(function (list) {
			_this.actions.getMainActivity(newData.type_id);
			//_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.deleteSpecial = function (data) {
		var _this = this;
		var newData = {
			id: data.id,
			type_id: data.type_id
		}
		PublicAjax.deleteSpecial(newData).then(function (data) {
			_this.dispatch({
				id: newData.id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(MainActivityAction);