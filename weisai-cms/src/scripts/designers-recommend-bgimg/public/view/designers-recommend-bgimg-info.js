/**
 * Created by fengshao on 2016/12/7.
 */
import {Form, Button } from 'antd';
const FormItem = Form.Item;
const GeminiScrollbar = require("../../../../component/react-gemini-scrollbar");

var DesignersInfo = React.createClass({
	getInitialState: function () {
		return {
			imgContentHeight: this.imgContentHeightFnc()
		};
	},

	componentWillUnmount: function () {
		$(window).off("resize", this.resizeWindow);
		$("body").css("overflow", "hidden");
	},

	componentDidMount: function () {
		$(window).on("resize", this.resizeWindow);
		$("body").css("overflow", "hidden");
	},

	imgContentHeightFnc: function () {
		return $(window).height() - 50 - 50 - 60 - 40 - 20;
	},

	resizeWindow: function () {
		this.setState({
			imgContentHeight: this.imgContentHeightFnc()
		});
	},

	render(){

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};
		const _this = this;
		const height = this.state.imgContentHeight;
		return (
			<div>
				<Form horizontal className="editform">
					<FormItem wrapperCol={{ span: 7, offset: 7 }}>
						{
							this.props.editRowData.id ? "" : <label className="share-message">当前没有背景图片，请添加</label>
						}
						{
							this.props.editRowData.id ?
								<Button className="share-btn" type="primary"
										onClick={this.props.showEditFrom.bind(this,this.props.editRowData)}>编辑</Button> : ""
						}
						{
							this.props.editRowData.id ? "" :
								<Button className="share-btn" type="primary"
										onClick={this.props.showAddFrom}>添加</Button>

						}
					</FormItem>
					<div style={{height: height}}>
						<GeminiScrollbar className="geminiScrollbar-div">
							<FormItem
								{...formItemLayout}
								label="包含商品分类"
								hasFeedback
							>
								{
									this.props.selectGoodsTypeList.map(function (goodsTypeID, i) {
										return (
											_this.props.goodsTypeList.map(function (goodsType, key) {
												return (
													goodsType.id == goodsTypeID ?
														<div
															className="commodity-classification-list-name">{goodsType.title}
														</div> : null
												)
											})
										)
									})
								}


							</FormItem>
							<FormItem
								{...formItemLayout}
								label="整体预览"
								hasFeedback
							>
								<img src={this.props.editRowData.img2 }
									 className="preview-img"/>
								<img src={this.props.editRowData.img1 }
									 className="all-preview-img preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="首层背景图片预览"
								hasFeedback
							>
								<img src={this.props.editRowData.img1 }
									 className="preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="底层背景图片预览"
								hasFeedback
							>
								<img src={this.props.editRowData.img2 }
									 className="preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="左箭头"
								hasFeedback
							>
								<img src={this.props.editRowData.img3 }
									 className="preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="右箭头"
								hasFeedback
							>
								<img src={this.props.editRowData.img4 }
									 className="preview-img"/>
							</FormItem>
						</GeminiScrollbar>
					</div>
				</Form>
			</div>
		);
	}
});
DesignersInfo = Form.create()(DesignersInfo);

module.exports = DesignersInfo;