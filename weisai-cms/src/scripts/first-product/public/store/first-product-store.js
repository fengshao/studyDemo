/**
 * Created by fengs on 2016/9/16.
 */
var FirstProductAction = require("../action/first-product-action");

function FirstProductStore() {
	this.firstProductList = [];
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
	this.bindActions(FirstProductAction);
}

FirstProductStore.prototype.getFirstProductList = function (firstProductList) {
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
	this.firstProductList = firstProductList;
};

FirstProductStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.firstProductList.length; i++) {
			if (id == this.firstProductList[i].id) {
				this.firstProductList.splice(i, 1);
			}
		}
	}

};

FirstProductStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

FirstProductStore.prototype.showAddFrom = function () {
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

FirstProductStore.prototype.addSpecial = function () {
};

FirstProductStore.prototype.editSpecial = function () {
};

FirstProductStore.prototype.hideEditFrom = function () {
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

module.exports = alt.createStore(FirstProductStore, 'FirstProductStore');