/**
 * Created by fengshao on 2017/1/23.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var PublicAjax = require("../../../../ajax/public-ajax");


var EditForm = React.createClass({
	getInitialState: function () {
		return {
			imgSrc: this.props.editRowData.pic,
			imgSelectSrc: this.props.editRowData.pic_select
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

	checkSpecialUrl: function (rule, value, callback) {
		if (!value) {
			callback();
		}
		if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)) {
			callback([new Error('抱歉，请输入有效的网址。')]);
		} else {
			callback();
		}
	},

	checkSpecialName: function (rule, value, callback) {
		var flag = false;

		for (var i = 0; i < this.props.allData.length; i++) {
			if (value == this.props.allData[i].title && this.props.editRowData.id != this.props.allData[i].id) {
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

	checkImgType: function (rule, value, callback) {
		if (!value && this.state.imgSrc) {
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
		if (!this.state.imgSrc && !this.props.editRowData.img_wechat) {
			message.warning('请上传商品分类图片');
			return;
		}

		if (!this.state.imgSelectSrc && !this.props.editRowData.pic_select) {
			message.warning('请上传选中商品分类图片');
			return;
		}
		this.props.form.validateFields((errors, values) => {
			values.pic = this.state.imgSrc;
			values.pic_select = this.state.imgSelectSrc;
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
				_this.props.editGoodsType(values);
			} else {
				_this.props.addGoodsType(values);
			}
		});


	},

	uploadImage: function () {
		var formData = new FormData($("#fileForm")[0]);
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
						imgSrc: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadSelectImage: function () {
		var formData = new FormData($("#fileSelectForm")[0]);
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
						imgSelectSrc: srcUrl
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
		const specialNameProps = getFieldProps('title', {
			rules: [
				{required: true, max: 20, message: '专题名称最多为 20 个字符'},
				{validator: this.checkSpecialName}
			],
			initialValue: this.props.editRowData.title ? this.props.editRowData.title : ""
		});

		var specialSortProps = getFieldProps('spm', {
			initialValue: this.props.editRowData.spm ? this.props.editRowData.spm.toString() : this.props.editRowData.spm
		});

		const imgProps = getFieldProps('pic', {
			validate: [{
				rules: [
					{validator: this.checkImgType}
				],
				trigger: ['onChange']
			}]
		});

		const imgSelectProps = getFieldProps('pic_select', {
			validate: [{
				rules: [
					{validator: this.checkImgType}
				],
				trigger: ['onChange']
			}]
		});

		const specialUrlProps = getFieldProps('wechat_url', {
			rules: [
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editRowData.wechat_url ? this.props.editRowData.wechat_url : ""
		});

		const specialUrlQQProps = getFieldProps('qq_url', {
			rules: [
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editRowData.qq_url ? this.props.editRowData.qq_url : ""
		});

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};
		return (
			<div>
				<Form horizontal className="editform" id="fileForm">
					<FormItem
						label="商品分类图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('pic') ? '校验中...' : (getFieldError('pic') || []).join(', ')}
					>
						<Input {...imgProps} type="file" id="file" name="file" className="upload-img"
											 accept="image/png, image/jpg, image/jpeg, image/gif"
											 style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadImage} className="upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className="editform" id="fileSelectForm">
					<FormItem
						label="选中商品分类图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('pic_select') ? '校验中...' : (getFieldError('pic_select') || []).join(', ')}
					>
						<Input {...imgSelectProps} type="file" id="file" name="file" className="upload-img"
												   accept="image/png, image/jpg, image/jpeg, image/gif"
												   style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadSelectImage} className="upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className="editform">
					<FormItem
						{...formItemLayout}
						label="图片预览"
						hasFeedback
					>
						<img src={this.state.imgSrc ? this.state.imgSrc : this.props.editRowData.pic }
							 className="preview-img"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="选中图片预览"
						hasFeedback
					>
						<img
							src={this.state.imgSelectSrc ? this.state.imgSelectSrc : this.props.editRowData.pic_select }
							className="preview-img"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品分类名称"
						hasFeedback
						help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
					>
						<Input {...specialNameProps} placeholder="请输入专题名称"/>
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="手Q链接"
						hasFeedback
						help={isFieldValidating('qq_url') ? '校验中...' : (getFieldError('qq_url') || []).join(', ')}
					>
						<Input {...specialUrlQQProps} placeholder="请输入手Q链接"/>
					</FormItem>
					< FormItem
						{...formItemLayout}
						label="微信链接"
						hasFeedback
						help={isFieldValidating('wechat_url') ? '校验中...' : (getFieldError('wechat_url') || []).join(', ')}
					>
						<Input {...specialUrlProps} placeholder="请输入微信链接"/>
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="SPM值"
						hasFeedback
						help={isFieldValidating('spm') ? '校验中...' : (getFieldError('spm') || []).join(', ')}
					>
						<Input placeholder="请输入SPM值"
							{...specialSortProps}
						/>
					</FormItem>


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