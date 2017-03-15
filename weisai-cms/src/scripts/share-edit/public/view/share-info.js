/**
 * Created by fengshao on 2016/11/29.
 */
import {Form, Input, Button, InputNumber, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
var ShareInfo = React.createClass({
	getInitialState: function () {
		return {};
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "hidden");
	},

	componentDidMount: function () {
		$("body").css("overflow", "auto");
	},

	render(){

		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};
		return (
			<div>
				<div className="ant-col-4"></div>
				<div className="ant-col-13">
					<Form horizontal className="editform">
						<FormItem wrapperCol={{ span: 12, offset: 12 }}>
							{
								this.props.editRowData.id ? "" : <label className="share-message">当前没有分享文案，请添加</label>
							}
							{
								this.props.editRowData.id ?
									<Button className="share-btn" type="primary"
											onClick={this.props.showEditFrom.bind(this,this.props.editRowData)}>编辑</Button> : ""
							}
							{
								this.props.editRowData.id ? "" :
									<Button className="share-btn" type="primary"
											onClick={this.props.showAddFrom}>添加</Button>

							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="分享图片"
							hasFeedback
						>
							<img src={ this.props.editRowData.img }
								 className="preview-img"/>
						</FormItem>
						<fieldset className="fieldset-cls">
							<legend>分享给朋友</legend>
							<FormItem
								{...formItemLayout}
								label="分享标题"
								hasFeedback
							>
								<label>{this.props.editRowData.title}</label>
							</FormItem>

							<FormItem
								{...formItemLayout}
								label="分享描述"
								hasFeedback
							>
								<label>{this.props.editRowData.wechat_friends}</label>
							</FormItem>
						</fieldset>
						<fieldset className="fieldset-cls">
							<legend>分享到朋友圈只有标题没有描述</legend>
							<FormItem
								{...formItemLayout}
								label="分享标题"
								hasFeedback
							>
								<label>{this.props.editRowData.wechat_circle }</label>
							</FormItem>
						</fieldset>

					</Form>
				</div>
			</div>
		);
	}
});
ShareInfo = Form.create()(ShareInfo);

module.exports = ShareInfo;