/**
 * Created by fengshao on 2016/12/27.
 */
var APPAction = require("./left-menu-action");

function APPStore() {
	this.menus = [];
	this.loading = false;
	this.message = "";
	this.messageTitle = "";
	this.messageUrl = "";
	this.messageCode = 0;
	this.showMessageFlag = false;
	this.bindActions(APPAction);
}

APPStore.prototype.getUserData = function (menus) {
	this.menus = menus;
	window.sessionStorage.setItem("leftMenus", JSON.stringify(this.menus));
};

APPStore.prototype.uploadAppHtml = function (data) {
	this.loading = false;
	this.messageCode = data.code;
	this.showMessageFlag = true;
	this.messageTitle = data.code == 0 ? "部署成功" : "部署失败，请重试";
	this.message = data.code == 0 ? data.data ? data.data.CDN : "" : "";
	this.messageUrl = data.code == 0 ? data.data ? data.data.url : "" : "";
};

APPStore.prototype.uploadLoadingType = function (data) {
	this.loading = true;
};
APPStore.prototype.hideMessage = function () {
	this.showMessageFlag = false;
	this.message = "";
	this.messageTitle = "";
	this.messageUrl = "";
};

APPStore.prototype.getNewLeftMenu = function (menus) {
	this.menus = menus.sort(function (item1, item2) {
		return item1.type_id - item2.type_id;
	});
	window.sessionStorage.setItem("leftMenus", JSON.stringify(this.menus));
};

module.exports = altApp.createStore(APPStore, 'APPStore');