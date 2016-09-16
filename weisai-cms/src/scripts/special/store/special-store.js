/**
 * Created by fengs on 2016/9/16.
 */
var SpecialAction = require("../action/special-action.js");


function SpecialStore() {
	this.specialList = [];
	this.bindActions(SpecialAction);
}

//获取团队分组列表
BrandSettingStore.prototype.getBrandList = function (specialList) {
	this.specialList = specialList;
};

module.exports = alt.createStore(BrandSettingStore, 'SpecialStore');