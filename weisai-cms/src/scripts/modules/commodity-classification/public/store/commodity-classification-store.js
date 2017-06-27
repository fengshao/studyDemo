/**
 * Created by fengshao on 2017/1/22.
 */
var CommodityClassificationAction = require("../action/commodity-classification-action");

function CommodityClassificationStore() {
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.loading = false;
	this.editRowData = {
		id: "",
		title: "",//商品分类名称
		pic: "",//图片
		pic_select: "",//选中图片
		spm: "",//
		create_time: "",//创建时间
		update_time: "",//更新时间
		is_sale: "",//上下架状态  0上架 1下架(默认)
		wechat_url: "",//微信URL
		qq_url: "",//手QURL
		status: ""//状态 0有效 1无效
	};

	this.pagination = {
		total: 0,
		showTotal: total => `共 ${total} 条`,
		defaultCurrent: 1,
		per_page: 10,
		current_page: 1,
		showQuickJumper: true,
		showSizeChanger: true
	};
	this.filtersData = {
		sort: "desc",
		order: "create_time",
		current_page: 1,
		per_page: 10,
		content: ""
	};

	this.total = 0;
	this.commodityClassificationList = [];
	this.bindActions(CommodityClassificationAction);
}

CommodityClassificationStore.prototype.getGoodsTypeList = function (obj) {
	var data = obj.data;
	this.total = data.total;
	this.pagination = {
		total: data.total,
		showTotal: total => `共 ${total} 条`,
		defaultCurrent: 1,
		per_page: data.per_page,
		current_page: data.current_page,
		showQuickJumper: true,
		showSizeChanger: true
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.loading = false;
	this.commodityClassificationList = data.data ? data.data : [];
	this.filtersData = _.extend(this.filtersData, obj.filtersData);
};

CommodityClassificationStore.prototype.delGoodsType = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.commodityClassificationList.length; i++) {
			if (id == this.commodityClassificationList[i].id) {
				this.commodityClassificationList.splice(i, 1);
			}
		}
	}
	this.total = this.total - 1;
	var newPagination = {
		total: this.total,
		showTotal: total => `共 ${total} 条`,
		defaultCurrent: 1,
		per_page: 10,
		current_page: 1,
		showQuickJumper: true,
		showSizeChanger: true
	}
	this.filtersData = _.extend(this.pagination, newPagination);

};

CommodityClassificationStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

CommodityClassificationStore.prototype.showAddFrom = function () {
	this.editRowData = {
		id: "",
		title: "",
		pic: "",
		pic_select: "",
		spm: "",
		create_time: "",
		update_time: "",
		is_sale: "",
		wechat_url: "",
		qq_url: "",
		status: ""
	};
	this.isShowAddFrom = true;
};

CommodityClassificationStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		id: "",
		title: "",
		pic: "",
		pic_select: "",
		spm: "",
		create_time: "",
		update_time: "",
		is_sale: "",
		wechat_url: "",
		qq_url: "",
		status: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

CommodityClassificationStore.prototype.loadingFnc = function () {
	this.loading = true;
};


module.exports = alt.createStore(CommodityClassificationStore, 'CommodityClassificationStore');