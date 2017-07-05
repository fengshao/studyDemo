/**
 * Created by fengshao on 2016/9/19.
 */
let NeedLogin = React.createClass({
	render: function () {
		return (
			<div className="need-login-div">
				<div className="need-login-centent">
					<div className="need-login-title">您还未登录，请 <a href="/index.html">登录</a></div>
				</div>
			</div>
		);
	}
});

module.exports = NeedLogin;