/**
 * Created by fengs on 2016/9/16.
 */
var Table = require("../../component/table-component");
var EditForm = require("../../component/edit-form");
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

	resizeWindow: function () {
	},

	componentDidMount: function () {
		$("body").css("overflow", "hidden");
		$(window).on("resize", this.resizeWindow);
		SpecialStore.listen(this.onChange);
		SpecialAction.getSpecialList();
	},

	componentWillUnmount: function () {
		$(window).off("resize", this.resizeWindow);
		SpecialStore.unlisten(this.onChange);
		$("body").css("overflow", "auto");
	},

	events: {
		deleteSpecialFnc: function (data) {
			SpecialAction.deleteSpecial(data.id);
		},
		checkSpecialName: function (newSpecialName) {
			SpecialAction.checkSpecialName(newSpecialName);
		},
		checkSpecialSort: function (newSpecialName) {
			SpecialAction.checkSpecialSort(newSpecialSort);
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
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						isHaveSpecialName={this.state.isHaveSpecialName}
						isHaveSpecialSort={this.state.isHaveSpecialSort}
						checkSpecialName={this.events.checkSpecialName}
						checkSpecialSort={this.events.checkSpecialSort}
						addSpecial={this.events.addSpecial}
						editSpecial={this.events.editSpecial}
						allData={this.state.specialList}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.specialList} titleData={"专题列表"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = Special;