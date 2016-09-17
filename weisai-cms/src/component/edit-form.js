/**
 * Created by fengs on 2016/9/17.
 */
import {Form, Input, Button, InputNumber, Upload, Icon} from 'antd';
const FormItem = Form.Item;
var EditForm = React.createClass({
	getInitialState: function () {
		return {
			fileList: [{
				uid: -1,
				name: 'xxx.png',
				status: 'done',
				url: 'http://www.baidu.com/xxx.png',
				thumbUrl: 'http://www.baidu.com/xxx.png'
			}],
			tableHeight: $(window).height() - 56 - 30 - 130
		}
	},

	resizeWindow: function () {
		var tableHeight = $(window).height() - 56 - 30 - 130;
		this.setState({
			tableHeight: tableHeight
		});
	},

	componentWillUnmount: function () {
		$(window).off("resize", this.resizeWindow);
	},

	confirm: function (rowData) {
		this.props.deleteSpecialFnc(rowData);
	},

	componentDidMount: function () {
		$("body").css("overflow", "hidden");
		$(window).on("resize", this.resizeWindow);
	},

	checkSpecialName: function () {
		console.log("校验专题名称");
	},

	checkSpecialSort: function () {
		console.log("校验专题排序");
	},

	uploadImg: function (event) {
		var flag = false;
		var file = event.target.files ? event.target.files[0] : null;
		if (file) {
			var type = file.type.split("/")[1];
			type = type.toUpperCase();
			if (type != "JPEG" && type != "PNG" && type != "JPG"
				&& type != "GIF" && type != "BMP") {
				message.warn('图片类型必须是gif,jpeg,jpg,png,bmp中的一种！');
				event.target.value = "";
			} else if (file.size > limitSize * 1024) {
				message.warn('图片大小必须小于' + limitSize + 'kb!');
				event.target.value = "";
			} else {
				var reader = new FileReader();
				var _this = this;
				reader.onload = function (evt) {
					var image = evt.target.result;
					_this.props.onChange(image);
				};
				reader.readAsDataURL(file);
				flag = true;
			}
		}
		return flag;
	},

	handleChange(info) {
		let fileList = info.fileList;

		// 1. 上传列表数量的限制
		//    只显示最近上传的一个，旧的会被新的顶掉
		fileList = fileList.slice(-2);

		// 2. 读取远程路径并显示链接
		fileList = fileList.map((file) => {
			if (file.response) {
				// 组件会将 file.url 作为链接进行展示
				file.url = file.response.url;
			}
			return file;
		});

		// 3. 按照服务器返回信息筛选成功上传的文件
		fileList = fileList.filter((file) => {
			if (file.response) {
				return file.response.status === 'success';
			}
			return true;
		});

		this.setState({fileList});
	},

	render() {
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const specialNameProps = getFieldProps('specialName', {
			rules: [
				{required: true, max: 20, message: '专题名称最多为 20 个字符'},
				{validator: this.checkSpecialName}
			]
		});

		const specialUrlProps = getFieldProps('specialUrl', {
			rules: [
				{required: true, message: '链接不能为空'}
			]
		});

		const specialSortProps = getFieldProps('specialSort', {
			rules: [
				{required: true, message: '排序不能为空'},
				{validator: this.checkSpecialSort}
			]
		});

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};

		const props = {
			action: 'http://10.2.2.9:20202/uploading',
			listType: 'picture',
			showUploadList: false,
			onChange: this.handleChange,
			beforeUpload: function (file) {
				var fileType = file.type.toLocaleLowerCase();
				var fileSize = file.size;
				if (fileSize > 2048 * 1024) {
					showImgErrorPrompt();
					return false
				}
				if (!(fileType.lastIndexOf("png") !== -1
					|| fileType.lastIndexOf("jpg") !== -1
					|| fileType.lastIndexOf("jpeg") !== -1)) {
					showImgErrorPrompt();
					return false
				}
				console.log(file);
			}
		};

		return (
			<Form horizontal className="editform">
				<FormItem
					{...formItemLayout}
					label="用户名"
					hasFeedback
					help={isFieldValidating('specialName') ? '校验中...' : (getFieldError('specialName') || []).join(', ')}
				>
					<Input {...specialNameProps} placeholder="请输入专题名称"/>
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="链接"
					hasFeedback
					help={isFieldValidating('specialUrl') ? '校验中...' : (getFieldError('specialUrl') || []).join(', ')}
				>
					<Input {...specialUrlProps} placeholder="请输入链接"/>
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="排序"
					hasFeedback
					help={isFieldValidating('specialSort') ? '校验中...' : (getFieldError('specialSort') || []).join(', ')}
				>
					<InputNumber min={1} style={{ width: 100 }}
						{...specialSortProps}
					/>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="专题图片"
					hasFeedback
				>
					<Upload {...props} className="upload-list-inline" fileList={this.state.fileList}>
						<Button type="ghost">
							<Icon type="upload"/> 点击上传
						</Button>
					</Upload>

				</FormItem>

				<FormItem wrapperCol={{ span: 12, offset: 7 }}>
					<Button type="primary">确定</Button>
					&nbsp;&nbsp;&nbsp;
					<Button type="ghost" onClick={this.props.hideEditFrom}>返回</Button>
				</FormItem>
			</Form>
		);
	}
});
EditForm = Form.create()(EditForm);

module.exports = EditForm;