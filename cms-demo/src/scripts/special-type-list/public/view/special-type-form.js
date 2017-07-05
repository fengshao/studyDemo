/**
 * Created by fengshao on 2016/11/7.
 */
import {Form, Input, Button, Icon, message ,Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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

	checkSpeciaTypelName: function (rule, value, callback) {
		var flag = false;

		for (var i = 0; i < this.props.allData.length; i++) {
			if (value == this.props.allData[i].type_name && this.props.editRowData.type_id != this.props.allData[i].type_id) {
				flag = true;
				break;
			}
		}

		if (flag) {
			callback([new Error('抱歉，该专题模块名称已被占用。')]);
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
				return;
			}

			values.id = _this.props.editRowData.id;
			//values.type_name = _this.props.editRowData.type_name;
			_this.props.editSpecialType(values);
		});


	},

	render(){
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

		const specialTypeNameProps = getFieldProps('type_name', {
			rules: [
				{required: true, max: 20, message: '专题模块名称最多为 20 个字符'},
				{validator: this.checkSpeciaTypelName}
			],
			initialValue: this.props.editRowData.type_name ? this.props.editRowData.type_name : ""
		});


		const specialSortProps = getFieldProps('sort', {
			rules: [
				{required: true, message: '排序不能为空'},
				{validator: this.checkSpecialSort}
			],
			initialValue: this.props.editRowData.sort ? this.props.editRowData.sort.toString() : this.props.editRowData.sort
		});

		const statusProps = getFieldProps('status', {
			rules: [
				{required: true, message: '请选择是否展示模块'}
			],
			initialValue: this.props.editRowData.status ? this.props.editRowData.status.toString() : "0"
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
						label="模块名称"
						hasFeedback
						help={isFieldValidating('type_name') ? '校验中...' : (getFieldError('type_name') || []).join(', ')}
					>
						<Input placeholder="请输入专题模块名称"
							{...specialTypeNameProps}
						/>
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
					<FormItem
						{...formItemLayout}
						label="是否展示模块"
					>
						<RadioGroup {...statusProps} >
							<Radio value="0">展示</Radio>
							<Radio value="1">隐藏</Radio>
						</RadioGroup>
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