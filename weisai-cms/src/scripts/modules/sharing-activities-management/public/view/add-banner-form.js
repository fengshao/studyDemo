/**
 * Created by fengshao on 2017/2/7.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message,Radio,Modal,Checkbox } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
var PublicAjax = require("../../../../ajax/public-ajax");
var AddBannerModal = require("../../../../component/add-banner-modal");


var AddBannerForm = React.createClass({
	getInitialState: function () {
		return {
			banner_from: this.props.editAllData.banner_from ? this.props.editAllData.banner_from.toString() : "1",
			activity_pic_banner_src: this.props.editAllData.activity_pic_banner
		};
	},

	componentWillReceiveProps: function () {
		$("body").css("overflow", "auto");
	},

	onChange: function (e) {
		this.setState({
			banner_from: e.target.value
		});
	},

	commodityClassificationOrderUp: function (goodsTypeID) {
		this.props.commodityClassificationOrderUp(goodsTypeID);
	},

	commodityClassificationOrderDown: function (goodsTypeID) {
		this.props.commodityClassificationOrderDown(goodsTypeID);
	},

	commodityClassificationRemove: function (goodsTypeID) {
		this.props.commodityClassificationRemove(goodsTypeID);
	},

	checkBannerImgType: function (rule, value, callback) {
		if (this.state.banner_from == 2) {
			callback();
			return
		}

		if (!value && this.state.activity_pic_banner_src) {
			callback();
			return
		}

		if (!value) {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式的图片上传。')]);
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.jpg' && fileType != '.png' && fileType != '.jpeg' && fileType != '.gif') {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式的图片上传。')]);
		} else {
			callback();
		}
	},

	uploadBannerImage: function () {
		var formData = new FormData($("#bannerImgForm")[0]);
		$.ajax({
			method: 'post',
			url: PublicAjax.publicParms.url,
			data: formData,
			dataType: 'JSON',
			cache: false,
			processData: false,
			contentType: false,
			success: (data) => {
				if (data && data.result) {
					var imgData = data.result;

					var srcUrl = PublicAjax.publicParms.httpStr + imgData.savepath + "/" + imgData.savename;
					this.setState({
						activity_pic_banner_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	previous: function () {

		var _this = this;
		this.props.form.validateFields((errors, values) => {
			values.activity_pic_banner = this.state.activity_pic_banner_src ? this.state.activity_pic_banner_src : this.props.editAllData.activity_pic_banner;
			values.banner_from = this.state.banner_from ? this.state.banner_from : this.props.editAllData.banner_from;

			var obj = this.props.selectGoodsTypeList || [];
			values.banner = obj.join(",");
			_this.props.previous(values);
		});

	},

	next: function () {

		var obj = this.props.selectGoodsTypeList || [];
		var bannerStr = obj.join(",");

		if (this.state.banner_from == 1 && !this.state.activity_pic_banner_src && !this.props.editAllData.activity_pic_banner) {
			message.warning('请上传活动图片');
			return;
		}

		if (!bannerStr) {
			message.warning('请商品分类');
			return;
		}

		var _this = this;
		this.props.form.validateFields((errors, values) => {
			values.activity_pic_banner = this.state.activity_pic_banner_src ? this.state.activity_pic_banner_src : this.props.editAllData.activity_pic_banner;
			values.banner_from = this.state.banner_from ? this.state.banner_from : this.props.editAllData.banner_from;

			values.banner = bannerStr;

			if (!values) {
				return;
			}
			if (!!errors && this.state.banner_from == 1) {
				return;
			}

			_this.props.next(values);
		});

	},

	checkSpecialUrl: function (rule, value, callback) {
		if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)) {
			callback([new Error('抱歉，请输入有效的网址。')]);
		} else {
			callback();
		}
	},

	render(){
		const _this = this;
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const imgBannerProps = getFieldProps('activity_pic_banner', {
			validate: [{
				rules: [
					{validator: this.checkBannerImgType}
				],
				trigger: ['onChange']
			}]
		});

		const specialUrlProps = getFieldProps('activity_wechat_url', {
			rules: [
				{required: true, message: '微信链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editAllData.activity_wechat_url ? this.props.editAllData.activity_wechat_url : ""
		});

		const specialUrlQQProps = getFieldProps('activity_qq_url', {
			rules: [
				{required: true, message: '手Q链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editAllData.activity_qq_url ? this.props.editAllData.activity_qq_url : ""
		});

		return (
			<div>
				<div>
					<Form horizontal className="editform" id="radioForm">
						<FormItem
							{...formItemLayout}
							label="BANNER位样式"
						>
							<RadioGroup onChange={this.onChange} value={this.state.banner_from}>
								<Radio value="1">活动图片</Radio>
								<Radio value="2">设计师推荐位</Radio>
							</RadioGroup>
						</FormItem>
					</Form>
				</div>
				{
					this.state.banner_from == 1 ?
						<div className="banner-form-cls">
							<Form horizontal className="editform" id="bannerImgForm">
								<FormItem
									label="活动图片"
									hasFeedback
									{...formItemLayout}
									help={isFieldValidating('activity_pic_banner') ? '校验中...' : (getFieldError('activity_pic_banner') || []).join(', ')}
								>
									<Input {...imgBannerProps} type="file" id="file" name="file" className="upload-img"
															   accept="image/png, image/jpg, image/jpeg, image/gif"
															   style={{ width: '70%', marginRight: 8 }}
									/>
									<Button onClick={this.uploadBannerImage} className="upload-btn">上传</Button>
								</FormItem>
							</Form>

							<Form horizontal className="editform">

								<FormItem
									{...formItemLayout}
									label="活动图片预览"
									hasFeedback
								>
									<img
										src={this.state.activity_pic_banner_src ? this.state.activity_pic_banner_src : this.props.editAllData.activity_pic_banner }
										className="preview-img"/>
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="手Q链接"
									hasFeedback
									help={isFieldValidating('activity_qq_url') ? '校验中...' : (getFieldError('activity_qq_url') || []).join(', ')}
								>
									<Input {...specialUrlQQProps} placeholder="请输入手Q链接"/>
								</FormItem>
								< FormItem
									{...formItemLayout}
									label="微信链接"
									hasFeedback
									help={isFieldValidating('activity_wechat_url') ? '校验中...' : (getFieldError('activity_wechat_url') || []).join(', ')}
								>
									<Input {...specialUrlProps} placeholder="请输入微信链接"/>
								</FormItem>
							</Form>
						</div> : ""
				}

				<div className="commodity-classification-cls">
					<Form horizontal className="editform">
						<FormItem
							label="商品分类"
							hasFeedback
							{...formItemLayout}
						>
							<Button onClick={this.props.showCommodityClassificationAddModal}
									size="small" className="add-commodityClassification-btn">添加商品分类</Button>
							{
								this.props.selectGoodsTypeList.map(function (goodsTypeID, i) {
									return (
										_this.props.goodsTypeList.map(function (goodsType, key) {
											return (
												goodsType.id == goodsTypeID ?
													<div className="commodity-classification-list-content">
														<div className="commodity-classification-list">
															<div
																className="commodity-classification-list-name">{goodsType.title}</div>
															<div className="commodity-classification-list-btn">
																{
																	i == 0 ? "" :
																		<Button
																			onClick={_this.commodityClassificationOrderUp.bind(_this,goodsTypeID)}
																			size="small">上移</Button>
																}
																{
																	i == (_this.props.selectGoodsTypeList.length - 1) ? "" :
																		<Button
																			onClick={_this.commodityClassificationOrderDown.bind(_this,goodsTypeID)}
																			size="small">下移</Button>

																}
																<Button
																	onClick={_this.commodityClassificationRemove.bind(_this,goodsTypeID)}
																	size="small">移除</Button>
															</div>
														</div>

													</div> : null
											)
										})
									)
								})
							}

						</FormItem>
						<FormItem wrapperCol={{ span: 12, offset: 7 }}>
							<Button type="primary" onClick={this.previous}>上一步</Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="primary" onClick={this.next}>下一步</Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
						</FormItem>
					</Form>


					<AddBannerModal title="商品分类列表" visible={this.props.isShowCommodityClassificationAddModal}
									selectGoodsTypeFnc={this.props.selectGoodsTypeFnc}
									onCancel={this.props.hideCommodityClassificationAddModal}
									selectGoodsTypeList={this.props.selectGoodsTypeList}
									goodsTypeList={this.props.goodsTypeList}
					/>
				</div>
			</div>
		);
	}
});
AddBannerForm = Form.create()(AddBannerForm);

module.exports = AddBannerForm;