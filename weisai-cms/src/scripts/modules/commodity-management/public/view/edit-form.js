/**
 * Created by fengshao on 2017/2/6.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message,Select,Col,Radio} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
var PublicAjax = require("../../../../ajax/public-ajax");

var EditForm = React.createClass({
	getInitialState: function () {
		var flag = false;
		var _this = this;
		_.map(this.props.commodityClassificationList, function (goodsType, key) {
			if (_this.props.editRowData.type_id == goodsType.id) {
				flag = true;
			}
		})

		var type_id = flag ? this.props.editRowData.type_id : this.props.commodityClassificationList.length > 0 ? this.props.commodityClassificationList[0].id : this.props.editRowData.type_id;


		return {
			pic_src: this.props.editRowData.pic,
			desc_pic_src: this.props.editRowData.desc_pic,
			desc_bg_pic_src: this.props.editRowData.desc_bg_pic,
			is_include_desc: this.props.editRowData.is_include_desc ? this.props.editRowData.is_include_desc.toString() : "2",
			typeID: parseInt(type_id)
		};
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "hidden");
	},

	componentDidMount: function () {
		$("body").css("overflow", "auto");
	},

	confirm: function (rowData) {
		this.props.deleteSpecialFnc(rowData);
	},

	checkCommodityImgType: function (rule, value, callback) {
		if (!value && this.state.pic_src) {
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

	checkIntroductionImgType: function (rule, value, callback) {
		if (this.state.is_include_desc == 2) {
			callback();
			return
		}

		if (!value && this.state.desc_pic_src) {
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

	checkIntroductionBgImgType: function (rule, value, callback) {
		if (this.state.is_include_desc == 2) {
			callback();
			return
		}

		if (!value && this.state.desc_bg_pic_src) {
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

	saveSpecial: function () {

		var _this = this;
		if (!this.state.pic_src && !this.props.editRowData.pic) {
			message.warning('请上传商品图片');
			return;
		}

		if (this.state.is_include_desc == 1) {
			if (!this.state.desc_pic_src && !this.props.editRowData.desc_pic) {
				message.warning('请上传商品简介图片');
				return;
			}

			if (!this.state.desc_bg_pic_src && !this.props.editRowData.desc_bg_pic) {
				message.warning('请上传商品简介背景图片');
				return;
			}
		}

		this.props.form.validateFieldsAndScroll((errors, values) => {
			values.pic = this.state.pic_src;
			values.desc_pic = this.state.desc_pic_src;
			values.desc_bg_pic = this.state.desc_bg_pic_src;
			values.type_id = this.state.typeID;
			values.is_include_desc = this.state.is_include_desc;

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
				_this.props.editGoods(values);
			} else {
				_this.props.addGoods(values);
			}
		});


	},

	checkSpecialUrl: function (rule, value, callback) {
		if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)) {
			callback([new Error('抱歉，请输入有效的网址。')]);
		} else {
			callback();
		}
	},

	checkSpecialName: function (rule, value, callback, dddd, selectData) {

		var typeID = selectData && selectData.typeID ? selectData.typeID : this.state.typeID;


		var flag = false;
		for (var i = 0; i < this.props.allData.length; i++) {
			if (value == this.props.allData[i].title && this.props.editRowData.id != this.props.allData[i].id && this.props.allData[i].type_id == typeID) {
				flag = true;
				break;
			}
		}

		if (flag) {
			callback([new Error('抱歉，该专题名称已被占用。')]);
		} else {
			callback();
		}
	},

	checkSpecialSort: function (rule, value, callback, dddd, selectData) {

		var typeID = selectData && selectData.typeID ? selectData.typeID : this.state.typeID;

		if (!/^\d+$/.test(value)) {
			callback([new Error('抱歉，请输入数字。')]);
		}

		var flag = false;
		for (var i = 0; i < this.props.allData.length; i++) {
			if (value == this.props.allData[i].sort && this.props.editRowData.id != this.props.allData[i].id && this.props.allData[i].type_id == typeID) {
				flag = true;
				break;
			}
		}

		if (flag) {
			callback([new Error('抱歉，该排序序号已被占用。')]);
		} else {
			callback();
		}
	},

	handleChange: function (value) {
		this.setState({
			typeID: value
		});

		this.props.form.validateFields(['sort'], {force: true, typeID: value});
		this.props.form.validateFields(['title'], {force: true, typeID: value});
	},
	onRadioChange: function (e) {
		this.setState({
			is_include_desc: e.target.value
		});
	},

	uploadCommodityImage: function () {
		var formData = new FormData($("#commodityImgForm")[0]);
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
						pic_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadIntroductionImage: function () {
		var formData = new FormData($("#commodityIntroductionForm")[0]);
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
						desc_pic_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadIntroductionBgImage: function () {
		var formData = new FormData($("#commodityIntroductionBgForm")[0]);
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
						desc_bg_pic_src: srcUrl
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

		const specialTitleProps = getFieldProps('title', {
			rules: [
				{required: true, max: 8, message: '商品名称最多为 8 个字符'},
				{validator: this.checkSpecialName}
			],
			initialValue: this.props.editRowData.title ? this.props.editRowData.title : ""
		});

		const specialDescProps = getFieldProps('description', {
			rules: [
				{required: true, max: 15, message: '商品描述最多为 15 个字符'}
			],
			initialValue: this.props.editRowData.description ? this.props.editRowData.description : ""
		});

		const specialPriceProps = getFieldProps('price', {
			rules: [
				{required: true, max: 8, message: '商品售价最多为 8 个字符'}
			],
			initialValue: this.props.editRowData.price ? this.props.editRowData.price : ""
		});

		const specialPriceDescProps = getFieldProps('price_desc', {
			rules: [
				{required: true, max: 3, message: '商品售价描述最多为 3 个字符'}
			],
			initialValue: this.props.editRowData.price_desc ? this.props.editRowData.price_desc : ""
		});

		const specialOriginalPriceProps = getFieldProps('original_price', {
			rules: [
				{required: true, max: 8, message: '商品原价最多为 8 个字符'}
			],
			initialValue: this.props.editRowData.original_price ? this.props.editRowData.original_price : ""
		});

		const specialTitleColorProps = getFieldProps('title_color', {
			rules: [
				{required: true, max: 20, message: '商品名称颜色最多为 20 个字符'}
			],
			initialValue: this.props.editRowData.title_color ? this.props.editRowData.title_color : ""
		});

		const specialDescColorProps = getFieldProps('description_color', {
			rules: [
				{required: true, max: 20, message: '商品描述颜色最多为 20 个字符'}
			],
			initialValue: this.props.editRowData.description_color ? this.props.editRowData.description_color : ""
		});

		const specialPriceColorProps = getFieldProps('price_color', {
			rules: [
				{required: true, max: 20, message: '商品售价颜色最多为 20 个字符'}
			],
			initialValue: this.props.editRowData.price_color ? this.props.editRowData.price_color : ""
		});

		const specialPriceDescColorProps = getFieldProps('price_desc_color', {
			rules: [
				{required: true, max: 20, message: '商品售价标题颜色最多为 20 个字符'}
			],
			initialValue: this.props.editRowData.price_desc_color ? this.props.editRowData.price_desc_color : ""
		});

		const specialOriginalPriceColorProps = getFieldProps('original_price_color', {
			rules: [
				{required: true, max: 20, message: '商品原价颜色最多为 20 个字符'}
			],
			initialValue: this.props.editRowData.original_price_color ? this.props.editRowData.original_price_color : ""
		});

		const specialUrlProps = getFieldProps('wechat_url', {
			rules: [
				{required: true, message: '微信链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editRowData.wechat_url ? this.props.editRowData.wechat_url : ""
		});

		const specialUrlQQProps = getFieldProps('qq_url', {
			rules: [
				{required: true, message: '手Q链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editRowData.qq_url ? this.props.editRowData.qq_url : ""
		});


		const specialSPMProps = getFieldProps('spm', {
			rules: [
				{required: true, message: 'SPM值不能为空'}
			],
			initialValue: this.props.editRowData.spm ? this.props.editRowData.spm.toString() : this.props.editRowData.spm
		});

		const specialSortProps = getFieldProps('sort', {
			rules: [
				{required: true, message: 'sort不能为空'},
				{validator: this.checkSpecialSort}
			],
			initialValue: this.props.editRowData.sort ? this.props.editRowData.sort.toString() : this.props.editRowData.sort
		});

		const imgCommodityProps = getFieldProps('pic', {
			validate: [{
				rules: [
					{validator: this.checkCommodityImgType}
				],
				trigger: ['onChange']
			}]
		});

		const imgIntroductionProps = getFieldProps('desc_pic', {
			validate: [{
				rules: [
					{validator: this.checkIntroductionImgType}
				],
				trigger: ['onChange']
			}]
		});

		const imgIntroductionBgProps = getFieldProps('desc_bg_pic', {
			validate: [{
				rules: [
					{validator: this.checkIntroductionBgImgType}
				],
				trigger: ['onChange']
			}]
		});

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const formColItemLayout = {
			labelCol: {span: 12},
			wrapperCol: {span: 12}
		};

		const formColRightItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 10}
		};

		return (
			<div>
				<Form horizontal className="editform" id="commodityImgForm">
					<FormItem
						label="商品图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('pic') ? '校验中...' : (getFieldError('pic') || []).join(', ')}
					>
						<Input {...imgCommodityProps} type="file" id="file" name="file" className="upload-img"
													  accept="image/png, image/jpg, image/jpeg, image/gif"
													  style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadCommodityImage} className="upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className="editform commodity-form">

					<FormItem
						{...formItemLayout}
						label="商品图片预览"
						hasFeedback
					>
						<img
							src={this.state.pic_src ? this.state.pic_src : this.props.editRowData.pic }
							className="preview-img"/>
					</FormItem>

					<Col sm={14} className="col-cls">
						<FormItem
							{...formColItemLayout}
							label="商品名称"
							hasFeedback
							help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
						>
							<Input {...specialTitleProps} placeholder="请输入商品名称"/>
						</FormItem>

						<FormItem
							{...formColItemLayout}
							label="商品描述"
							hasFeedback
							help={isFieldValidating('description') ? '校验中...' : (getFieldError('description') || []).join(', ')}
						>
							<Input {...specialDescProps} placeholder="请输入商品描述"/>
						</FormItem>


						<FormItem
							{...formColItemLayout}
							label="商品售价"
							hasFeedback
							help={isFieldValidating('price') ? '校验中...' : (getFieldError('price') || []).join(', ')}
						>
							<Input {...specialPriceProps} placeholder="请输入商品售价"/>
							<label>例如：<span className="eq-cls">¥138</span></label>

						</FormItem>

						<FormItem
							{...formColItemLayout}
							label="商品售价标题"
							hasFeedback
							help={isFieldValidating('price_desc') ? '校验中...' : (getFieldError('price_desc') || []).join(', ')}
						>
							<Input {...specialPriceDescProps} placeholder="请输入商品售价标题"/>
							<label>例如：<span className="eq-cls">现价：</span></label>

						</FormItem>


						<FormItem
							{...formColItemLayout}
							label="商品原价"
							hasFeedback
							help={isFieldValidating('original_price') ? '校验中...' : (getFieldError('original_price') || []).join(', ')}
						>
							<Input {...specialOriginalPriceProps} placeholder="请输入商品原价"/>
							<label>例如：<span className="eq-cls">¥238</span></label>
						</FormItem>

						<FormItem
							{...formColItemLayout}
							label="手Q链接"
							hasFeedback
							help={isFieldValidating('qq_url') ? '校验中...' : (getFieldError('qq_url') || []).join(', ')}
						>
							<Input {...specialUrlQQProps} placeholder="请输入手Q链接"/>
						</FormItem>
						< FormItem
							{...formColItemLayout}
							label="微信链接"
							hasFeedback
							help={isFieldValidating('wechat_url') ? '校验中...' : (getFieldError('wechat_url') || []).join(', ')}
						>
							<Input {...specialUrlProps} placeholder="请输入微信链接"/>
						</FormItem>

						< FormItem
							{...formColItemLayout}
							label="所属分类"
							hasFeedback
						>
							<Select
								showSearch
								placeholder="请选择所属分类"
								optionFilterProp="children"
								notFoundContent="找不到此商品分类"
								onChange={this.handleChange}
								value={this.state.typeID }
							>
								{
									this.props.commodityClassificationList.map(function (goodsType, key) {
										return (
											<Option value={goodsType.id} key={key}>{goodsType.title}</Option>
										);
									})
								}
							</Select>
						</FormItem>


						<FormItem
							{...formColItemLayout}
							label="SPM值"
							hasFeedback
							help={isFieldValidating('spm') ? '校验中...' : (getFieldError('spm') || []).join(', ')}
						>
							<Input placeholder="请输入SPM值"
								{...specialSPMProps}
							/>
						</FormItem>

						<FormItem
							{...formColItemLayout}
							label="排序"
							hasFeedback
							help={isFieldValidating('sort') ? '校验中...' : (getFieldError('sort') || []).join(', ')}
						>
							<Input placeholder="请输入排序序号"
								{...specialSortProps}
							/>
						</FormItem>
					</Col>
					<Col sm={8} className="col-cls">

						<FormItem
							{...formColRightItemLayout}
							label="文字颜色"
							hasFeedback
							help={isFieldValidating('title_color') ? '校验中...' : (getFieldError('title_color') || []).join(', ')}
						>
							<Input {...specialTitleColorProps} placeholder="请输入文字颜色"/>
						</FormItem>

						<FormItem
							{...formColRightItemLayout}
							label="文字颜色"
							hasFeedback
							help={isFieldValidating('description_color') ? '校验中...' : (getFieldError('description_color') || []).join(', ')}
						>
							<Input {...specialDescColorProps} placeholder="请输入文字颜色"/>
						</FormItem>

						<FormItem
							{...formColRightItemLayout}
							label="文字颜色"
							hasFeedback
							help={isFieldValidating('price_color') ? '校验中...' : (getFieldError('price_color') || []).join(', ')}
						>
							<Input {...specialPriceColorProps} placeholder="请输入文字颜色"/>
							<label className="seize-cls">占位</label>
						</FormItem>

						<FormItem
							{...formColRightItemLayout}
							label="文字颜色"
							hasFeedback
							help={isFieldValidating('price_desc_color') ? '校验中...' : (getFieldError('price_desc_color') || []).join(', ')}
						>
							<Input {...specialPriceDescColorProps} placeholder="请输入文字颜色"/>
							<label className="seize-cls">占位</label>
						</FormItem>

						<FormItem
							{...formColRightItemLayout}
							label="文字颜色"
							hasFeedback
							help={isFieldValidating('original_price_color') ? '校验中...' : (getFieldError('original_price_color') || []).join(', ')}
						>
							<Input {...specialOriginalPriceColorProps} placeholder="请输入文字颜色"/>
						</FormItem>

					</Col>
				</Form>

				<Form horizontal className="editform" id="commodityIntroductionForm">

					<FormItem
						{...formItemLayout}
						label="是否包含商品简介"
					>
						<RadioGroup onChange={this.onRadioChange}
									value={this.state.is_include_desc}>
							<Radio value="1">是</Radio>
							<Radio value="2">否</Radio>
						</RadioGroup>
					</FormItem>
					{this.state.is_include_desc == 1 ?
						<div>
							<FormItem
								label="商品简介"
								hasFeedback
								{...formItemLayout}
								help={isFieldValidating('desc_pic') ? '校验中...' : (getFieldError('desc_pic') || []).join(', ')}
							>
								<Input {...imgIntroductionProps} type="file" id="file" name="file"
																 className="upload-img"
																 accept="image/png, image/jpg, image/jpeg, image/gif"
																 style={{ width: '70%', marginRight: 8 }}
								/>
								<Button onClick={this.uploadIntroductionImage} className="upload-btn">上传</Button>
							</FormItem>

							< FormItem
								{...formItemLayout}
								label="商品简介图片预览"
								hasFeedback
							>
								<img
									src={this.state.desc_pic_src ? this.state.desc_pic_src : this.props.editRowData.desc_pic }
									className="preview-img"/>
							</FormItem>
						</div> : null

					}

				</Form>

				<Form horizontal className="editform" id="commodityIntroductionBgForm">
					{this.state.is_include_desc == 1 ?
						<div><FormItem
							label="商品简介背景"
							hasFeedback
							{...formItemLayout}
							help={isFieldValidating('desc_bg_pic') ? '校验中...' : (getFieldError('desc_bg_pic') || []).join(', ')}
						>
							<Input {...imgIntroductionBgProps} type="file" id="file" name="file" className="upload-img"
															   accept="image/png, image/jpg, image/jpeg, image/gif"
															   style={{ width: '70%', marginRight: 8 }}
							/>
							<Button onClick={this.uploadIntroductionBgImage} className="upload-btn">上传</Button>
						</FormItem>

							<FormItem
								{...formItemLayout}
								label="商品简介背景图片预览"
								hasFeedback
							>
								<img
									src={this.state.desc_bg_pic_src ? this.state.desc_bg_pic_src : this.props.editRowData.desc_bg_pic }
									className="preview-img"/>
							</FormItem>
						</div> : null
					}
					<FormItem wrapperCol={{ span: 12, offset: 7 }}>
						<Button type="primary" onClick={this.saveSpecial}>确定</Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
					</FormItem>
				</Form>

			</div>
		);
	}
});
EditForm = Form.create()(EditForm);

module.exports = EditForm;