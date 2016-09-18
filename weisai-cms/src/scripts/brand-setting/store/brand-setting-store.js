/**
 * Created by fengs on 2016/9/16.
 */
var BrandSettingAction = require("../action/brand-setting-action");

function BrandSettingStore() {
	this.brandSettingList = [];
	this.editRowData = {};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(BrandSettingAction);
}

BrandSettingStore.prototype.getBrandList = function (brandSettingLists) {
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.brandSettingList = brandSettingLists;
};

BrandSettingStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.brandSettingList.length; i++) {
			if (id == this.brandSettingList[i].id) {
				this.brandSettingList.splice(i, 1);
			}
		}
	}

};

BrandSettingStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

BrandSettingStore.prototype.showAddFrom = function () {
	this.isShowAddFrom = true;
};

BrandSettingStore.prototype.addSpecial = function () {
};

BrandSettingStore.prototype.editSpecial = function () {
};

BrandSettingStore.prototype.hideEditFrom = function () {
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

BrandSettingStore.prototype.checkSpecialSort = function (newSpecialSort) {
	this.isShowEditFrom = false;
};

BrandSettingStore.prototype.checkSpecialName = function (newSpecialName) {
	var _this = this;
	for (var i = 0; i < _this.specialList.length; i++) {
		if (newSpecialName == _this.specialList[i].title) {
			_this.isHaveSpecialName = true;
			console.log("_this.isHaveSpecialName:" + _this.isHaveSpecialName);
			break;
		}
	}
};

module.exports = alt.createStore(BrandSettingStore, 'BrandSettingStore');