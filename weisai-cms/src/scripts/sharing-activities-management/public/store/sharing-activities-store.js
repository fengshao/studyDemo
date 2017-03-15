/**
 * Created by fengshao on 2017/1/22.
 */
var SharingActivitiesAction = require("../action/sharing-activities-action");

function SharingActivitiesStore() {
	this.goodsTypeList = [];//商品分类列表
	this.selectGoodsTypeList = [];//当前选择的商品分类列表
	this.sharingActivitiesList = [];
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.editAllData = {};
	this.current = 0;//当前第几步 从0开始
	this.isShowCommodityClassificationAddModal = false;//选择商品分类model是否展示
	this.editRowData = {
		id: "",
		title: "",//活动名称
		start_time: "",//活动开始时间
		end_time: "",//活动结束时间
		create_time: "",//创建时间
		update_time: "",//修改时间
		bg_body: "",//页面body背景图片
		bg_banner: "",//banner背景图片
		bg_hb: "",//红包背景图片
		bg_goods: "",//商品背景图片
		bg_separate: "",//区域分隔图片
		spm: "",//
		back_home_bg: "",//返回首页图片
		back_home_url_wechat: "",//返回首页微信端URL
		back_home_url_qq: "",//返回首页手Q端URL
		share_friends_title: "",//分享至朋友圈标题
		share_friends_pic: "",//分享至朋友圈图片
		share_group_title: "",//分享至群组标题
		share_group_detail: "",//分享至群组详情
		share_group_pic: "",//分享至群组图片
		banner_from: "",//banner位样式，1活动图片 2设计师推荐
		activity_pic_banner: "",//banner位样式为活动图片时的图片，当banner_from=1时
		activity_wechat_url: "",//banner位样式为活动图片时微信链接，当banner_from=1时
		activity_qq_url: "",//banner位样式为活动图片时的手Q链接，当banner_from=1时
		banner: "",//选中的专题ID，如1,4,5,12,8
		is_had_hb: "",//是否添加红包，1添加 2不添加
		bg_music: "",//活动背景音乐
		hb_count: "",//几个红包
		hb_1_url_wechat: "",//红包1微信端链接
		hb_1_url_qq: "",//红包1手Q端链接
		hb_1_img: "",//红包1图片
		hb_2_url_wechat: "",//红包2微信端链接
		hb_2_url_qq: "",//红包2手Q端链接
		hb_2_img: "",//红包2图片
		hb_3_url_wechat: "",//红包3微信端链接
		hb_3_url_qq: "",//红包3手Q端链接
		hb_3_img: "",//红包3图片
		wechat_url: "",//部署微信端链接
		qq_url: "",//部署手Q端链接
		is_sale: 1 //启用禁用 状态 0 启用 1 禁用
	};

	this.loading = true;
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
		order: "operate_time",
		current_page: 1,
		per_page: 10,
		start_time_start: "",
		start_time_end: "",
		end_time_start: "",
		end_time_end: "",
		content: ""
	};

	this.message = "";
	this.messageTitle = "";
	this.wechat_url = "";
	this.qq_url = "";
	this.messageCode = 0;
	this.showMessageFlag = false;

	this.bindActions(SharingActivitiesAction);
}


SharingActivitiesStore.prototype.getActivityList = function (obj) {

	var data = obj.activityList;
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
	this.current = 0;//当前第几步 从0开始
	this.isShowCommodityClassificationAddModal = false;//选择商品分类model是否展示
	this.loading = false;
	this.sharingActivitiesList = data.data ? data.data : [];
	this.wechat_url = data.data && data.data.wechat_url ? data.data.wechat_url : "";
	this.qq_url = data.data && data.data.qq_url ? data.data.qq_url : "";
	this.filtersData = _.extend(this.filtersData, obj.filtersData);
	this.goodsTypeList = obj.goodsTypeList.data ? obj.goodsTypeList.data : [];
};

SharingActivitiesStore.prototype.delActivity = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.sharingActivitiesList.length; i++) {
			if (id == this.sharingActivitiesList[i].id) {
				this.sharingActivitiesList.splice(i, 1);
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

SharingActivitiesStore.prototype.shelfActivity = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.sharingActivitiesList.length; i++) {
			if (id == this.sharingActivitiesList[i].id) {
				this.sharingActivitiesList[i].is_sale = 0;
			}
		}
	}
};

SharingActivitiesStore.prototype.offShelfActivity = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.sharingActivitiesList.length; i++) {
			if (id == this.sharingActivitiesList[i].id) {
				this.sharingActivitiesList[i].is_sale = 1;
			}
		}
	}
};

SharingActivitiesStore.prototype.checkSelectGoodsTypeList = function () {
	var newArr = [];
	var _this = this;

	_.each(_this.selectGoodsTypeList, function (value) {
		_.map(_this.goodsTypeList, function (goodsType, key) {
			if (value == goodsType.id) {
				newArr.push(value);
			}
		})
	});
	this.selectGoodsTypeList = [].concat(newArr);
};

SharingActivitiesStore.prototype.showEditFrom = function (rowData) {
	this.selectGoodsTypeList = rowData && rowData.banner ? rowData.banner.split(",") : [];

	this.checkSelectGoodsTypeList();

	this.editRowData = rowData;
	this.editAllData = _.extend(this.editAllData, this.editRowData);

	this.isShowEditFrom = true;
};

SharingActivitiesStore.prototype.showAddFrom = function () {
	this.editRowData = {
		id: "",
		title: "",//活动名称
		start_time: "",//活动开始时间
		end_time: "",//活动结束时间
		create_time: "",//创建时间
		update_time: "",//修改时间
		bg_body: "",//页面body背景图片
		bg_banner: "",//banner背景图片
		bg_hb: "",//红包背景图片
		bg_goods: "",//商品背景图片
		bg_separate: "",//区域分隔图片
		spm: "",//
		back_home_bg: "",//返回首页图片
		back_home_url_wechat: "",//返回首页微信端URL
		back_home_url_qq: "",//返回首页手Q端URL
		share_friends_title: "",//分享至朋友圈标题
		share_friends_pic: "",//分享至朋友圈图片
		share_group_title: "",//分享至群组标题
		share_group_detail: "",//分享至群组详情
		share_group_pic: "",//分享至群组图片
		banner_from: "",//banner位样式，1活动图片 2设计师推荐
		activity_pic_banner: "",//banner位样式为活动图片时的图片，当banner_from=1时
		activity_wechat_url: "",//banner位样式为活动图片时微信链接，当banner_from=1时
		activity_qq_url: "",//banner位样式为活动图片时的手Q链接，当banner_from=1时
		banner: "",//选中的专题ID，如1,4,5,12,8
		is_had_hb: "",//是否添加红包，1添加 2不添加
		bg_music: "",//活动背景音乐
		hb_count: "",//几个红包
		hb_1_url_wechat: "",//红包1微信端链接
		hb_1_url_qq: "",//红包1手Q端链接
		hb_1_img: "",//红包1图片
		hb_2_url_wechat: "",//红包2微信端链接
		hb_2_url_qq: "",//红包2手Q端链接
		hb_2_img: "",//红包2图片
		hb_3_url_wechat: "",//红包3微信端链接
		hb_3_url_qq: "",//红包3手Q端链接
		hb_3_img: "",//红包3图片
		wechat_url: "",//部署微信端链接
		qq_url: "",//部署手Q端链接
		is_sale: 1 //启用禁用 状态 0 启用 1 禁用
	};
	this.selectGoodsTypeList = [];
	this.editAllData = _.extend(this.editAllData, this.editRowData);
	this.isShowAddFrom = true;
};

SharingActivitiesStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		id: "",
		title: "",//活动名称
		start_time: "",//活动开始时间
		end_time: "",//活动结束时间
		create_time: "",//创建时间
		update_time: "",//修改时间
		bg_body: "",//页面body背景图片
		bg_banner: "",//banner背景图片
		bg_hb: "",//红包背景图片
		bg_goods: "",//商品背景图片
		bg_separate: "",//区域分隔图片
		spm: "",//
		back_home_bg: "",//返回首页图片
		back_home_url_wechat: "",//返回首页微信端URL
		back_home_url_qq: "",//返回首页手Q端URL
		share_friends_title: "",//分享至朋友圈标题
		share_friends_pic: "",//分享至朋友圈图片
		share_group_title: "",//分享至群组标题
		share_group_detail: "",//分享至群组详情
		share_group_pic: "",//分享至群组图片
		banner_from: "",//banner位样式，1活动图片 2设计师推荐
		activity_pic_banner: "",//banner位样式为活动图片时的图片，当banner_from=1时
		activity_wechat_url: "",//banner位样式为活动图片时微信链接，当banner_from=1时
		activity_qq_url: "",//banner位样式为活动图片时的手Q链接，当banner_from=1时
		banner: "",//选中的专题ID，如1,4,5,12,8
		is_had_hb: "",//是否添加红包，1添加 2不添加
		bg_music: "",//活动背景音乐
		hb_count: "",//几个红包
		hb_1_url_wechat: "",//红包1微信端链接
		hb_1_url_qq: "",//红包1手Q端链接
		hb_1_img: "",//红包1图片
		hb_2_url_wechat: "",//红包2微信端链接
		hb_2_url_qq: "",//红包2手Q端链接
		hb_2_img: "",//红包2图片
		hb_3_url_wechat: "",//红包3微信端链接
		hb_3_url_qq: "",//红包3手Q端链接
		hb_3_img: "",//红包3图片
		wechat_url: "",//部署微信端链接
		qq_url: "",//部署手Q端链接
		is_sale: 1 //启用禁用 状态 0 启用 1 禁用
	};
	this.editAllData = _.extend(this.editAllData, this.editRowData);
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.selectGoodsTypeList = [];
	this.current = 0;
};

SharingActivitiesStore.prototype.showCommodityClassificationAddModal = function () {
	this.isShowCommodityClassificationAddModal = true;
};

SharingActivitiesStore.prototype.uploadHtml = function (obj) {
	var data = obj.data;
	var id = obj.id;
	var _this = this;

	var code = data && data.code == 0 ? data.code : "1";
	this.showMessageFlag = true;
	this.messageTitle = code == 0 ? "部署成功" : "部署失败，请重试";
	this.message = code == 0 ? data.data ? data.data.CDN : "" : "";
	this.wechat_url = code == 0 ? data.data ? data.data.url_wechat : "暂无链接" : "暂无链接";
	this.qq_url = code == 0 ? data.data ? data.data.url_qq : "暂无链接" : "暂无链接";
	this.sharingActivitiesList.map(function (sharingActivities, key) {
		if (sharingActivities.id == id) {
			sharingActivities.qq_url = _this.qq_url;
			sharingActivities.wechat_url = _this.wechat_url;
		}
	});
};

SharingActivitiesStore.prototype.showCopeModel = function (rowData) {
	this.showMessageFlag = true;
	this.messageTitle = "部署链接";
	this.message = "";
	this.wechat_url = rowData.wechat_url ? rowData.wechat_url : "暂无链接";
	this.qq_url = rowData.qq_url ? rowData.qq_url : "暂无链接";
};

SharingActivitiesStore.prototype.hideMessage = function () {
	this.showMessageFlag = false;
	this.message = "";
	this.messageTitle = "";
};

SharingActivitiesStore.prototype.hideCommodityClassificationAddModal = function () {
	this.isShowCommodityClassificationAddModal = false;
};

SharingActivitiesStore.prototype.nextCurrent = function (data) {
	this.editAllData = _.extend(this.editAllData, data);
	this.current++
};

SharingActivitiesStore.prototype.previousCurrent = function (data) {
	this.editAllData = _.extend(this.editAllData, data);
	this.current--
};

SharingActivitiesStore.prototype.loadingFnc = function () {
	this.loading = true;
};

SharingActivitiesStore.prototype.selectGoodsTypeFnc = function (data) {
	this.selectGoodsTypeList = [].concat(data);
	this.isShowCommodityClassificationAddModal = false;
};

SharingActivitiesStore.prototype.commodityClassificationOrderUp = function (data) {
	var nowIndex = $.inArray(data, this.selectGoodsTypeList);
	var test = this.selectGoodsTypeList[nowIndex];

	this.selectGoodsTypeList[nowIndex] = this.selectGoodsTypeList[nowIndex - 1];
	this.selectGoodsTypeList[nowIndex - 1] = test;

};

SharingActivitiesStore.prototype.commodityClassificationOrderDown = function (data) {
	var nowIndex = $.inArray(data, this.selectGoodsTypeList);
	var test = this.selectGoodsTypeList[nowIndex];

	this.selectGoodsTypeList[nowIndex] = this.selectGoodsTypeList[nowIndex + 1];
	this.selectGoodsTypeList[nowIndex + 1] = test;
};

SharingActivitiesStore.prototype.commodityClassificationRemove = function (data) {
	this.selectGoodsTypeList.splice($.inArray(data, this.selectGoodsTypeList), 1);
};


module.exports = alt.createStore(SharingActivitiesStore, 'SharingActivitiesStore');