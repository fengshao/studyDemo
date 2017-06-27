/**
 * Created by fengshao on 2017/1/22.
 */
var TopNav = require("../../../component/top-nav");
var CommodityManagementAction = require("./action/commodity-management-action");
var CommodityManagementStore = require("./store/commodity-management-store");
var EditForm = require("./view/edit-form");
var Table = require("./view/commodity-table");

var CommodityManagement = React.createClass({
	getInitialState: function () {
		var data = CommodityManagementStore.getState();
		return data;
	},

	onChange: function () {
		var data = CommodityManagementStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		CommodityManagementStore.listen(this.onChange);
		CommodityManagementAction.getGoodsList();
	},

	componentWillUnmount: function () {
		CommodityManagementStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		delGoods: function (data) {
			CommodityManagementAction.delGoods(data);
		},
		showEditFrom: function (rowData) {
			CommodityManagementAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			CommodityManagementAction.showAddFrom();
		},
		addGoods: function (newData) {
			CommodityManagementAction.addGoods(newData);
		},
		editGoods: function (newData) {
			CommodityManagementAction.editGoods(newData);
		},
		hideEditFrom: function () {
			CommodityManagementAction.hideEditFrom();
		},
		loadingFnc: function () {
			CommodityManagementAction.loadingFnc();
		},
		getGoodsList: function (data) {
			CommodityManagementAction.getGoodsList(data);
		}
	},

	render: function () {
		return (
			<div>
				<TopNav>
					<TopNav.MenuList/>
				</TopNav>
				<div className="right-content-bottom">
					{this.state.isShowEditFrom || this.state.isShowAddFrom ?
						(<EditForm
							hideEditFrom={this.events.hideEditFrom}
							addGoods={this.events.addGoods}
							editGoods={this.events.editGoods}
							allData={this.state.commodityList}
							editRowData={this.state.editRowData}
							commodityClassificationList={this.state.commodityClassificationList}
						/>) : (
						<Table tableData={this.state.commodityList} titleData=""
							   delGoods={this.events.delGoods}
							   showEditFrom={this.events.showEditFrom}
							   showAddFrom={this.events.showAddFrom}
							   loadingFnc={this.events.loadingFnc}
							   getGoodsList={this.events.getGoodsList}
							   filtersData={this.state.filtersData}
							   pagination={this.state.pagination}
							   commodityClassificationList={this.state.commodityClassificationList}
						/>)}
				</div>
			</div>
		);
	}
});

module.exports = CommodityManagement;