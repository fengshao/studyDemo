/**
 * Created by fengshao on 2017/1/22.
 */
var TopNav = require("../../../../component/top-nav");
var CommodityClassificationAction = require("./action/commodity-classification-action");
var CommodityClassificationStore = require("./store/commodity-classification-store");
var EditForm = require("./view/edit-form");
var Table = require("./view/commodity-classification-table");
var CommodityClassificationList = React.createClass({
	getInitialState: function () {
		var data = CommodityClassificationStore.getState();
		return data;
	},

	onChange: function () {
		var data = CommodityClassificationStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		CommodityClassificationStore.listen(this.onChange);
		CommodityClassificationAction.getGoodsTypeList();
	},

	componentWillUnmount: function () {
		CommodityClassificationStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		delGoodsType: function (data) {
			CommodityClassificationAction.delGoodsType(data);
		},
		showEditFrom: function (rowData) {
			CommodityClassificationAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			CommodityClassificationAction.showAddFrom();
		},
		addGoodsType: function (newData) {
			CommodityClassificationAction.addGoodsType(newData);
		},
		editGoodsType: function (newData) {
			CommodityClassificationAction.editGoodsType(newData);
		},
		hideEditFrom: function () {
			CommodityClassificationAction.hideEditFrom();
		},
		loadingFnc: function () {
			CommodityClassificationAction.loadingFnc();
		},
		getGoodsTypeList: function (data) {
			CommodityClassificationAction.getGoodsTypeList(data);
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
							addGoodsType={this.events.addGoodsType}
							editGoodsType={this.events.editGoodsType}
							allData={this.state.commodityClassificationList}
							editRowData={this.state.editRowData}
						/>) : (
						<Table tableData={this.state.commodityClassificationList} titleData=""
							   delGoodsType={this.events.delGoodsType}
							   filtersData={this.state.filtersData}
							   pagination={this.state.pagination}
							   showEditFrom={this.events.showEditFrom}
							   showAddFrom={this.events.showAddFrom}
							   loadingFnc={this.events.loadingFnc}
							   getGoodsTypeList={this.events.getGoodsTypeList}
						/>)}
				</div>
			</div>
		);
	}
});

module.exports = CommodityClassificationList;