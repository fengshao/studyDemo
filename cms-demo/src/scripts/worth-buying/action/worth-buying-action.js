/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../ajax/public-ajax");

function WorthBuyingAction() {

	this.generateActions(
		'getWorthBuyingList',
		'deleteSpecial',
		'addSpecial',
		'editSpecial',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom'
	);

	this.getWorthBuyingList = function () {
		var _this = this;
		PublicAjax.getWorthBuyingList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};


	this.addSpecial = function (newData) {
		var _this = this;
		newData.type_id = "3";
		PublicAjax.addSpecial(newData).then(function (list) {
			//_this.dispatch(list.data);
			_this.actions.getWorthBuyingList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecial = function (newData) {
		var _this = this;
		PublicAjax.editSpecial(newData).then(function (list) {
			_this.actions.getWorthBuyingList();
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
module.exports = alt.createActions(WorthBuyingAction);