/**
 * Created by fengs on 2016/9/16.
 */
var FirstProductAction = require("../action/first-product-action");

function FirstProductStore() {
	this.firstProductList = [];
	this.bindActions(FirstProductAction);
}

//获取团队分组列表
BrandSettingStore.prototype.getBrandList = function (firstProductList) {
	this.firstProductList = firstProductList;
};

module.exports = alt.createStore(FirstProductStore, 'FirstProductStore');