/**
 * Created by fengshao on 2016/11/7.
 */
var SpecialTypeListAction = require("../action/spcial-type-list-action");


function SpecialTypeListStore() {
	this.speciaTypelList = [];
	this.editRowData = {
		id: "",
		parent_id: "",
		status: "",
		type_en: "",
		type_name: "",
		update_time: "",
		sort: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.bindActions(SpecialTypeListAction);
}

SpecialTypeListStore.prototype.getSpecalTypeList = function (speciaTypelList) {

	var _this = this;
	this.editRowData = {
		id: "",
		parent_id: "",
		status: "",
		type_en: "",
		type_name: "",
		update_time: "",
		sort: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	_this.speciaTypelList = [];
	$.each(speciaTypelList, function (i, salesStage) {
		if (salesStage.id != 1 && salesStage.id != 2 && salesStage.id != 5) {
			_this.speciaTypelList.push(salesStage);
		}
	});
};


SpecialTypeListStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

SpecialTypeListStore.prototype.showAddFrom = function () {
	this.editRowData = {
		id: "",
		parent_id: "",
		status: "",
		type_en: "",
		type_name: "",
		update_time: "",
		sort: ""
	};
	this.isShowAddFrom = true;
};

SpecialTypeListStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		id: "",
		parent_id: "",
		status: "",
		type_en: "",
		type_name: "",
		update_time: "",
		sort: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

module.exports = alt.createStore(SpecialTypeListStore, 'SpecialTypeListStore');