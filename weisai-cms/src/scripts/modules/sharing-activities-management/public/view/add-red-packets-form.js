/**
 * Created by fengshao on 2017/2/7.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message,Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
var PublicAjax = require("../../../../ajax/public-ajax");
var AddHbForm = React.createClass({
	getInitialState: function () {
		return {
			is_had_hb: this.props.editAllData.is_had_hb ? this.props.editAllData.is_had_hb.toString() : "1",
			hb_count: this.props.editAllData.hb_count ? this.props.editAllData.hb_count.toString() : "1",
			hb_1_img_src: this.props.editAllData.hb_1_img,
			hb_2_img_src: this.props.editAllData.hb_2_img,
			hb_3_img_src: this.props.editAllData.hb_3_img,
			bg_separate_src: this.props.editAllData.bg_separate,
			bg_hb_src: this.props.editAllData.bg_hb

		};
	},

	onRadioReaPacketNumChange: function (e) {
		this.setState({
			hb_count: e.target.value
		});
	},

	checkreaPacketsImg1Type: function (rule, value, callback) {
		if (!value && this.state.hb_1_img_src) {
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

	checkreaPacketsImg2Type: function (rule, value, callback) {
		if (this.state.hb_count == 2 || this.state.hb_count == 3) {
			if (!value && this.state.hb_2_img_src) {
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
		} else {
			callback();
		}

	},

	checkreaPacketsImg3Type: function (rule, value, callback) {
		if (this.state.hb_count == 3) {
			if (!value && this.state.hb_3_img_src) {
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
		} else {
			callback();
		}
	},

	checkreaPacketsSeparateImgType: function (rule, value, callback) {
		if (!value && this.state.bg_separate_src) {
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

	checkreaPacketsBgImgType: function (rule, value, callback) {
		if (!value && this.state.bg_hb_src) {
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

	uploadRedPacketsImage1: function () {
		var formData = new FormData($("#redPacketsImgForm1")[0]);
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
						hb_1_img_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadRedPacketsImage2: function () {
		var formData = new FormData($("#redPacketsImgForm2")[0]);
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
						hb_2_img_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadRedPacketsImage3: function () {
		var formData = new FormData($("#redPacketsImgForm3")[0]);
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
						hb_3_img_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadRedPacketsSeparateImage: function () {
		var formData = new FormData($("#redPacketsSeparateForm")[0]);
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
						bg_separate_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
			}
		});
	},

	uploadRedPacketsBgImage: function () {
		var formData = new FormData($("#redPacketsBgForm")[0]);
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
						bg_hb_src: srcUrl
					})
				} else {
				}
			},
			error: (result) => {
				message.error('上传失败');
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

	previous: function () {

		var _this = this;
		this.props.form.validateFields((errors, values) => {

			values.is_had_hb = this.state.is_had_hb ? this.state.is_had_hb : this.props.editAllData.is_had_hb;
			values.hb_count = this.state.hb_count ? this.state.hb_count : this.props.editAllData.hb_count;
			values.hb_1_img = this.state.hb_1_img_src ? this.state.hb_1_img_src : this.props.editAllData.hb_1_img;
			values.hb_2_img = this.state.hb_2_img_src ? this.state.hb_2_img_src : this.props.editAllData.hb_2_img;
			values.hb_3_img = this.state.hb_3_img_src ? this.state.hb_3_img_src : this.props.editAllData.hb_3_img;
			values.bg_separate = this.state.bg_separate_src ? this.state.bg_separate_src : this.props.editAllData.bg_separate;
			values.bg_hb = this.state.bg_hb_src ? this.state.bg_hb_src : this.props.editAllData.bg_hb;
			_this.props.previous(values);
		});

	},

	next: function () {

		if (this.state.is_had_hb == 1) {
			var flag = false;
			switch (this.state.hb_count) {
				case "1":
					if (!this.state.hb_1_img_src && !this.props.editAllData.hb_1_img) {
						flag = true;
					}
					break;
				case "2":
					if (!this.state.hb_1_img_src && !this.props.editAllData.hb_1_img
						&& !this.state.hb_2_img_src && !this.props.editAllData.hb_2_img) {
						flag = true;
					}
					break;
				case "3":
					if (!this.state.hb_1_img_src && !this.props.editAllData.hb_1_img
						&& !this.state.hb_2_img_src && !this.props.editAllData.hb_2_img
						&& !this.state.hb_3_img_src && !this.props.editAllData.hb_3_img) {
						flag = true;
					}
					break;
			}

			if (flag) {
				message.warning("请上传红包图片");
				return;
			}

			if (!this.state.bg_separate_src && !this.props.editAllData.bg_separate) {
				message.warning('请上红包商品分隔图');
				return;
			}

			if (!this.state.bg_hb_src && !this.props.editAllData.bg_hb) {
				message.warning('请上红包背景区图片');
				return;
			}

		}

		var _this = this;
		if (this.state.is_had_hb == 1) {
			this.props.form.validateFields((errors, values) => {
				values.is_had_hb = this.state.is_had_hb ? this.state.is_had_hb : this.props.editAllData.is_had_hb;
				values.hb_count = this.state.hb_count ? this.state.hb_count : this.props.editAllData.hb_count;
				values.hb_1_img = this.state.hb_1_img_src ? this.state.hb_1_img_src : this.props.editAllData.hb_1_img;
				values.hb_2_img = this.state.hb_2_img_src ? this.state.hb_2_img_src : this.props.editAllData.hb_2_img;
				values.hb_3_img = this.state.hb_3_img_src ? this.state.hb_3_img_src : this.props.editAllData.hb_3_img;
				values.bg_separate = this.state.bg_separate_src ? this.state.bg_separate_src : this.props.editAllData.bg_separate;
				values.bg_hb = this.state.bg_hb_src ? this.state.bg_hb_src : this.props.editAllData.bg_hb;

				if (!!errors) {
					return;
				}

				_this.props.next(values);
			});
		} else {
			var values = {
				is_had_hb: this.state.is_had_hb ? this.state.is_had_hb : this.props.editAllData.is_had_hb
			};
			_this.props.next(values);
		}

	},

	onRadioChange: function (e) {
		this.setState({
			is_had_hb: e.target.value
		});
	},


	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const reaPacketsImgProps1 = getFieldProps('hb_1_img', {
			validate: [{
				rules: [
					{validator: this.checkreaPacketsImg1Type}
				],
				trigger: ['onChange']
			}]
		});

		let specialHb1UrlQQProps = getFieldProps('hb_1_url_qq', {
			rules: [
				{required: true, message: '手Q链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editAllData.hb_1_url_qq ? this.props.editAllData.hb_1_url_qq : ""
		});

		let specialHb1UrlProps = getFieldProps('hb_1_url_wechat', {
			rules: [
				{required: true, message: '微信链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editAllData.hb_1_url_wechat ? this.props.editAllData.hb_1_url_wechat : ""
		});


		const redPacketsSeparateProps = getFieldProps('bg_separate', {
			validate: [{
				rules: [
					{validator: this.checkreaPacketsSeparateImgType}
				],
				trigger: ['onChange']
			}]
		});
		const redPacketsBgProps = getFieldProps('bg_hb', {
			validate: [{
				rules: [
					{validator: this.checkreaPacketsBgImgType}
				],
				trigger: ['onChange']
			}]
		});

		let reaPacketsImgProps2 = "";
		let specialHb2UrlQQProps = "";
		let specialHb2UrlProps = "";
		let reaPacketsImgProps3 = "";
		let specialHb3UrlQQProps = "";
		let specialHb3UrlProps = "";

		if (this.state.hb_count == 2) {

			reaPacketsImgProps2 = getFieldProps('hb_2_img', {
				validate: [{
					rules: [
						{validator: this.checkreaPacketsImg2Type}
					],
					trigger: ['onChange']
				}]
			});

			specialHb2UrlQQProps = getFieldProps('hb_2_url_qq', {
				rules: [
					{required: true, message: '手Q链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editAllData.hb_2_url_qq ? this.props.editAllData.hb_2_url_qq : ""
			});

			specialHb2UrlProps = getFieldProps('hb_2_url_wechat', {
				rules: [
					{required: true, message: '微信链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editAllData.hb_2_url_wechat ? this.props.editAllData.hb_2_url_wechat : ""
			});


		} else if (this.state.hb_count == 3) {

			reaPacketsImgProps2 = getFieldProps('hb_2_img', {
				validate: [{
					rules: [
						{validator: this.checkreaPacketsImg2Type}
					],
					trigger: ['onChange']
				}]
			});

			specialHb2UrlQQProps = getFieldProps('hb_2_url_qq', {
				rules: [
					{required: true, message: '手Q链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editAllData.hb_2_url_qq ? this.props.editAllData.hb_2_url_qq : ""
			});

			specialHb2UrlProps = getFieldProps('hb_2_url_wechat', {
				rules: [
					{required: true, message: '微信链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editAllData.hb_2_url_wechat ? this.props.editAllData.hb_2_url_wechat : ""
			});

			reaPacketsImgProps3 = getFieldProps('hb_3_img', {
				validate: [{
					rules: [
						{validator: this.checkreaPacketsImg3Type}
					],
					trigger: ['onChange']
				}]
			});

			specialHb3UrlQQProps = getFieldProps('hb_3_url_qq', {
				rules: [
					{required: true, message: '手Q链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editAllData.hb_3_url_qq ? this.props.editAllData.hb_3_url_qq : ""
			});

			specialHb3UrlProps = getFieldProps('hb_3_url_wechat', {
				rules: [
					{required: true, message: '微信链接不能为空'},
					{validator: this.checkSpecialUrl}
				],
				initialValue: this.props.editAllData.hb_3_url_wechat ? this.props.editAllData.hb_3_url_wechat : ""
			});
		}


		return (
			<div>
				<div>
					<Form horizontal className="editform" id="radioForm">
						<FormItem
							{...formItemLayout}
							label="是否添加红包"
						>
							<RadioGroup onChange={this.onRadioChange}
										value={this.state.is_had_hb}>
								<Radio value="1">是</Radio>
								<Radio value="2">否</Radio>
							</RadioGroup>
						</FormItem>
						{
							this.state.is_had_hb == 1 ?
								<FormItem
									{...formItemLayout}
									label="红包个数"
								>
									<RadioGroup onChange={this.onRadioReaPacketNumChange}
												value={this.state.hb_count}>
										<Radio value="1">一个</Radio>
										<Radio value="2">两个</Radio>
										<Radio value="3">三个</Radio>
									</RadioGroup>
								</FormItem> : null
						}

					</Form>
				</div>
				{
					this.state.is_had_hb == 1 ?
						<div className="red-packets-content">
							<Form horizontal className="editform" id="redPacketsImgForm1">
								<FormItem
									label="红包图片"
									hasFeedback
									{...formItemLayout}
									help={isFieldValidating('hb_1_img') ? '校验中...' : (getFieldError('hb_1_img') || []).join(', ')}
								>
									<Input {...reaPacketsImgProps1} type="file" id="file" name="file"
																	className="upload-img"
																	accept="image/png, image/jpg, image/jpeg, image/gif"
																	style={{ width: '70%', marginRight: 8 }}
									/>
									<Button onClick={this.uploadRedPacketsImage1} className="upload-btn">上传</Button>
								</FormItem>
							</Form>

							<Form horizontal className="editform">

								<FormItem
									{...formItemLayout}
									label="红包图片预览"
									hasFeedback
								>
									<img
										src={this.state.hb_1_img_src ? this.state.hb_1_img_src : this.props.editAllData.hb_1_img }
										className="preview-img"/>
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="手Q链接"
									hasFeedback
									help={isFieldValidating('hb_1_url_qq') ? '校验中...' : (getFieldError('hb_1_url_qq') || []).join(', ')}
								>
									<Input {...specialHb1UrlQQProps} placeholder="请输入手Q链接"/>
								</FormItem>
								< FormItem
									{...formItemLayout}
									label="微信链接"
									hasFeedback
									help={isFieldValidating('hb_1_url_wechat') ? '校验中...' : (getFieldError('hb_1_url_wechat') || []).join(', ')}
								>
									<Input {...specialHb1UrlProps} placeholder="请输入微信链接"/>
								</FormItem>
							</Form>

							{
								this.state.hb_count == 2 ?
									<div>
										<Form horizontal className="editform" id="redPacketsImgForm2">
											<FormItem
												label="红包图片"
												hasFeedback
												{...formItemLayout}
												help={isFieldValidating('hb_2_img') ? '校验中...' : (getFieldError('hb_2_img') || []).join(', ')}
											>
												<Input {...reaPacketsImgProps2} type="file" id="file" name="file"
																				className="upload-img"
																				accept="image/png, image/jpg, image/jpeg, image/gif"
																				style={{ width: '70%', marginRight: 8 }}
												/>
												<Button onClick={this.uploadRedPacketsImage2}
														className="upload-btn">上传</Button>
											</FormItem>
										</Form>

										<Form horizontal className="editform">

											<FormItem
												{...formItemLayout}
												label="红包图片预览"
												hasFeedback
											>
												<img
													src={this.state.hb_2_img_src ? this.state.hb_2_img_src : this.props.editAllData.hb_2_img }
													className="preview-img"/>
											</FormItem>
											<FormItem
												{...formItemLayout}
												label="手Q链接"
												hasFeedback
												help={isFieldValidating('hb_2_url_qq') ? '校验中...' : (getFieldError('hb_2_url_qq') || []).join(', ')}
											>
												<Input {...specialHb2UrlQQProps} placeholder="请输入手Q链接"/>
											</FormItem>
											< FormItem
												{...formItemLayout}
												label="微信链接"
												hasFeedback
												help={isFieldValidating('hb_2_url_wechat') ? '校验中...' : (getFieldError('hb_2_url_wechat') || []).join(', ')}
											>
												<Input {...specialHb2UrlProps} placeholder="请输入微信链接"/>
											</FormItem>
										</Form>
									</div>
									: this.state.hb_count == 3 ?
									<div>
										<Form horizontal className="editform" id="redPacketsImgForm2">
											<FormItem
												label="红包图片"
												hasFeedback
												{...formItemLayout}
												help={isFieldValidating('hb_2_img') ? '校验中...' : (getFieldError('hb_2_img') || []).join(', ')}
											>
												<Input {...reaPacketsImgProps2} type="file" id="file" name="file"
																				className="upload-img"
																				accept="image/png, image/jpg, image/jpeg, image/gif"
																				style={{ width: '70%', marginRight: 8 }}
												/>
												<Button onClick={this.uploadRedPacketsImage2}
														className="upload-btn">上传</Button>
											</FormItem>
										</Form>

										<Form horizontal className="editform">

											<FormItem
												{...formItemLayout}
												label="红包图片预览"
												hasFeedback
											>
												<img
													src={this.state.hb_2_img_src ? this.state.hb_2_img_src : this.props.editAllData.hb_2_img }
													className="preview-img"/>
											</FormItem>
											<FormItem
												{...formItemLayout}
												label="手Q链接"
												hasFeedback
												help={isFieldValidating('hb_2_url_qq') ? '校验中...' : (getFieldError('hb_2_url_qq') || []).join(', ')}
											>
												<Input {...specialHb2UrlQQProps} placeholder="请输入手Q链接"/>
											</FormItem>
											< FormItem
												{...formItemLayout}
												label="微信链接"
												hasFeedback
												help={isFieldValidating('hb_2_url_wechat') ? '校验中...' : (getFieldError('hb_2_url_wechat') || []).join(', ')}
											>
												<Input {...specialHb2UrlProps} placeholder="请输入微信链接"/>
											</FormItem>
										</Form>
										<Form horizontal className="editform" id="redPacketsImgForm3">
											<FormItem
												label="红包图片"
												hasFeedback
												{...formItemLayout}
												help={isFieldValidating('hb_3_img') ? '校验中...' : (getFieldError('hb_3_img') || []).join(', ')}
											>
												<Input {...reaPacketsImgProps3} type="file" id="file" name="file"
																				className="upload-img"
																				accept="image/png, image/jpg, image/jpeg, image/gif"
																				style={{ width: '70%', marginRight: 8 }}
												/>
												<Button onClick={this.uploadRedPacketsImage3}
														className="upload-btn">上传</Button>
											</FormItem>
										</Form>

										<Form horizontal className="editform">

											<FormItem
												{...formItemLayout}
												label="红包图片预览"
												hasFeedback
											>
												<img
													src={this.state.hb_3_img_src ? this.state.hb_3_img_src : this.props.editAllData.hb_3_img }
													className="preview-img"/>
											</FormItem>
											<FormItem
												{...formItemLayout}
												label="手Q链接"
												hasFeedback
												help={isFieldValidating('hb_3_url_qq') ? '校验中...' : (getFieldError('hb_3_url_qq') || []).join(', ')}
											>
												<Input {...specialHb3UrlQQProps} placeholder="请输入手Q链接"/>
											</FormItem>
											< FormItem
												{...formItemLayout}
												label="微信链接"
												hasFeedback
												help={isFieldValidating('hb_3_url_wechat') ? '校验中...' : (getFieldError('hb_3_url_wechat') || []).join(', ')}
											>
												<Input {...specialHb3UrlProps} placeholder="请输入微信链接"/>
											</FormItem>
										</Form>
									</div> : ""
							}

						</div> : null
				}
				<div>
					{
						this.state.is_had_hb == 1 ?
							<div>
								<Form horizontal className="editform" id="redPacketsSeparateForm">
									<FormItem
										label="红包商品分隔图"
										hasFeedback
										{...formItemLayout}
										help={isFieldValidating('bg_separate') ? '校验中...' : (getFieldError('bg_separate') || []).join(', ')}
									>
										<Input {...redPacketsSeparateProps} type="file" id="file" name="file"
																			className="upload-img"
																			accept="image/png, image/jpg, image/jpeg, image/gif"
																			style={{ width: '70%', marginRight: 8 }}
										/>
										<Button onClick={this.uploadRedPacketsSeparateImage}
												className="upload-btn">上传</Button>
									</FormItem>
								</Form>

								<Form horizontal className="editform">

									<FormItem
										{...formItemLayout}
										label="红包商品分隔图预览"
										hasFeedback
									>
										<img
											src={this.state.bg_separate_src ? this.state.bg_separate_src : this.props.editAllData.bg_separate }
											className="preview-img"/>
									</FormItem>
								</Form>
								<Form horizontal className="editform" id="redPacketsBgForm">
									<FormItem
										label="红包区背景区图片"
										hasFeedback
										{...formItemLayout}
										help={isFieldValidating('bg_hb') ? '校验中...' : (getFieldError('bg_hb') || []).join(', ')}
									>
										<Input {...redPacketsBgProps} type="file" id="file" name="file"
																	  className="upload-img"
																	  accept="image/png, image/jpg, image/jpeg, image/gif"
																	  style={{ width: '70%', marginRight: 8 }}
										/>
										<Button onClick={this.uploadRedPacketsBgImage}
												className="upload-btn">上传</Button>
									</FormItem>
								</Form>
							</div> : null

					}

					<Form horizontal className="editform">
						{
							this.state.is_had_hb == 1 ?
								<FormItem
									{...formItemLayout}
									label="红包区背景区预览"
									hasFeedback
								>
									<img
										src={this.state.bg_hb_src ? this.state.bg_hb_src : this.props.editAllData.bg_hb }
										className="preview-img"/>
								</FormItem> : null
						}


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
AddHbForm = Form.create()(AddHbForm);

module.exports = AddHbForm;