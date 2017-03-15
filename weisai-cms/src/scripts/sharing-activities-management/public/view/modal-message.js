/**
 * Created by fengshao on 2017/2/16.
 */
import {Modal,Button} from 'antd';
var ReactCopyButtonWrapper = require("react-copy-button-wrapper");
const ModalMessage = React.createClass({
	render() {
		return (
			<Modal
				title={this.props.messageTitle}
				wrapClassName="vertical-center-modal"
				style={{ top: 50 }}
				visible={this.props.showMessageFlag}
				onOk={this.props.onOk}
				closable={false}
				maskClosable={false}
				onCancel={this.props.onCancel}
				footer={[
					<ReactCopyButtonWrapper text={this.props.wechat_url}>
  						<Button type="primary" size="large" >复制微信端链接</Button>
					</ReactCopyButtonWrapper>,
					<ReactCopyButtonWrapper text={this.props.qq_url}>
  						<Button type="primary" size="large" >复制手Q端链接</Button>
					</ReactCopyButtonWrapper>,
					<Button type="primary" size="large" onClick={this.props.onOk} >朕晓得了</Button>
				]}
			>
				<h3>{this.props.message}</h3>
				<h3>微信端地址：{this.props.wechat_url}</h3>
				<h3>手Q端地址：{this.props.qq_url}</h3>
			</Modal>);
	},
});
module.exports = ModalMessage;