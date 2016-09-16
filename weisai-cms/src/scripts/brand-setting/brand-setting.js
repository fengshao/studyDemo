/**
 * Created by xiaojinfeng on 2016/09/16.
 * 主题设置
 */

var BrandSettingStore = require("./store/brand-setting-store");
var BrandSettingAction = require("./action/brand-setting-action");

var BrandSetting = React.createClass({
	getInitialState: function () {
		var data = BrandSettingStore.getState();
		return data;
	},

	onChange: function () {
		var data = BrandSettingStore.getState();
		this.setState(data);
	},

	resizeWindow: function () {
	},

	componentDidMount: function () {
		$("body").css("overflow", "hidden");
		$(window).on("resize", this.resizeWindow);
		BrandSettingStore.listen(this.onChange);
		BrandSettingAction.getBrandSettingList();
	},

	componentWillUnmount: function () {
		$(window).off("resize", this.resizeWindow);
		BrandSettingStore.unlisten(this.onChange);
		$("body").css("overflow", "auto");
	},

	events: {
		getSalesTeamMemberList: function (salesTeamGroupId) {
			SalesTeamAction.getSalesTeamMemberList(salesTeamGroupId);
			SalesTeamAction.getSelectSalesTeamGroupId(salesTeamGroupId);
		}
	},

	render: function () {
		return (
			<div>我是品牌设置页面</div>
		);
	}
});

module.exports = BrandSetting;