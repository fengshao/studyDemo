/**
 * Created by fengshao on 2016/10/8.
 */
var SpecialAction = require("../action/fashion-action");


function SpecialStore() {
	this.fashionlList = [];
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

SpecialStore.prototype.getFashionList = function (fashionlList) {
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
	this.fashionlList = fashionlList ? fashionlList : [];
};

SpecialStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.fashionlList.length; i++) {
			if (id == this.fashionlList[i].id) {
				this.fashionlList.splice(i, 1);
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