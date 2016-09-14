import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

let Demo = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        window.location.href = '/home.html';
    },

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form inline onSubmit={this.handleSubmit} className="loginform">
                <FormItem
                    label="账户"
                >
                    <Input placeholder="请输入账户名"
                           defaultValue="admin"
                        {...getFieldProps('userName')}
                    />
                </FormItem>
                <FormItem
                    label="密码"
                >
                    <Input type="password" placeholder="请输入密码"
                           defaultValue="admin"
                        {...getFieldProps('password')}
                    />
                </FormItem>
                <FormItem>
                    <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
        );
    },
});

Demo = Form.create()(Demo);

module.exports = Demo;