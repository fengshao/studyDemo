/**
 * Created by fengshao on 2017/2/7.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message,DatePicker,Col} from 'antd';
const FormItem = Form.Item;
var PublicAjax = require("../../../../ajax/public-ajax");

var maxsize = 1024 * 1024;//1MB
var errMsg = "上传的附件文件不能超过1MB！！！";
var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过1MB，建议使用IE、FireFox、Chrome浏览器。";
var browserCfg = {};
var ua = window.navigator.userAgent;
if (ua.indexOf("MSIE") >= 1) {
	browserCfg.ie = true;
} else if (ua.indexOf("Firefox") >= 1) {
	browserCfg.firefox = true;
} else if (ua.indexOf("Chrome") >= 1) {
	browserCfg.chrome = true;
}

var BasicInformationForm = React.createClass({
	getInitialState: function () {
		return {
			bg_body_img: this.props.editAllData.bg_body,
			back_home_bg_img: this.props.editAllData.back_home_bg,
			bgMusicSrc: this.props.editAllData.bg_music,
			startValue: this.props.editAllData.start_time ? this.props.editAllData.start_time : this.formatDateTime(),
			endValue: this.props.editAllData.end_time ? this.props.editAllData.end_time : this.formatDateTime("", 1),
			endOpen: false
		};
	},

	checkActivitiesBgImgType: function (rule, value, callback) {
		if (!value && this.state.bg_body_img) {
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

	checkReturnHomeImgType: function (rule, value, callback) {
		if (!value && this.state.back_home_bg_img) {
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

	checkfile: function () {
		try {
			var obj_file = $("#bgMusicForm #file")[0];
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
			alert(e);
		}
	},

	checkBgMusic: function (rule, value, callback) {
		if (!value && this.state.bgMusicSrc) {
			callback();
			return
		}

		if (!value) {
			callback();
			return
		}
		var fileType = value.substr(value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
		if (fileType != '.mp3') {
			callback([new Error('抱歉，请选择mp3格式并小于1MB 的文件上传。')]);
		} else if (!this.checkfile()) {
			callback([new Error('抱歉，请选择mp3格式并小于1MB 的文件上传。')]);
		} else {
			callback();
		}
	},

	uploadActivitiesBgImage: function () {
		var formData = new FormData($("#activitiesBgForm")[0]);
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
						bg_body_img: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadReturnHomeImage: function () {
		var formData = new FormData($("#returnHomeForm")[0]);
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
						back_home_bg_img: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadBg_music: function () {
		if (this.checkfile()) {
			var formData = new FormData($("#bgMusicForm")[0]);
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
							bgMusicSrc: srcUrl
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

	checkSpecialName: function (rule, value, callback) {
		var flag = false;

		for (var i = 0; i < this.props.allData.length; i++) {
			if (value == this.props.allData[i].title && this.props.editAllData.id != this.props.allData[i].id) {
				flag = true;
				break;
			}
		}

		if (flag) {
			callback([new Error('抱歉，该活动名称已被占用。')]);
		} else {
			callback();
		}
	},

	disabledStartDate(startValue) {
		if (!startValue || (!this.state.endValue && !this.props.form.getFieldValue('end_time'))) {
			return false;
		}
		//return startValue.getTime() >= this.state.endValue.getTime();
		return startValue.getTime() >= (this.props.form.getFieldValue('end_time') ? this.props.form.getFieldValue('end_time').getTime() : Date.parse(new Date(this.state.endValue)));
	},

	disabledEndDate(endValue) {
		this.props.form.getFieldValue('start_time')
		this.props.form.getFieldValue('end_time')
		if (!endValue || (!this.state.startValue && !this.props.form.getFieldValue('start_time'))) {
			return false;
		}
		return endValue.getTime() <= (this.props.form.getFieldValue('start_time') ? this.props.form.getFieldValue('start_time').getTime() : Date.parse(new Date(this.state.startValue)));
		//return endValue.getTime() <= Date.parse(new Date(this.state.startValue));
	},

	onChange(field, value, dateString) {
		this.setState({
			[field]: dateString,
		});
	},

	onStartChange(value, dateString) {
		this.onChange('startValue', value, dateString);
	},

	onEndChange(value, dateString) {
		this.onChange('endValue', value, dateString);
	},

	handleStartToggle({ open }) {
		if (!open) {
			this.setState({endOpen: true});
		}
	},
	handleEndToggle({ open }) {
		this.setState({endOpen: open});
	},

	formatDateTime: function (date, num) {
		var date = date ? date : new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1 + (num ? num : 0);
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		var minute = date.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
	},

	next: function () {


		var _this = this;
		if (!this.state.bg_body_img && !this.props.editAllData.bg_body) {
			message.warning('请上传活动背景图片');
			return;
		}

		if (!this.state.back_home_bg_img && !this.props.editAllData.back_home_bg) {
			message.warning('请上传返回首页图片');
			return;
		}

		//if (!this.state.bgMusicSrc && !this.props.editAllData.bg_music) {
		//message.warning('请上传背景音乐');
		//return;
		//}

		this.props.form.validateFields((errors, values) => {
			values.bg_body = this.state.bg_body_img;
			values.back_home_bg = this.state.back_home_bg_img;
			values.bg_music = this.state.bgMusicSrc;
			values.start_time = this.state.startValue;
			values.end_time = this.state.endValue;

			if (!!errors) {
				return;
			}

			this.props.next(values);
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
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const imgActivitiesBgProps = getFieldProps('bg_body', {
			validate: [{
				rules: [
					{validator: this.checkActivitiesBgImgType}
				],
				trigger: ['onChange']
			}]
		});

		const imgReturnHomeProps = getFieldProps('back_home_bg', {
			validate: [{
				rules: [
					{validator: this.checkReturnHomeImgType}
				],
				trigger: ['onChange']
			}]
		});

		const bgMusicProps = getFieldProps('bg_music', {
			validate: [{
				rules: [
					{validator: this.checkBgMusic}
				],
				trigger: ['onChange']
			}]
		});

		const specialTitleProps = getFieldProps('title', {
			rules: [
				{required: true, max: 20, message: '分享活动名称最多为 20 个字符'},
				{validator: this.checkSpecialName}
			],
			initialValue: this.props.editAllData.title ? this.props.editAllData.title : ""
		});

		const specialSPMProps = getFieldProps('spm', {
			rules: [
				{required: true, message: 'SPM值不能为空'}
			],
			initialValue: this.props.editAllData.spm ? this.props.editAllData.spm.toString() : this.props.editAllData.spm
		});

		const returnHomeQQUrlProps = getFieldProps('back_home_url_qq', {
			rules: [
				{required: true, message: '返回首页链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editAllData.back_home_url_qq ? this.props.editAllData.back_home_url_qq : ""
		});

		const returnHomeWechatProps = getFieldProps('back_home_url_wechat', {
			rules: [
				{required: true, message: '返回首页链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editAllData.back_home_url_wechat ? this.props.editAllData.back_home_url_wechat : ""
		});

		return (
			<div>
				<Form horizontal className="editform" id="activitiesBgForm">
					<FormItem
						label="活动背景图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('bg_body') ? '校验中...' : (getFieldError('bg_body') || []).join(', ')}
					>
						<Input {...imgActivitiesBgProps} type="file" id="file" name="file" className="upload-img"
														 accept="image/png, image/jpg, image/jpeg, image/gif"
														 style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadActivitiesBgImage} className="upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className="editform" id="returnHomeForm">
					<FormItem
						label="返回首页图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('back_home_bg') ? '校验中...' : (getFieldError('back_home_bg') || []).join(', ')}
					>
						<Input {...imgReturnHomeProps} type="file" id="file" name="file" className="upload-img"
													   accept="image/png, image/jpg, image/jpeg, image/gif"
													   style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadReturnHomeImage} className="upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className="editform" id="bgMusicForm">
					<FormItem
						label="背景音乐"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('bg_music') ? '校验中...' : (getFieldError('bg_music') || []).join(', ')}
					>
						<Input {...bgMusicProps} type="file" id="file" name="file" className="upload-img"
												 accept="audio/mp3"
												 style={{ width: '70%', marginRight: 8 }}
						/>
						<Button onClick={this.uploadBg_music} className=" upload-btn">上传</Button>
					</FormItem>
				</Form>

				<Form horizontal className=" editform">
					<FormItem
						{...formItemLayout}
						label="活动背景图片预览"
						hasFeedback
					>
						<img
							src={this.state.bg_body_img ? this.state.bg_body_img : this.props.editAllData.bg_body }
							className=" preview-img"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="返回首页图片预览"
						hasFeedback
					>
						<img
							src={this.state.back_home_bg_img ? this.state.back_home_bg_img : this.props.editAllData.back_home_bg }
							className=" preview-img"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="背景音乐预览"
						hasFeedback
					>
						<audio id="bgMusic"
							   src={this.state.bgMusicSrc ? this.state.bgMusicSrc : this.props.editAllData.bg_music }
							   loop="loop"
							   controls="controls"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="分享活动名称"
						hasFeedback
						help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
					>
						<Input {...specialTitleProps} placeholder=" 请输入分享活动名称"/>
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="活动时间"
						required
					>
						<Col span="6">
							<FormItem className="calendar-picker-cls"
							>
								<DatePicker
									placeholder="开始日期"
									onChange={this.onStartChange}
									value={this.state.startValue}
									disabledDate={this.disabledStartDate}
									toggleOpen={this.handleStartToggle}
									showTime format="yyyy-MM-dd HH:mm:ss"
								/>
							</FormItem>
						</Col>
						<Col span="1">
							<p className="ant-form-split">&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;</p>
						</Col>
						<Col span="6">
							<FormItem className="calendar-picker-cls"
							>
								<DatePicker
									onChange={this.onEndChange}
									value={this.state.endValue}
									disabledDate={this.disabledEndDate}
									placeholder="结束日期"
									open={this.state.endOpen}
									toggleOpen={this.handleEndToggle}
									showTime format="yyyy-MM-dd HH:mm:ss"
								/>
							</FormItem>
						</Col>

					</FormItem>

					<FormItem
						{...formItemLayout}
						label="返回商品首页链接手Q"
						hasFeedback
						help={isFieldValidating('back_home_url_qq') ? '校验中...' : (getFieldError('back_home_url_qq') || []).join(', ')}
					>
						<Input placeholder="请输入返回商品首页链接"
							{...returnHomeQQUrlProps}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="返回商品首页链接微信"
						hasFeedback
						help={isFieldValidating('back_home_url_wechat') ? '校验中...' : (getFieldError('back_home_url_wechat') || []).join(', ')}
					>
						<Input placeholder="请输入返回商品首页链接"
							{...returnHomeWechatProps}
						/>
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="SPM值"
						hasFeedback
						help={isFieldValidating('spm') ? '校验中...' : (getFieldError('spm') || []).join(', ')}
					>
						<Input placeholder="请输入SPM值"
							{...specialSPMProps}
						/>
					</FormItem>


					<FormItem wrapperCol={{ span: 12, offset: 7 }}>
						<Button type="primary" onClick={this.next}>下一步</Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
					</FormItem>
				</Form>
			</div>
		)
			;
	}
});
BasicInformationForm = Form.create()(BasicInformationForm);

module.exports = BasicInformationForm;