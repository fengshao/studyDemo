/**
 * Created by fengshao on 2017/2/7.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var PublicAjax = require("../../../../ajax/public-ajax");

var ShareEditForm = React.createClass({
	getInitialState: function () {
		return {
			bg_goods_src: this.props.editAllData.bg_goods
		};
	},

	checkCommodityImgType: function (rule, value, callback) {
		if (!value && this.state.bg_goods_src) {
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
						bg_goods_src: srcUrl
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
			values.bg_goods = this.state.bg_goods_src ? this.state.bg_goods_src : this.props.editAllData.bg_goods;
			_this.props.previous(values);
		});
	},

	saveForm: function () {
		var _this = this;
		if (!this.state.bg_goods_src && !this.props.editAllData.bg_goods) {
			message.warning('请上传商品背景区图片');
			return;
		}

		this.props.form.validateFieldsAndScroll((errors, values) => {
			var flag = false;
			values.bg_goods = this.state.bg_goods_src ? this.state.bg_goods_src : this.props.editAllData.bg_goods;
			values = _.extend(this.props.editAllData, values);
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
				_this.props.editActivity(values);
			} else {
				_this.props.addActivity(values);
			}
		});
	},

	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const imgCommodityProps = getFieldProps('bg_goods', {
			validate: [{
				rules: [
					{validator: this.checkCommodityImgType}
				],
				trigger: ['onChange']
			}]
		});

		return (
			<div>
				<Form horizontal className="editform" id="fileForm">
					<FormItem
						label="商品背景区图片"
						hasFeedback
						{...formItemLayout}
						help={isFieldValidating('bg_goods') ? '校验中...' : (getFieldError('bg_goods') || []).join(', ')}
					>
						<Input {...imgCommodityProps} type="file" id="file" name="file" className="upload-img"
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
						<img
							src={this.state.bg_goods_src ? this.state.bg_goods_src : this.props.editAllData.bg_goods }
							className="preview-img"/>
					</FormItem>

					<FormItem wrapperCol={{ span: 12, offset: 7 }}>
						<Button type="primary" onClick={this.previous}>上一步</Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="primary" onClick={this.saveForm}>保存</Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
					</FormItem>

				</Form>
			</div>
		);
	}
});
ShareEditForm = Form.create()(ShareEditForm);

module.exports = ShareEditForm;