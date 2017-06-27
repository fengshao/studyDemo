/**
 * Created by xiaojinfeng on 2016/09/16.
 * 主题设置
 */
var Table = require("../../../../component/table-component");
var EditForm = require("../../../../component/edit-form");
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
		BrandSettingAction.getBrandList(this.props.location.query.type_id);
	},

	componentWillUnmount: function () {
		BrandSettingStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			BrandSettingAction.deleteSpecial(data);
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
		var typeNmae = this.props.location.query.type_name;
		var typeID = this.props.location.query.type_id;
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						addSpecial={this.events.addSpecial}
						editSpecial={this.events.editSpecial}
						allData={this.state.brandSettingList}
						typeID={typeID}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.brandSettingList} titleData={typeNmae}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = BrandSetting;