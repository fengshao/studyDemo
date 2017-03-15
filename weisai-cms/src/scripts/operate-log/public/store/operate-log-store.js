/**
 * Created by fengshao on 2016/11/7.
 */
var OperateLogAction = require("../action/operate-log-action");


function OperateLogStore() {
	this.operateLogList = [];
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
		order: "desc",
		field: "operate_time",
		current_page: 1,
		per_page: 10,
		operateDateStart: "",
		operateDateEnd: "",
		content: ""
	};
	this.bindActions(OperateLogAction);
}

OperateLogStore.prototype.getOperateLogList = function (obj) {
	var data = obj.data;
	this.pagination = {
		total: data.total,
		showTotal: total => `共 ${total} 条`,
		defaultCurrent: 1,
		per_page: data.per_page,
		current_page: data.current_page,
		showQuickJumper: true,
		showSizeChanger: true
	};
	this.loading = false;
	this.operateLogList = data.data ? data.data : [];
	this.filtersData = _.extend(this.filtersData, obj.filtersData);
};
OperateLogStore.prototype.loadingFnc = function () {
	this.loading = true;
};

module.exports = alt.createStore(OperateLogStore, 'OperateLogStore');