/**
 * Created by fengs on 2016/9/16.
 */
var MainActivityAction = require("../action/main-activity-action");

function MainActivityStore() {
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
	this.mainActivityList = [];
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(MainActivityAction);
}

MainActivityStore.prototype.getMainActivity = function (mainActivityList) {
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
	this.mainActivityList = mainActivityList ? mainActivityList : [];
};

MainActivityStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.mainActivityList.length; i++) {
			if (id == this.mainActivityList[i].id) {
				this.mainActivityList.splice(i, 1);
			}
		}
	}

};

MainActivityStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

MainActivityStore.prototype.showAddFrom = function () {
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

MainActivityStore.prototype.hideEditFrom = function () {
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

module.exports = alt.createStore(MainActivityStore, 'MainActivityStore');