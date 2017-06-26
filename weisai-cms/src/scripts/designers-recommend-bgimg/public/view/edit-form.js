/**
 * Created by fengs on 2016/9/17.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message,Alert } from 'antd';
const FormItem = Form.Item;
const GeminiScrollbar = require("../../../../component/react-gemini-scrollbar");

var PublicAjax = require("../../../../ajax/public-ajax");
var AddBannerModal = require("../../../../component/add-banner-modal");

var EditForm = React.createClass({
	getInitialState: function () {
		return {
			img1_src: this.props.editRowData.img1,
			img3_src: this.props.editRowData.img3,
			img2_src: this.props.editRowData.img2,
			img4_src: this.props.editRowData.img4,
			imgContentHeight: this.imgContentHeightFnc()
		};
	},

	imgContentHeightFnc: function () {
		return $(window).height() - 50 - 40 * 5 - 50 - 60 - 40 - 30;
	},

	componentWillUnmount: function () {
		$(window).off("resize", this.resizeWindow);
		$("body").css("overflow", "hidden");
	},

	componentDidMount: function () {
		$(window).on("resize", this.resizeWindow);
		$("body").css("overflow", "hidden");
	},

	resizeWindow: function () {
		this.setState({
			imgContentHeight: this.imgContentHeightFnc()
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

	checkImg1Type: function (rule, value, callback) {

		if (!value && this.state.img1_src) {
			callback();
			return
		}

		if (!value) {
			callback([new Error('抱歉，请选择png，jpg，jpeg,gif格式的图片上传。')]);
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.jpg' && fileType != '.png' && fileType != '.jpeg' && fileType != '.gif') {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式的图片上传。')]);
		} else {
			callback();
		}
	},

	checkImg2Type: function (rule, value, callback) {

		if (!value && this.state.img2_src) {
			callback();
			return
		}

		if (!value) {
			callback([new Error('抱歉，请选择png，jpg，jpeg,gif格式的图片上传。')]);
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.jpg' && fileType != '.png' && fileType != '.jpeg' && fileType != '.gif') {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式的图片上传。')]);
		} else {
			callback();
		}
	},

	checkImg3Type: function (rule, value, callback) {

		if (!value && this.state.img3_src) {
			callback();
			return
		}

		if (!value) {
			callback([new Error('抱歉，请选择png，jpg，jpeg,gif格式的图片上传。')]);
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.jpg' && fileType != '.png' && fileType != '.jpeg' && fileType != '.gif') {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式的图片上传。')]);
		} else {
			callback();
		}
	},

	checkImg4Type: function (rule, value, callback) {

		if (!value && this.state.img4_src) {
			callback();
			return
		}

		if (!value) {
			callback([new Error('抱歉，请选择png，jpg，jpeg,gif格式的图片上传。')]);
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.jpg' && fileType != '.png' && fileType != '.jpeg' && fileType != '.gif') {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式的图片上传。')]);
		} else {
			callback();
		}
	},

	saveSpecial: function () {

		var _this = this;
		if (!this.state.img1_src && !this.props.editRowData.img1) {
			message.warning('请上传首层背景图片');
			return;
		}
		if (!this.state.img2_src && !this.props.editRowData.img2) {
			message.warning('请上传底层背景图片');
			return;
		}

		if (!this.state.img3_src && !this.props.editRowData.img3) {
			message.warning('请上传左箭头背景图片');
			return;
		}

		if (!this.state.img4_src && !this.props.editRowData.img4) {
			message.warning('请上传右箭头背景图片');
			return;
		}
		this.props.form.validateFields((errors, values) => {
			values.img1 = this.state.img1_src;
			values.img3 = this.state.img3_src;
			values.img2 = this.state.img2_src;
			values.img4 = this.state.img4_src;
			var obj = this.props.selectGoodsTypeList || [];
			values.banner = obj.join(",");
			var flag = false;
			$.each(values, function (name, value) {
				if (value != _this.props.editRowData[name]) {
					flag = true
				}
			});

			if (!!errors || !flag) {
				return;
			}
			if (_this.props.editRowData.id) {
				values.id = _this.props.editRowData.id;
				_this.props.editSpecial(values);
			} else {
				_this.props.addSpecial(values);
			}
		});


	},

	uploadFirstLayerImage: function () {
		var formData = new FormData($("#firstLayerForm")[0]);
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
						img1_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadSecondLayerImage: function () {
		var formData = new FormData($("#secondLayerForm")[0]);
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
						img2_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadLeftArrowImage: function () {
		var formData = new FormData($("#leftArrowForm")[0]);
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
						img3_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadRightArrowImage: function () {
		var formData = new FormData($("#rightArrowForm")[0]);
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
						img4_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const height = this.state.imgContentHeight;
		const _this = this;

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const firstLayerImgProps = getFieldProps('img1', {
			validate: [{
				rules: [
					{validator: this.checkImg1Type}
				],
				trigger: ['onChange']
			}]
		});
		const secondLayerImgProps = getFieldProps('img2', {
			validate: [{
				rules: [
					{validator: this.checkImg2Type}
				],
				trigger: ['onChange']
			}]
		});

		const leftArrowImgProps = getFieldProps('img3', {
			validate: [{
				rules: [
					{validator: this.checkImg3Type}
				],
				trigger: ['onChange']
			}]
		});

		const rightArrowImgProps = getFieldProps('img4', {
			validate: [{
				rules: [
					{validator: this.checkImg4Type}
				],
				trigger: ['onChange']
			}]
		});
		return (
			<div>
				<Form horizontal className="editform" id="firstLayerForm">
					<FormItem
						label="首层背景图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('img1') ? '校验中...' : (getFieldError('img1') || []).join(', ')}
					>
						<Input {...firstLayerImgProps} type="file" id="file" name="file" className="upload-img"
													   accept="image/png, image/jpg, image/jpeg, image/gif"
													   style={{ width: '80%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadFirstLayerImage}>上传</Button>
					</FormItem>
				</Form>
				<Form horizontal className="editform" id="secondLayerForm">
					<FormItem
						label="底层背景图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('img2') ? '校验中...' : (getFieldError('img2') || []).join(', ')}
					>
						<Input {...secondLayerImgProps} type="file" id="file" name="file" className="upload-img"
														accept="image/png, image/jpg, image/jpeg, image/gif"
														style={{ width: '80%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadSecondLayerImage}>上传</Button>
					</FormItem>
				</Form>
				<Form horizontal className="editform" id="leftArrowForm">
					<FormItem
						label="左箭头"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('img3') ? '校验中...' : (getFieldError('img3') || []).join(', ')}
					>
						<Input {...leftArrowImgProps} type="file" id="file" name="file" className="upload-img"
													  accept="image/png, image/jpg, image/jpeg, image/gif"
													  style={{ width: '80%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadLeftArrowImage}>上传</Button>
					</FormItem>
				</Form>
				<Form horizontal className="editform" id="rightArrowForm">
					<FormItem
						label="右箭头"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('img4') ? '校验中...' : (getFieldError('img4') || []).join(', ')}
					>
						<Input {...rightArrowImgProps} type="file" id="file" name="file" className="upload-img"
													   accept="image/png, image/jpg, image/jpeg, image/gif"
													   style={{ width: '80%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadRightArrowImage}>上传</Button>
					</FormItem>
				</Form>
				<Form horizontal className="editform">
					<div style={{height: height}}>
						<GeminiScrollbar className="geminiScrollbar-div">
							<FormItem
								{...formItemLayout}
								label="整体预览"
								hasFeedback
							>
								<img src={this.state.img2_src ? this.state.img2_src :  this.props.editRowData.img2 }
									 className="preview-img"/>
								<img src={this.state.img1_src ? this.state.img1_src :  this.props.editRowData.img1 }
									 className="all-preview-img preview-img"/>

							</FormItem>
							<FormItem
								{...formItemLayout}
								label="首层背景图片预览"
								hasFeedback
							>
								<img src={this.state.img1_src ? this.state.img1_src :  this.props.editRowData.img1 }
									 className="preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="底层背景图片预览"
								hasFeedback
							>
								<img src={this.state.img2_src ? this.state.img2_src :  this.props.editRowData.img2 }
									 className="preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="左箭头"
								hasFeedback
							>
								<img src={this.state.img3_src ? this.state.img3_src :  this.props.editRowData.img3 }
									 className="preview-img"/>
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="右箭头"
								hasFeedback
							>
								<img src={this.state.img4_src ? this.state.img4_src :  this.props.editRowData.img4 }
									 className="preview-img"/>
							</FormItem>
							<div className="commodity-classification-cls">
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
							</div>
						</GeminiScrollbar>
					</div>
					<FormItem wrapperCol={{ span: 12, offset: 7 }} className="designers-bg-btn">
						<Button type="primary" onClick={this.saveSpecial}>确定</Button>
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
		);
	}
});
EditForm = Form.create()(EditForm);

module.exports = EditForm;