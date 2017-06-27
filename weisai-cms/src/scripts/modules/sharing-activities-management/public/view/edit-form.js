/**
 * Created by fengshao on 2017/2/7.
 */
import { Steps, Button } from 'antd';
const Step = Steps.Step;
var BasicInformationForm = require("./basic-information-form");
var ShareEditForm = require("./share-edit-form");
var AddBannerForm = require("./add-banner-form");
var AddRedPacketsForm = require("./add-red-packets-form");
var CommodityBackgroundForm = require("./commodity-background-form");

var EditForm = React.createClass({
	getInitialState: function () {
		return {};
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "hidden");
	},

	componentDidMount: function () {
		$("body").css("overflow", "auto");
	},

	next: function (data) {
		this.props.nextCurrent(data);
	},

	previous: function (data) {
		this.props.previousCurrent(data);
	},

	render(){
		const current = this.props.current;
		var formElement = "";
		var _this = this;
		switch (current) {
			case 0:
				formElement = <BasicInformationForm
					hideEditFrom={_this.props.hideEditFrom}
					editRowData={_this.props.editRowData}
					editAllData={_this.props.editAllData}
					allData={_this.props.allData}
					next={_this.next}
				/>;
				break;
			case 1:
				formElement = <ShareEditForm
					hideEditFrom={_this.props.hideEditFrom}
					editRowData={_this.props.editRowData}
					editAllData={_this.props.editAllData}
					allData={_this.props.allData}
					next={_this.next}
					previous={_this.previous}
				/>;
				break;
			case 2:
				formElement = <AddBannerForm
					hideEditFrom={_this.props.hideEditFrom}
					showCommodityClassificationAddModal={_this.props.showCommodityClassificationAddModal}
					hideCommodityClassificationAddModal={_this.props.hideCommodityClassificationAddModal}
					editRowData={_this.props.editRowData}
					editAllData={_this.props.editAllData}
					allData={_this.props.allData}
					next={_this.next}
					previous={_this.previous}
					isShowCommodityClassificationAddModal={_this.props.isShowCommodityClassificationAddModal}
					selectGoodsTypeFnc={_this.props.selectGoodsTypeFnc}
					selectGoodsTypeList={_this.props.selectGoodsTypeList}
					goodsTypeList={_this.props.goodsTypeList}
					commodityClassificationRemove={_this.props.commodityClassificationRemove}
					commodityClassificationOrderUp={_this.props.commodityClassificationOrderUp}
					commodityClassificationOrderDown={_this.props.commodityClassificationOrderDown}
				/>;
				break;
			case 3:
				formElement = <AddRedPacketsForm
					hideEditFrom={_this.props.hideEditFrom}
					editRowData={_this.props.editRowData}
					editAllData={_this.props.editAllData}
					allData={_this.props.allData}
					next={_this.next}
					previous={_this.previous}
				/>;
				break;
			case 4:
				formElement = <CommodityBackgroundForm
					hideEditFrom={_this.props.hideEditFrom}
					allData={_this.props.allData}
					editRowData={_this.props.editRowData}
					editAllData={_this.props.editAllData}
					previous={_this.previous}
					addActivity={_this.props.addActivity}
					editActivity={_this.props.editActivity}
				/>;
				break;
		}

		return (
			<div className="sharing-activities-form">
				<Steps current={current}>
					<Step title="活动基本信息"/>
					<Step title="设置分享信息"/>
					<Step title="添加BANNER"/>
					<Step title="添加红包"/>
					<Step title="设置商品背景"/>
				</Steps>
				<div className="edit-form-content">
					{formElement}
				</div>
			</div>
		);
	}
});

module.exports = EditForm;