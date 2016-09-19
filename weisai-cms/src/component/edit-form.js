/**
 * Created by fengs on 2016/9/17.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var EditForm = React.createClass({


	getInitialState: function () {
		return {
			imgSrc: this.props.editRowData.img
		};
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "hidden");
		alt.flush();
	},

	componentDidMount: function () {
		$("body").css("overflow", "auto");
	},

	confirm: function (rowData) {
		this.props.deleteSpecialFnc(rowData);
	},

	checkSpecialName: function (rule, value, callback) {
		var flag = false;

		if (this.props.isNotShowCancelBtn) {
			callback();
			return
		}
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

	checkSpecialUrl: function (rule, value, callback) {
		if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)) {
			callback([new Error('抱歉，请输入有效的网址。')]);
		} else {
			callback();
		}
	},

	checkSpecialSort: function (rule, value, callback) {

		if (!/^\d+$/.test(value)) {
			callback([new Error('抱歉，请输入数字。')]);
		}

		if (this.props.isNotShowCancelBtn) {
			callback();
			return
		}
		var flag = false;
		for (var i = 0; i < this.props.allData.length; i++) {
			if (value == this.props.allData[i].sort && this.props.editRowData.id != this.props.allData[i].id) {
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

	checkImgType: function (rule, value, callback) {
		if (!value) {
			callback([new Error('抱歉，请选择png，jpg，jpeg格式的图片上传。')]);
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.jpg' && fileType != '.png' && fileType != '.jpeg') {
			callback([new Error('抱歉，请选择png，jpg，jpeg格式的图片上传。')]);
		} else {
			callback();
		}
	},

	saveSpecial: function () {

		var _this = this;
		if (!this.state.imgSrc) {
			message.warning('请上传图片');
			return;
		}
		this.props.form.validateFields((errors, values) => {
			values.img = this.state.imgSrc;
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
		var formData = new FormData($("#fileForm")[0]),
			url = 'http://10.2.2.9:20202/uploading';
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
					var srcUrl = imgData.savehost + imgData.savepath + "/" + imgData.savename;
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
		const specialNameProps = getFieldProps('title', {
			rules: [
				{required: true, max: 20, message: '专题名称最多为 20 个字符'},
				{validator: this.checkSpecialName}
			],
			initialValue: this.props.editRowData.title ? this.props.editRowData.title : ""
		});

		const specialUrlProps = getFieldProps('url', {
			rules: [
				{required: true, message: '链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editRowData.url ? this.props.editRowData.url : ""
		});

		if (!this.props.isNotShowCancelBtn) {
			var specialSortProps = getFieldProps('sort', {
				rules: [
					{required: true, message: '排序不能为空'},
					{validator: this.checkSpecialSort}
				],
				initialValue: this.props.editRowData.sort ? this.props.editRowData.sort.toString() : this.props.editRowData.sort
			});
		}


		const imgProps = getFieldProps('img', {
			validate: [{
				rules: [
					{required: true, message: '抱歉，请选择png，jpg，jpeg格式的图片上传。'},
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
				<Form horizontal className="editform" id="fileForm">
					<FormItem
						label="专题图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('img') ? '校验中...' : (getFieldError('img') || []).join(', ')}
					>
						<Input {...imgProps} type="file" id="file" name="file" className="upload-img"
											 accept="image/png, image/jpg, image/jpeg"
											 style={{ width: '80%', marginRight: 8 }}
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
						<img src={this.state.imgSrc ? this.state.imgSrc : this.props.editRowData.img }
							 className="preview-img"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="专题名称"
						hasFeedback
						help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
					>
						<Input {...specialNameProps} placeholder="请输入专题名称"/>
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="链接"
						hasFeedback
						help={isFieldValidating('url') ? '校验中...' : (getFieldError('url') || []).join(', ')}
					>
						<Input {...specialUrlProps} placeholder="请输入链接"/>
					</FormItem>

					{!this.props.isNotShowCancelBtn ?
						(<FormItem
							{...formItemLayout}
							label="排序"
							hasFeedback
							help={isFieldValidating('sort') ? '校验中...' : (getFieldError('sort') || []).join(', ')}
						>
							<Input placeholder="请输入排序序号"
								{...specialSortProps}
							/>
						</FormItem>) : ""
					}


					<FormItem wrapperCol={{ span: 12, offset: 7 }}>
						<Button type="primary" onClick={this.saveSpecial}>确定</Button>
						&nbsp;&nbsp;&nbsp;
						{this.props.isNotShowCancelBtn ? "" :
							(<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>)}
					</FormItem>
				</Form>
			</div>
		);
	}
});
EditForm = Form.create()(EditForm);

module.exports = EditForm;