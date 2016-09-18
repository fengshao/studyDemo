/**
 * Created by fengs on 2016/9/17.
 */
import {Form, Input, Button, InputNumber, Upload, Icon} from 'antd';
const FormItem = Form.Item;
//require("jquery-form");
var EditForm = React.createClass({


	confirm: function (rowData) {
		this.props.deleteSpecialFnc(rowData);
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

	saveSpecial: function () {

		var _this = this;
		this.props.form.validateFields((errors, values) => {
			var flag = false;
			$.each(values, function (name, value) {
				if (value != _this.props.editRowData[name]) {
					flag = true
				}
			});

			if (!!errors || !flag) {
				console.log("111")
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

	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const specialNameProps = getFieldProps('title', {
			rules: [
				{required: true, max: 20, message: '专题名称最多为 20 个字符'},
				{validator: this.checkSpecialName}
			],
			initialValue: this.props.editRowData.title
		});

		const specialUrlProps = getFieldProps('url', {
			rules: [
				{required: true, message: '链接不能为空'},
				{validator: this.checkSpecialUrl}
			],
			initialValue: this.props.editRowData.url
		});

		const specialSortProps = getFieldProps('sort', {
			rules: [
				{required: true, message: '排序不能为空'},
				{validator: this.checkSpecialSort}
			],
			initialValue: this.props.editRowData.sort ? this.props.editRowData.sort.toString() : this.props.editRowData.sort
		});

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};
		return (
			<div>
				<Form horizontal className="editform">
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

//<form action="http://10.2.2.9:20202/uploading" enctype="multipart/form-data" method="post"
//	  id="fileForm" name="fileForm">
//	<label className="operate-from-label">专题图片：</label>
//	<input type="file" id="file" name="file" accept="image/png, image/jpg, image/jpeg"
//		   className="operate-from-input"/>
//	<Button type="primary" onClick={this.uploadImgFnc}>上传</Button>
//	<div id="imgurl-div">
//		<div class="img-preview">图片预览区域</div>
//		<img src=""/>
//		<div class="error">请选择小于2MB的png，jpg，jpeg格式图片上传</div>
//	</div>
//</form>