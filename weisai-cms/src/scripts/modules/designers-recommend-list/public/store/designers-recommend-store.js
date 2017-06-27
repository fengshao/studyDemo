/**
 * Created by fengshao on 2016/11/24.
 */
var DesignersRecAction = require("../action/designers-recommend-action");


function DesignersRecStore() {
	this.designersRecList = [];
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
	this.bindActions(DesignersRecAction);
}

DesignersRecStore.prototype.getDesignersRecList = function (designersRecList) {
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
	this.designersRecList = designersRecList ? designersRecList : [];
};

DesignersRecStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.designersRecList.length; i++) {
			if (id == this.designersRecList[i].id) {
				this.designersRecList.splice(i, 1);
			}
		}
	}

};

DesignersRecStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

DesignersRecStore.prototype.showAddFrom = function () {
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

DesignersRecStore.prototype.addSpecial = function () {
};

DesignersRecStore.prototype.editSpecial = function () {
};

DesignersRecStore.prototype.hideEditFrom = function () {
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

module.exports = alt.createStore(DesignersRecStore, 'DesignersRecStore');