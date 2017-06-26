/**
 * Created by fengshao on 2016/12/30.
 */
import { Button} from 'antd';
let APPTopBtn = React.createClass({
	render: function () {
		return (
			<div className="">
				<Button type="primary" className="loginout-btn" onClick={this.props.previewAppHtml}>预览APP首页页面</Button>
				<Button type="primary" className="loginout-btn" loading={this.props.loading} onClick={this.props.uploadAppHtml}>部署APP首页页面</Button>
			</div>
		);
	}
});

module.exports = APPTopBtn;