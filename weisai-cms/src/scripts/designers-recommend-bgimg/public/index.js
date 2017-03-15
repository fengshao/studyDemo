/**
 * Created by fengshao on 2016/11/22.
 * 活动背景图片
 */
import {message} from 'antd';
var TopNav = require("../../../component/top-nav");
var EditForm = require("./view/edit-form");
var DesignersInfo = require("./view/designers-recommend-bgimg-info");
var DesignersRecBgImgStore = require("./store/designers-recommend-bgimg-store");
var DesignersRecBgImgAction = require("./action/designers-recommend-bgimg-action");
var ActivityModuleBgimg = React.createClass({
	getInitialState: function () {
		var data = DesignersRecBgImgStore.getState();
		return data;
	},

	onChange: function () {
		var data = DesignersRecBgImgStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		DesignersRecBgImgStore.listen(this.onChange);
		DesignersRecBgImgAction.getBackgroundList();
	},

	componentWillUnmount: function () {
		DesignersRecBgImgStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		addSpecial: function (newData) {
			DesignersRecBgImgAction.addBackground(newData);
		},

		editSpecial: function (newData) {
			DesignersRecBgImgAction.editBackground(newData);
		},

		showEditFrom: function (rowData) {
			DesignersRecBgImgAction.showEditFrom(rowData);
		},

		showAddFrom: function () {
			DesignersRecBgImgAction.showAddFrom();
		},

		hideEditFrom: function () {
			DesignersRecBgImgAction.hideEditFrom();
		},

		selectGoodsTypeFnc: function (data) {
			DesignersRecBgImgAction.selectGoodsTypeFnc(data);
		},

		commodityClassificationOrderUp: function (data) {
			DesignersRecBgImgAction.commodityClassificationOrderUp(data);
		},

		commodityClassificationOrderDown: function (data) {
			DesignersRecBgImgAction.commodityClassificationOrderDown(data);
		},

		commodityClassificationRemove: function (data) {
			DesignersRecBgImgAction.commodityClassificationRemove(data);
		},

		hideCommodityClassificationAddModal: function () {
			DesignersRecBgImgAction.hideCommodityClassificationAddModal();
		},

		showCommodityClassificationAddModal: function () {
			DesignersRecBgImgAction.showCommodityClassificationAddModal();
		}

	},
	render: function () {
		return (
			<div>
				<div className="right-content-bottom">
					{this.state.isShowEditFrom || this.state.isShowAddFrom ?
						(<EditForm
							hideEditFrom={this.events.hideEditFrom}
							addSpecial={this.events.addSpecial}
							editSpecial={this.events.editSpecial}
							editRowData={this.state.designersRecBgImg}
							goodsTypeList={this.state.goodsTypeList}
							selectGoodsTypeList={this.state.selectGoodsTypeList}

							showCommodityClassificationAddModal={this.events.showCommodityClassificationAddModal}
							hideCommodityClassificationAddModal={this.events.hideCommodityClassificationAddModal}
							isShowCommodityClassificationAddModal={this.state.isShowCommodityClassificationAddModal}
							selectGoodsTypeFnc={this.events.selectGoodsTypeFnc}
							commodityClassificationOrderUp={this.events.commodityClassificationOrderUp}
							commodityClassificationOrderDown={this.events.commodityClassificationOrderDown}
							commodityClassificationRemove={this.events.commodityClassificationRemove}
							selectGoodsTypeList={this.state.selectGoodsTypeList}
							goodsTypeList={this.state.goodsTypeList}
					
						/>) : (
						<DesignersInfo
							showEditFrom={this.events.showEditFrom}
							showAddFrom={this.events.showAddFrom}
							editRowData={this.state.designersRecBgImg}
							goodsTypeList={this.state.goodsTypeList}
							selectGoodsTypeList={this.state.selectGoodsTypeList}
						/>)}
				</div>
			</div>
		);
	}
});

module.exports = ActivityModuleBgimg;