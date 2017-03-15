/**
 * Created by fengshao on 2016/11/25.
 */
var DesignersRecBgImgAction = require("../action/designers-recommend-bgimg-action");

function DesignersRecBgImgStore() {
	this.designersRecBgImg = {
		img1: "",//首层背景图片
		img2: "",//底层背景图片
		img3: "",//左箭头
		img4: "",//右箭头
		id: "",
		banner: ""
	};
	this.goodsTypeList = [];//商品分类列表
	this.selectGoodsTypeList = [];//当前选择的商品分类列表
	this.isShowCommodityClassificationAddModal = false;//选择商品分类model是否展示
	this.bindActions(DesignersRecBgImgAction);
}

DesignersRecBgImgStore.prototype.showCommodityClassificationAddModal = function () {
	this.isShowCommodityClassificationAddModal = true;
};

DesignersRecBgImgStore.prototype.hideCommodityClassificationAddModal = function () {
	this.isShowCommodityClassificationAddModal = false;
};

DesignersRecBgImgStore.prototype.selectGoodsTypeFnc = function (data) {
	this.selectGoodsTypeList = [].concat(data);
	this.isShowCommodityClassificationAddModal = false;
};

DesignersRecBgImgStore.prototype.commodityClassificationOrderUp = function (data) {
	var nowIndex = $.inArray(data, this.selectGoodsTypeList);
	var test = this.selectGoodsTypeList[nowIndex];

	this.selectGoodsTypeList[nowIndex] = this.selectGoodsTypeList[nowIndex - 1];
	this.selectGoodsTypeList[nowIndex - 1] = test;

};

DesignersRecBgImgStore.prototype.commodityClassificationOrderDown = function (data) {
	var nowIndex = $.inArray(data, this.selectGoodsTypeList);
	var test = this.selectGoodsTypeList[nowIndex];

	this.selectGoodsTypeList[nowIndex] = this.selectGoodsTypeList[nowIndex + 1];
	this.selectGoodsTypeList[nowIndex + 1] = test;
};

DesignersRecBgImgStore.prototype.commodityClassificationRemove = function (data) {
	this.selectGoodsTypeList.splice($.inArray(data, this.selectGoodsTypeList), 1);
};

DesignersRecBgImgStore.prototype.getBackgroundList = function (obj) {
	var _this = this;
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.designersRecBgImg = {
		img1: "",//首层背景图片
		img2: "",//底层背景图片
		img3: "",//左箭头
		img4: "",//右箭头
		id: "",
		banner: ""
	};
	this.isShowCommodityClassificationAddModal = false;//选择商品分类model是否展示
	this.selectGoodsTypeList = obj.backgroundList && obj.backgroundList.banner ? obj.backgroundList.banner.split(",") : [];
	this.goodsTypeList = obj.goodsTypeList.data ? obj.goodsTypeList.data : [];

	this.checkSelectGoodsTypeList();

	this.designersRecBgImg = obj.backgroundList ? obj.backgroundList : this.designersRecBgImg;
};

DesignersRecBgImgStore.prototype.checkSelectGoodsTypeList = function () {
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


DesignersRecBgImgStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.selectGoodsTypeList = rowData && rowData.banner ? rowData.banner.split(",") : [];
	this.checkSelectGoodsTypeList();

	this.isShowEditFrom = true;
};

DesignersRecBgImgStore.prototype.showAddFrom = function () {
	this.editRowData = {
		img1: "",//首层背景图片
		img2: "",//底层背景图片
		img3: "",//左箭头
		img4: "",//右箭头
		id: "",
		banner: ""
	};
	this.selectGoodsTypeList = [];
	this.isShowAddFrom = true;
};

DesignersRecBgImgStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		img1: "",//首层背景图片
		img2: "",//底层背景图片
		img3: "",//左箭头
		img4: "",//右箭头
		id: "",
		banner: ""
	};
	this.selectGoodsTypeList = this.designersRecBgImg ? this.designersRecBgImg.banner.split(",") : [];
	this.checkSelectGoodsTypeList();

	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

module.exports = alt.createStore(DesignersRecBgImgStore, 'DesignersRecBgImgStore');