/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAction = require("../action/worth-buying-action");

function WorthBuyingStore() {
	this.worthBuyingList = [];
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(WorthBuyingAction);
}

WorthBuyingStore.prototype.getWorthBuyingList = function (worthBuyingList) {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.worthBuyingList = worthBuyingList;
};

WorthBuyingStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.worthBuyingList.length; i++) {
			if (id == this.worthBuyingList[i].id) {
				this.worthBuyingList.splice(i, 1);
			}
		}
	}

};

WorthBuyingStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

WorthBuyingStore.prototype.showAddFrom = function () {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.isShowAddFrom = true;
};

WorthBuyingStore.prototype.addSpecial = function () {
};

WorthBuyingStore.prototype.editSpecial = function () {
};

WorthBuyingStore.prototype.hideEditFrom = function () {
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

module.exports = alt.createStore(WorthBuyingStore, 'WorthBuyingStore');