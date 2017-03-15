/**
 * Created by fengshao on 2016/11/7.
 */
var Table = require("./view/special-type-list-table");
var EditForm = require("./view/special-type-form");
var SpecialTypeListStore = require("./store/spcial-type-list-store");
var SpecialTypeListAction = require("./action/spcial-type-list-action");
var SpecialTypeList = React.createClass({

	getInitialState: function () {
		var data = SpecialTypeListStore.getState();
		return data;
	},

	onChange: function () {
		var data = SpecialTypeListStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		SpecialTypeListStore.listen(this.onChange);
		SpecialTypeListAction.getSpecalTypeList();
	},

	componentWillUnmount: function () {
		SpecialTypeListStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			SpecialTypeListAction.deleteSpecial(data.id);
		},
		showEditFrom: function (rowData) {
			SpecialTypeListAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			SpecialTypeListAction.showAddFrom();
		},
		editSpecialType: function (newData) {
			SpecialTypeListAction.editSpecialType(newData);
		},
		hideEditFrom: function () {
			SpecialTypeListAction.hideEditFrom();
		}
	},

	render: function () {
		var user_role = window.sessionStorage.getItem("user_role")
		var title = user_role == 1 ? "专题模块列表(品牌设置，主打活动，专题列表位置不会改变，不会隐藏，此处不予以展示)" : "专题模块列表";
		return (
			<div className="special-type-list-div">
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						editSpecialType={this.events.editSpecialType}
						allData={this.state.speciaTypelList}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.speciaTypelList}
						   titleData={title}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)
				}
			</div>
		);
	}
});

module.exports = SpecialTypeList;