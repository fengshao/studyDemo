/**
 * Created by fengs on 2016/9/16.
 */
var BrandSettingAction = require("../action/brand-setting-action");

function BrandSettingStore() {
	this.brandSettingList = [];
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(BrandSettingAction);
}

BrandSettingStore.prototype.getBrandList = function (brandSettingLists) {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
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
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.isShowAddFrom = true;
};

BrandSettingStore.prototype.addSpecial = function () {
};

BrandSettingStore.prototype.editSpecial = function () {
};

BrandSettingStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

module.exports = alt.createStore(BrandSettingStore, 'BrandSettingStore');