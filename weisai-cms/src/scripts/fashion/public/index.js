/**
 * Created by fengshao on 2016/10/8.
 */
var Table = require("../../../component/table-component");
var EditForm = require("../../../component/edit-form");
var FashionStore = require("./store/fashion-store");
var FashionAction = require("./action/fashion-action");
var Fashion = React.createClass({

	getInitialState: function () {
		var data = FashionStore.getState();
		return data;
	},

	onChange: function () {
		var data = FashionStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		FashionStore.listen(this.onChange);
		FashionAction.getFashionList(this.props.location.query.type_id);
	},

	componentWillUnmount: function () {
		FashionStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			FashionAction.deleteSpecial(data);
		},
		showEditFrom: function (rowData) {
			FashionAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			FashionAction.showAddFrom();
		},
		addSpecial: function (newData) {
			FashionAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			FashionAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			FashionAction.hideEditFrom();
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
						allData={this.state.fashionlList}
						typeID={typeID}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.fashionlList} titleData={typeNmae}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = Fashion;