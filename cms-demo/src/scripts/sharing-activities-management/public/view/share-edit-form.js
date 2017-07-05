/**
 * Created by fengshao on 2017/2/7.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var PublicAjax = require("../../../../ajax/public-ajax");

var ShareEditForm = React.createClass({
	getInitialState: function () {
		return {
			imgSrc: this.props.editAllData.share_friends_pic
		};
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

	previous: function () {

		var _this = this;
		this.props.form.validateFields((errors, values) => {
			values.share_friends_pic = this.state.imgSrc ? this.state.imgSrc : this.props.editAllData.share_friends_pic;
			values.share_group_pic = this.state.imgSrc ? this.state.imgSrc : this.props.editAllData.share_friends_pic;
			_this.props.previous(values);
		});

	},

	next: function () {

		var _this = this;
		this.props.form.validateFields((errors, values) => {
			values.share_friends_pic = this.state.imgSrc ? this.state.imgSrc : this.props.editAllData.share_friends_pic;
			values.share_group_pic = this.state.imgSrc ? this.state.imgSrc : this.props.editAllData.share_friends_pic;

			if (!!errors) {
				return;
			}

			_this.props.next(values);
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

	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const shareTitleProps = getFieldProps('share_group_title', {
			rules: [
				{required: true, message: '分享标题不能为空'}
			],
			initialValue: this.props.editAllData.share_group_title ? this.props.editAllData.share_group_title : ""
		});

		const wechatFriendsProps = getFieldProps('share_group_detail', {
			rules: [
				{required: true, message: '分享文案不能为空'}
			],
			initialValue: this.props.editAllData.share_group_detail ? this.props.editAllData.share_group_detail : ""
		});

		const wechatCircleProps = getFieldProps('share_friends_title', {
			rules: [
				{required: true, message: '分享标题不能为空'}
			],
			initialValue: this.props.editAllData.share_friends_title ? this.props.editAllData.share_friends_title : ""
		});

		const imgProps = getFieldProps('share_friends_pic', {
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
				<div>
					<Form horizontal className="editform" id="fileForm">
						<FormItem
							label="专题图片"
							hasFeedback
							{...formItemLayout}
							help={isFieldValidating('share_friends_pic') ? '校验中...' : (getFieldError('share_friends_pic') || []).join(', ')}
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
							<img src={this.state.imgSrc ? this.state.imgSrc : this.props.editAllData.share_friends_pic }
								 className="preview-img"/>
						</FormItem>
						<div className="ant-col-5"></div>
						<div className="ant-col-13">

							<fieldset className="fieldset-cls">
								<legend>分享给朋友</legend>
								<FormItem
									{...formItemLayout}
									label="分享标题"
									hasFeedback
									help={isFieldValidating('share_group_title') ? '校验中...' : (getFieldError('share_group_title') || []).join(', ')}
								>
									<Input {...shareTitleProps} placeholder="请输入分享标题"/>
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="分享描述"
									hasFeedback
									help={isFieldValidating('share_group_detail') ? '校验中...' : (getFieldError('share_group_detail') || []).join(', ')}
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
									help={isFieldValidating('share_friends_title') ? '校验中...' : (getFieldError('share_friends_title') || []).join(', ')}
								>
									<Input {...wechatCircleProps} placeholder="请输入分享标题"/>
								</FormItem>
							</fieldset>
						</div>

						<FormItem wrapperCol={{ span: 12, offset: 7 }}>
							<Button type="primary" onClick={this.previous}>上一步</Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="primary" onClick={this.next}>下一步</Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
});
ShareEditForm = Form.create()(ShareEditForm);

module.exports = ShareEditForm;