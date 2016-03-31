import React from 'react';
import '../style/Login.less';
import { Form, Button, Row, Col, Input } from 'antd';
const FormItem = Form.Item;
import Auth from '../Common/Auth';

let Register = React.createClass({
    getInitialState() {
        return {
            msg: ''
        }  
    },
    handleSubmit(e) {
        e.preventDefault();
        let {username, password} = this.props.form.getFieldsValue();
        Auth.login(username, password)
        .then((msg) => {
            this.setState({
                msg: '登录成功...'
            });
            setTimeout(() => {
                this.setState({ msg: '' })
                window.location = '/';
            }, 500);
        })
        .catch((msg) => {
            this.setState({
                msg: msg
            })
        })
    },
    handleChange(e) {
        if (this.state.msg)
            this.setState({
                msg: ''
            })
    },
    render() {
        const { getFieldProps } = this.props.form;
        const { msg } = this.state;
        const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
        return <div className='bk-login'>
            <h3>注册</h3>
            <Form horizontal onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Input type='email' placeholder='邮箱' {...getFieldProps('email') } required />
                <Input type='password' placeholder='密码' {...getFieldProps('password') } required />
                <Input type='password' placeholder='确认密码' {...getFieldProps('password') } required />
                <Input type='text' placeholder='验证码' {...getFieldProps('code') } required />
                <Button size="large" type="primary" disabled={!!msg} htmlType="submit">{msg || '提交'}</Button>
            </Form>
            {/*<small><a href='#'>忘记密码</a></small>*/}
        </div>
    }
});

Register = Form.create()(Register);

export default Register;