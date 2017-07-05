/**
 * Created by fengshao on 2017/1/22.
 */
var CommodityManagementAction = require("../action/commodity-management-action");

function CommodityManagementStore() {
	this.isShowEditFrom = false;
	this.commodityList = [];
	this.isShowAddFrom = false;
	this.loading = false;
	this.editRowData = {
		id: "",
		type_id: "", //商品分类ID
		title: "",//商品名称
		title_color: "",//商品名称颜色
		description: "",//商品描述
		description_color: "",//商品描述颜色
		price: "",//商品价格
		price_color: "",//商品价格颜色
		price_desc: "",//商品售价文字标题
		price_desc_color: "",//商品售价文字标题颜色
		original_price: "",//商品原价
		original_price_color: "",//商品原价颜色
		pic: "",//商品图片
		qq_url: "",//微信链接
		wechat_url: "",//手Q链接
		spm: "",//
		sort: "",//排序
		desc_pic: "",//商品简介，图片
		create_time: "",//创建时间
		update_time: "",//修改时间
		status: "",//商品状态
		is_sale: "",//上下架状态  0上架 1下架(默认)
		desc_bg_pic: "",//商品简介背景图片
		is_include_desc: ""//是否包含商品简介
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
	this.bindActions(CommodityManagementAction);
}

CommodityManagementStore.prototype.getGoodsList = function (obj) {
	var data = obj.goodsList;
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
	this.commodityList = data.data ? data.data : [];
	this.filtersData = _.extend(this.filtersData, obj.filtersData);
	this.commodityClassificationList = obj.goodsTypeList.data ? obj.goodsTypeList.data : [];

};

CommodityManagementStore.prototype.delGoods = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.commodityList.length; i++) {
			if (id == this.commodityList[i].id) {
				this.commodityList.splice(i, 1);
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

CommodityManagementStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = _.extend(this.editRowData, rowData);
	var _this = this;

	this.isShowEditFrom = true;
};

CommodityManagementStore.prototype.showAddFrom = function () {
	this.editRowData = {
		id: "",
		type_id: "", //商品分类ID
		title: "",//商品名称
		title_color: "",//商品名称颜色
		description: "",//商品描述
		description_color: "",//商品描述颜色
		price: "",//商品价格
		price_color: "",//商品价格颜色
		price_desc: "",//商品售价文字标题
		price_desc_color: "",//商品售价文字标题颜色
		original_price: "",//商品原价
		original_price_color: "",//商品原价颜色
		pic: "",//商品图片
		qq_url: "",//微信链接
		wechat_url: "",//手Q链接
		spm: "",//
		sort: "",//排序
		desc_pic: "",//商品简介，图片
		create_time: "",//创建时间
		update_time: "",//修改时间
		status: "",//商品状态
		is_sale: "",//上下架状态  0上架 1下架(默认)
		desc_bg_pic: "",//商品简介背景图片
		is_include_desc: ""//是否包含商品简介
	};
	this.isShowAddFrom = true;
};

CommodityManagementStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		id: "",
		type_id: "", //商品分类ID
		title: "",//商品名称
		title_color: "",//商品名称颜色
		description: "",//商品描述
		description_color: "",//商品描述颜色
		price: "",//商品价格
		price_color: "",//商品价格颜色
		price_desc: "",//商品售价文字标题
		price_desc_color: "",//商品售价文字标题颜色
		original_price: "",//商品原价
		original_price_color: "",//商品原价颜色
		pic: "",//商品图片
		qq_url: "",//微信链接
		wechat_url: "",//手Q链接
		spm: "",//
		sort: "",//排序
		desc_pic: "",//商品简介，图片
		create_time: "",//创建时间
		update_time: "",//修改时间
		status: "",//商品状态
		is_sale: "",//上下架状态  0上架 1下架(默认)
		desc_bg_pic: "",//商品简介背景图片
		is_include_desc: ""//是否包含商品简介
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

CommodityManagementStore.prototype.loadingFnc = function () {
	this.loading = true;
};

module.exports = alt.createStore(CommodityManagementStore, 'CommodityManagementStore');