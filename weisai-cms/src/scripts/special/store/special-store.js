/**
 * Created by fengs on 2016/9/16.
 */
var SpecialAction = require("../action/special-action");


function SpecialStore() {
	this.specialList = [];
	this.isShowEditFrom = false;
	this.bindActions(SpecialAction);
}

//获取团队分组列表
SpecialStore.prototype.getSpecialList = function (specialList) {
	this.specialList = specialList;
};

//获取团队分组列表
SpecialStore.prototype.deleteSpecial = function (obj) {
	var id = obj.id;
	for (var i = 0; i < this.specialList.length; i++) {
		if (id == this.specialList[i].id) {
			this.specialList.splice(i, 1);
		}
	}
};

//展示编辑表单
SpecialStore.prototype.showEditFrom = function () {
	this.isShowEditFrom = true;
};

//展示编辑表单
SpecialStore.prototype.hideEditFrom = function () {
	this.isShowEditFrom = false;
};
module.exports = alt.createStore(SpecialStore, 'SpecialStore');