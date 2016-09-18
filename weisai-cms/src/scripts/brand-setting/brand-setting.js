/**
 * Created by xiaojinfeng on 2016/09/16.
 * 主题设置
 */
var Table = require("../../component/table-component");
var EditForm = require("../../component/edit-form");
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


	componentDidMount: function () {
		BrandSettingStore.listen(this.onChange);
		BrandSettingAction.getBrandList();
	},

	componentWillUnmount: function () {
		BrandSettingStore.unlisten(this.onChange);
	},

	events: {
		deleteSpecialFnc: function (data) {
			BrandSettingAction.deleteSpecial(data.id);
		},
		checkSpecialName: function (newSpecialName) {
			BrandSettingAction.checkSpecialName(newSpecialName);
		},
		checkSpecialSort: function (newSpecialName) {
			BrandSettingAction.checkSpecialSort(newSpecialSort);
		},
		showEditFrom: function (rowData) {
			BrandSettingAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			BrandSettingAction.showAddFrom();
		},
		addSpecial: function (newData) {
			BrandSettingAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			BrandSettingAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			BrandSettingAction.hideEditFrom();
		}
	},

	render: function () {
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						checkSpecialName={this.events.checkSpecialName}
						checkSpecialSort={this.events.checkSpecialSort}
						addSpecial={this.events.addSpecial}
						editSpecial={this.events.editSpecial}
						allData={this.state.brandSettingList}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.brandSettingList} titleData={"品牌设置（最多四个）"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = BrandSetting;