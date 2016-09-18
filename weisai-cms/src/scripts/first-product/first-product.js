/**
 * Created by fengs on 2016/9/16.
 * 最鲜品
 */
var Table = require("../../component/table-component");
var EditForm = require("../../component/edit-form");
var FirstProductStore = require("./store/first-product-store");
var FirstProductAction = require("./action/first-product-action");
var FirstProduct = React.createClass({
	getInitialState: function () {
		var data = FirstProductStore.getState();
		return data;
	},

	onChange: function () {
		var data = FirstProductStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		FirstProductStore.listen(this.onChange);
		FirstProductAction.getFirstProductList();
	},

	componentWillUnmount: function () {
		FirstProductStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			FirstProductAction.deleteSpecial(data.id);
		},
		showEditFrom: function (rowData) {
			FirstProductAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			FirstProductAction.showAddFrom();
		},
		addSpecial: function (newData) {
			FirstProductAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			FirstProductAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			FirstProductAction.hideEditFrom();
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
						allData={this.state.firstProductList}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.firstProductList} titleData={"最鲜品"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}

			</div>
		);
	}
});

module.exports = FirstProduct;