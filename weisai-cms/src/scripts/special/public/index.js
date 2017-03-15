/**
 * Created by fengs on 2016/9/16.
 */
var Table = require("../../../component/table-component");
var EditForm = require("../../../component/edit-form");
var SpecialStore = require("./store/special-store");
var SpecialAction = require("./action/special-action");
var Special = React.createClass({

	getInitialState: function () {
		var data = SpecialStore.getState();
		return data;
	},

	onChange: function () {
		var data = SpecialStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		SpecialStore.listen(this.onChange);
		SpecialAction.getSpecialList(this.props.location.query.type_id);
	},

	componentWillUnmount: function () {
		SpecialStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			SpecialAction.deleteSpecial(data);
		},
		showEditFrom: function (rowData) {
			SpecialAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			SpecialAction.showAddFrom();
		},
		addSpecial: function (newData) {
			SpecialAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			SpecialAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			SpecialAction.hideEditFrom();
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
						allData={this.state.specialList}
						typeID={typeID}
						editRowData={this.state.editRowData}
						appImgSize={0.2}
					/>) : (
					<Table tableData={this.state.specialList} titleData={typeNmae}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = Special;