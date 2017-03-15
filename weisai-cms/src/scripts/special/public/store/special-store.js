/**
 * Created by fengs on 2016/9/16.
 */
var SpecialAction = require("../action/special-action");


function SpecialStore() {
	this.specialList = [];
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(SpecialAction);
}

SpecialStore.prototype.getSpecialList = function (specialList) {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.specialList = specialList ? specialList : [];
};

SpecialStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.specialList.length; i++) {
			if (id == this.specialList[i].id) {
				this.specialList.splice(i, 1);
			}
		}
	}

};

SpecialStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

SpecialStore.prototype.showAddFrom = function () {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowAddFrom = true;
};

SpecialStore.prototype.addSpecial = function () {
};

SpecialStore.prototype.editSpecial = function () {
};

SpecialStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

module.exports = alt.createStore(SpecialStore, 'SpecialStore');