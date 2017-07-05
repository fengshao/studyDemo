/**
 * Created by fengs on 2016/9/16.
 * 值得买
 */
var Table = require("../../../component/table-component");
var EditForm = require("../../../component/edit-form");
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
		WorthBuyingAction.getWorthBuyingList(this.props.location.query.type_id);
	},

	componentWillUnmount: function () {
		WorthBuyingStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			WorthBuyingAction.deleteSpecial(data);
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
		var typeNmae = this.props.location.query.type_name;
		var typeID = this.props.location.query.type_id;
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						addSpecial={this.events.addSpecial}
						editSpecial={this.events.editSpecial}
						allData={this.state.worthBuyingList}
						typeID={typeID}
						editRowData={this.state.editRowData}
						appImgSize = {0.1}
					/>) : (
					<Table tableData={this.state.worthBuyingList} titleData={typeNmae+"（手机端只显示前三个）"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = WorthBuying;