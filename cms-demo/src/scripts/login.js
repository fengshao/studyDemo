import {Form, Input, Button, Checkbox, message} from 'antd';
const FormItem = Form.Item;

let Demo = React.createClass({
	handleSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				return;
			}
			this.loginFnc(values);
		});
		// window.location.href = '/home.html';
	},

	loginFnc: function (loginData) {
		var locationHref = window.location.href.split("#")[0];
		var url = "//topics-cms.intra.wesai.com/api/login";

		if (locationHref.indexOf("devel") != -1) {
			url = "//topics-cms.devel.wesai.com/api/login";
		} else if (locationHref.indexOf("test") != -1) {
			url = "//topics-cms.test.wesai.com/api/login";
		} else if (locationHref.indexOf("127.0.0.1") != -1) {
			//url = "//topics-cms.mjd.wesai.com/api/login";
			url = "//periphery.devel.wesai.com/api/login";
		}
		// const hide = message.loading('正在登录，请稍后...', 0);
		// $.ajax({
		// 	"type": "post",
		//
		// 	xhrFields: {
		// 		withCredentials: true
		// 	},
		// 	crossDomain: true,
		// 	"data": loginData,
		// 	"url": url,
		// 	"success": function (data) {
		// hide();
		// if (data.code == 0) {
		window.sessionStorage.setItem("username", loginData.name);
		window.sessionStorage.setItem("user_role", 1);
		const hide = message.loading('登录成功，正在跳转...', 0);
		setTimeout(function () {
			hide();
			window.location.href = './local_home.html';
		}, 2500);
		// } else {
		// 	message.error(data.detail ? data.detail : "登录失败，请重试");
		// }
		// },
		// "error": function (data) {
		// 	hide();
		// 	message.error(data.detail ? data.detail : "登录失败，请重试");
		// }
		// });
	},

	render() {
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const userNmaeProps = getFieldProps('name', {
			rules: [
				{required: true, message: '用户名不能为空'}
			]
		});
		const passWordProps = getFieldProps('password', {
			rules: [
				{required: true, message: '密码不能为空'}
			]
		});

		return (
			<Form inline onSubmit={this.handleSubmit} className="loginform">
				<FormItem
					label="用户名"
					hasFeedback
					help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
				>
					<Input placeholder="请输入用户名"
						   defaultValue="admin"
						{...userNmaeProps}
					/>
				</FormItem>
				<FormItem
					label="密码"
					hasFeedback
					help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
				>
					<Input type="password" placeholder="请输入密码"
						   defaultValue="admin"
						{...passWordProps}
					/>
				</FormItem>
				<Button type="primary" htmlType="submit">登录</Button>
			</Form>
		);
	}
});

Demo = Form.create()(Demo);

module.exports = Demo;