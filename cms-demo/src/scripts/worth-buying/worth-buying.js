/**
 * Created by fengs on 2016/9/16.
 * 值得买
 */
var Table = require("../../component/table-component");
var EditForm = require("../../component/edit-form");
var WorthBuyingStore = require("./store/worth-buying-store");
var WorthBuyingAction = require("./action/worth-buying-action");
var WorthBuying = React.createClass({
	getInitialState: function () {
		var data = WorthBuyingStore.getState();
		return data;
	},

	onChange: function () {
		var data = WorthBuyingStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		WorthBuyingStore.listen(this.onChange);
		WorthBuyingAction.getWorthBuyingList();
	},

	componentWillUnmount: function () {
		WorthBuyingStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			WorthBuyingAction.deleteSpecial(data.id);
		},
		showEditFrom: function (rowData) {
			WorthBuyingAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			WorthBuyingAction.showAddFrom();
		},
		addSpecial: function (newData) {
			WorthBuyingAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			WorthBuyingAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			WorthBuyingAction.hideEditFrom();
		}
	},

	render: function () {
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						addSpecial={this.events.addSpecial}
						editSpecial={this.events.editSpecial}
						allData={this.state.worthBuyingList}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.worthBuyingList} titleData={"值得买列表（最多三个）"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = WorthBuying;