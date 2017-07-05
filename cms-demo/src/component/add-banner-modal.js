/**
 * Created by fengshao on 2017/2/17.
 */
import {Form, Button,Modal,Checkbox } from 'antd';
const FormItem = Form.Item;
const ModalMessage = React.createClass({
	getInitialState: function () {
		return {
			checkBoxMap: {}
		};
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState(this.getInitialState());
		var checkBoxMap = {};
		var goodsTypeIDs = nextProps.selectGoodsTypeList || [];
		goodsTypeIDs.forEach(function (id) {
			checkBoxMap[id] = true;
		});
		this.setState({
			checkBoxMap: checkBoxMap
		});
	},

	handleCommodityClassificationAdd: function (e) {
		var obj = this.state.checkBoxMap || {};
		var goodsTypeIDs = [];

		$.each(obj, function (key, values) {
			goodsTypeIDs.push(key);
		});

		this.props.selectGoodsTypeFnc(goodsTypeIDs);
	},

	//获取当前选中权限
	handleCheckBox: function (event) {
		var obj = this.state.checkBoxMap || {};
		if (event.target.checked) {
			obj[event.target.id] = event.target.checked;
		} else {
			delete obj[event.target.id];
		}
		this.setState({
				checkBoxMap: obj
			}
		);
	},

	render() {
		var _this = this;
		return (
			<Modal title={this.props.title} visible={this.props.visible}
				   onOk={this.handleCommodityClassificationAdd}
				   onCancel={this.props.onCancel}>
				<Form horizontal>
					<FormItem
						wrapperCol={{span: 24}}
					>
						{
							_this.props.goodsTypeList.map(function (goodsType, key) {
								var checked = _this.state.checkBoxMap[goodsType.id];
								return (
									<Checkbox
										className="ant-checkbox-inline model-commodity-cls"
										id={goodsType.id}
										key={key}
										checked={checked}
										onChange={_this.handleCheckBox}>{goodsType.title}</Checkbox>
								)
							})
						}
					</FormItem>
				</Form>
			</Modal>)
	},
});
module.exports = ModalMessage;