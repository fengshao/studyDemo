/**
 * Created by fengshao on 2016/11/29.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var PublicAjax = require("../../../../ajax/public-ajax");

var EditForm = React.createClass({
	getInitialState: function () {
		return {
			imgSrc: this.props.editRowData.img
		};
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "hidden");
	},

	componentDidMount: function () {
		$("body").css("overflow", "auto");
	},

	checkImgType: function (rule, value, callback) {

		if (this.state.imgSrc) {
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
		if (!this.state.imgSrc && !this.props.editRowData.img) {
			message.warning('请上传图片');
			return;
		}
		this.props.form.validateFields((errors, values) => {
			values.img = this.state.imgSrc ? this.state.imgSrc : this.props.editRowData.img;
			values.qq_circle = values.wechat_circle;
			values.qq_friends = values.wechat_friends;
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

	uploadImage: function () {
		var formData = new FormData($("#fileForm")[0]);
		$.ajax({
			method: 'post',
			url: url,
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

	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const shareTitleProps = getFieldProps('title', {
			rules: [
				{required: true, message: '分享标题不能为空'}
			],
			initialValue: this.props.editRowData.title ? this.props.editRowData.title : ""
		});

		const wechatFriendsProps = getFieldProps('wechat_friends', {
			rules: [
				{required: true, message: '分享文案不能为空'}
			],
			initialValue: this.props.editRowData.wechat_friends ? this.props.editRowData.wechat_friends : ""
		});

		const wechatCircleProps = getFieldProps('wechat_circle', {
			rules: [
				{required: true, message: '分享标题不能为空'}
			],
			initialValue: this.props.editRowData.wechat_circle ? this.props.editRowData.wechat_circle : ""
		});

		const imgProps = getFieldProps('img', {
			validate: [{
				rules: [
					{validator: this.checkImgType}
				],
				trigger: ['onChange']
			}]
		});

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};
		return (
			<div>
				<div className="ant-col-4"></div>
				<div className="ant-col-13">
					<Form horizontal className="editform" id="fileForm">
						<FormItem
							label="专题图片"
							hasFeedback
							{...formItemLayout}
							help={isFieldValidating('img') ? '校验中...' : (getFieldError('img') || []).join(', ')}
						>
							<Input {...imgProps} type="file" id="file" name="file" className="upload-img"
												 accept="image/png, image/jpg, image/jpeg, image/gif"
												 style={{ width: '70%', marginRight: 8 }}
							/>
							<Button onClick={this.uploadImage}>上传</Button>
						</FormItem>
					</Form>

					<Form horizontal className="editform">
						<FormItem
							{...formItemLayout}
							label="图片预览"
							hasFeedback
						>
							<img src={this.state.imgSrc ? this.state.imgSrc : this.props.editRowData.imgSrc }
								 className="preview-img"/>
						</FormItem>

						<fieldset className="fieldset-cls">
							<legend>分享给朋友</legend>
							<FormItem
								{...formItemLayout}
								label="分享标题"
								hasFeedback
								help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
							>
								<Input {...shareTitleProps} placeholder="请输入分享标题"/>
							</FormItem>

							<FormItem
								{...formItemLayout}
								label="分享描述"
								hasFeedback
								help={isFieldValidating('wechat_friends') ? '校验中...' : (getFieldError('wechat_friends') || []).join(', ')}
							>
								<Input {...wechatFriendsProps} placeholder="请输入分享文案"/>
							</FormItem>
						</fieldset>
						<fieldset className="fieldset-cls">
							<legend>分享到朋友圈只有标题没有描述</legend>
							<FormItem
								{...formItemLayout}
								label="分享标题"
								hasFeedback
								help={isFieldValidating('wechat_circle') ? '校验中...' : (getFieldError('wechat_circle') || []).join(', ')}
							>
								<Input {...wechatCircleProps} placeholder="请输入分享标题"/>
							</FormItem>
						</fieldset>

						<FormItem wrapperCol={{ span: 12, offset: 10 }}>
							<Button type="primary" onClick={this.saveSpecial}>确定</Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
});
EditForm = Form.create()(EditForm);

module.exports = EditForm;