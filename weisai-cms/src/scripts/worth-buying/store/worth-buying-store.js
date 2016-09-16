/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAction = require("../action/brand-setting-action");

function WorthBuyingStore() {
	this.WorthBuyingList = [];
	this.bindActions(WorthBuyingAction);
}

//获取团队分组列表
WorthBuyingStore.prototype.getBrandList = function (WorthBuyingLists) {
	this.WorthBuyingList = WorthBuyingLists;
};

module.exports = alt.createStore(WorthBuyingStore, 'WorthBuyingStore');