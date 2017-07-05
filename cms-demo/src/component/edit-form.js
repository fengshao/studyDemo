/**
 * Created by fengs on 2016/9/17.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var PublicAjax = require("../ajax/public-ajax");

var browserCfg = {};
var ua = window.navigator.userAgent;
if (ua.indexOf("MSIE") >= 1) {
	browserCfg.ie = true;
} else if (ua.indexOf("Firefox") >= 1) {
	browserCfg.firefox = true;
} else if (ua.indexOf("Chrome") >= 1) {
	browserCfg.chrome = true;
}
var userRole = window.sessionStorage.getItem("user_role");
var EditForm = React.createClass({
	getInitialState: function () {
		return {
			imgSrc: this.props.editRowData.img_wechat
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

	checkfile: function () {
		if (userRole == 3) {
			try {
				var maxsize = this.props.appImgSize * 1024 * 1024;//1MB
				var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过" + this.props.appImgSize + "M，建议使用IE、FireFox、Chrome浏览器。";
				var obj_file = $("#fileForm #file")[0];
				if (obj_file.value == "") {
					//message.warning("请先选择上传文件");
					return false;
				}
				var filesize = 0;
				if (browserCfg.firefox || browserCfg.chrome) {
					filesize = obj_file.files[0].size;
				} else if (browserCfg.ie) {
					var obj_img = document.getElementById('tempimg');
					obj_img.dynsrc = obj_file.value;
					filesize = obj_img.fileSize;
				} else {
					message.warning(tipMsg);
					return false;
				}
				if (filesize == -1) {
					message.warning(tipMsg);
					return false;
				} else if (filesize > maxsize) {
					//message.warning(errMsg);
					return false;
				} else {
					return true;
				}
			} catch (e) {
				message.warning(e);
			}
		} else {
			return true;
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
		} else if (!this.checkfile()) {
			callback([new Error('抱歉，请选择png，jpg，jpeg，gif格式并小于' + this.props.appImgSize + 'M 的文件上传。')]);
		} else {
			callback();
		}
	},

	saveSpecial: function () {

		var _this = this;
		if (!this.state.imgSrc && !this.props.editRowData.img_wechat) {
			message.warning('请上传图片');
			return;
		}
		this.props.form.validateFields((errors, values) => {
			values.img_app = this.state.imgSrc;
			values.img_wechat = this.state.imgSrc;
			values.img_qq = this.state.imgSrc;
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
				values.type_id = _this.props.editRowData.type_id;
				_this.props.editSpecial(values);
			} else {
				values.type_id = _this.props.typeID;
				_this.props.addSpecial(values);
			}
		});


	},

	uploadImage: function () {
		var formData = new FormData($("#fileForm")[0]);
		if (this.checkfile()) {
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
		}
	},

	render(){
		const user_role = window.sessionStorage.getItem("user_role");
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const specialNameProps = getFieldProps('title', {
			rules: [
				{required: true, max: 20, message: '专题名称最多为 20 个字符'},
				{validator: this.checkSpecialName}
			],
			initialValue: this.props.editRowData.title ? this.props.editRowData.title : ""
		});

		if (user_role == 1) {

			var specialUrlProps = getFieldProps('url_wechat', {
				rules: [
					{required: true, message: '微信链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editRowData.url_wechat ? this.props.editRowData.url_wechat : ""
			});

			var specialUrlQQProps = getFieldProps('url_qq', {
				rules: [
					{required: true, message: '手Q链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editRowData.url_qq ? this.props.editRowData.url_qq : ""
			});
		} else {
			var specialUrlAPPProps = getFieldProps('url_app', {
				rules: [
					{required: true, message: 'APP链接不能为空'}
				],
				initialValue: this.props.editRowData.url_app ? this.props.editRowData.url_app : ""
			});
		}


		var specialSortProps = getFieldProps('sort', {
			rules: [
				{required: true, message: '排序不能为空'},
				{validator: this.checkSpecialSort}
			],
			initialValue: this.props.editRowData.sort ? this.props.editRowData.sort.toString() : this.props.editRowData.sort
		});

		const imgProps = getFieldProps('img_wechat', {
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
				<Form horizontal className="editform" id="fileForm">
					<FormItem
						label="专题图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('img_wechat') ? '校验中...' : (getFieldError('img_wechat') || []).join(', ')}
					>
						<Input {...imgProps} type="file" id="file" name="file" className="upload-img"
											 accept="image/png, image/jpg, image/jpeg, image/gif"
											 style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadImage} className="upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className="editform">
					<FormItem
						{...formItemLayout}
						label="图片预览"
						hasFeedback
					>
						<img src={this.state.imgSrc ? this.state.imgSrc : this.props.editRowData.img_wechat }
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

					{user_role == 1 ?
						<div>
							<FormItem
								{...formItemLayout}
								label="手Q链接"
								hasFeedback
								help={isFieldValidating('url_qq') ? '校验中...' : (getFieldError('url_qq') || []).join(', ')}
							>
								<Input {...specialUrlQQProps} placeholder="请输入手Q链接"/>
							</FormItem>
							< FormItem
								{...formItemLayout}
								label="微信链接"
								hasFeedback
								help={isFieldValidating('url_wechat') ? '校验中...' : (getFieldError('url_wechat') || []).join(', ')}
							>
								<Input {...specialUrlProps} placeholder="请输入微信链接"/>
							</FormItem>
						</div> :
						<FormItem
							{...formItemLayout}
							label="APP链接"
							hasFeedback
							help={isFieldValidating('url_app') ? '校验中...' : (getFieldError('url_app') || []).join(', ')}
						>
							<Input {...specialUrlAPPProps} placeholder="请输入APP链接"/>
						</FormItem>
					}

					<FormItem
						{...formItemLayout}
						label="排序"
						hasFeedback
						help={isFieldValidating('sort') ? '校验中...' : (getFieldError('sort') || []).join(', ')}
					>
						<Input placeholder="请输入排序序号"
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