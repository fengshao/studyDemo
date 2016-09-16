/**
 * Created by fengs on 2016/9/16.
 */
var BrandSettingAction = require("../action/brand-setting-action");

function BrandSettingStore() {
	this.brandSettingList = [];
	this.bindActions(BrandSettingAction);
}

//获取团队分组列表
BrandSettingStore.prototype.getBrandList = function (brandSettingLists) {
	this.brandSettingList = brandSettingLists;
};

module.exports = alt.createStore(BrandSettingStore, 'BrandSettingStore');