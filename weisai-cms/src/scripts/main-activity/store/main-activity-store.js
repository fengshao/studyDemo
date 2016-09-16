/**
 * Created by fengs on 2016/9/16.
 */
var MainActivityAction = require("../action/MainActivity-setting-action");

function MainActivityStore() {
	this.MainActivityList = [];
	this.bindActions(MainActivityAction);
}

//获取团队分组列表
MainActivityStore.prototype.getMainActivityList = function (MainActivityLists) {
	this.MainActivityList = MainActivityLists;
};

module.exports = alt.createStore(MainActivityStore, 'MainActivityStore');