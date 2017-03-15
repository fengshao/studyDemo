/**
 * Created by fengshao on 2016/11/8.
 */
var ShareEditAction = require("../action/share-edit-action");
function ShareEditStore() {
	this.shareData = {
		id: "",
		title: "",
		wechat_circle: "",
		wechat_friends: "",
		qq_circle: "",
		qq_friends: "",
		img: ""
	};
	this.editRowData = {
		id: "",
		title: "",
		wechat_circle: "",
		wechat_friends: "",
		qq_circle: "",
		qq_friends: "",
		img: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(ShareEditAction);
}

ShareEditStore.prototype.getShareList = function (getShareList) {
	this.shareData = {
		id: "",
		title: "",
		wechat_circle: "",
		wechat_friends: "",
		qq_circle: "",
		qq_friends: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.shareData = getShareList ? getShareList[0] : this.shareData;
};

ShareEditStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

ShareEditStore.prototype.showAddFrom = function () {
	this.editRowData = {
		id: "",
		title: "",
		wechat_circle: "",
		wechat_friends: "",
		qq_circle: "",
		qq_friends: "",
		img: ""
	};
	this.isShowAddFrom = true;
};
ShareEditStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		id: "",
		title: "",
		wechat_circle: "",
		wechat_friends: "",
		qq_circle: "",
		qq_friends: "",
		img: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

module.exports = alt.createStore(ShareEditStore, 'ShareEditStore');