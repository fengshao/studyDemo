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
		showEditFrom: function () {
			SpecialAction.showEditFrom();
		},
		hideEditFrom: function () {
			SpecialAction.hideEditFrom();
		}
	},

	render: function () {
		return (
			<div>
				{this.state.isShowEditFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
					/>) : (
					<Table tableData={this.state.specialList} titleData={"专题列表"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
					/>)}

			</div>
		);
	}
});

module.exports = Special;