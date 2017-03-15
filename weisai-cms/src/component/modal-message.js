/**
 * Created by fengshao on 2017/1/16.
 */
import {Modal,Button} from 'antd';
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
				footer={<Button type="primary" size="large" onClick={this.props.onOk} >朕晓得了</Button>}
			>
				<h3>{this.props.message}</h3>
				<h3>部署地址：{this.props.messageUrl}</h3>
			</Modal>);
	},
});
module.exports = ModalMessage;