/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../ajax/public-ajax");
var BrandSettingAjax = require("../ajax/brand-setting-ajax");

function BrandSettingAction() {

	this.generateActions(
		'getBrandList',
		'deleteSpecial',
		'addSpecial',
		'editSpecial',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom'
	);

	this.getBrandList = function () {
		var _this = this;
		BrandSettingAjax.getBrandList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.addSpecial = function (newData) {
		var _this = this;
		newData.type_id = "1";
		newData.img = "http://devel-10016962.file.myqcloud.com/9/c81/3af2e/9c81e3af2e0b0ae7d1fd6a3d7891ad09.jpg";
		PublicAjax.addSpecial(newData).then(function (list) {
			//_this.dispatch(list.data);
			_this.actions.getBrandList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecial = function (newData) {
		var _this = this;
		newData.img = newData.img ? newData.img : "http://devel-10016962.file.myqcloud.com/9/c81/3af2e/9c81e3af2e0b0ae7d1fd6a3d7891ad09.jpg";
		PublicAjax.editSpecial(newData).then(function (list) {
			_this.actions.getBrandList();
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
module.exports = alt.createActions(BrandSettingAction);