import React from 'react';
import '../style/Login.less';
import { Form, Button, Row, Col, Input } from 'antd';
const FormItem = Form.Item;
import API from '../Common/API';

let Register = React.createClass({
    getInitialState() {
        return {
            msg: ''
        }  
    },
    componentDidMount() {
        let [email, code] = this.props.params.key.split(':');
        this.props.form.setFieldsValue({
            email: email,
            code: code
        })
    },
    handleSubmit(e) {
        e.preventDefault();
        let {nickname, password, passwordConfirm, email, code} = this.props.form.getFieldsValue();
        if (password !== passwordConfirm) {
            this.setState({
                msg: '两次输入的密码不同！'
            });
            return
        }
        if (password.length < 8) {
            this.setState({
                msg: '密码长度至少8位'
            });
            return
        }
        
        API.json('post', API.Auth.register, {
            nickname: nickname,
            password: password,
            email: email,
            code: code
        })
        .then((json) => {
            this.setState({
                msg: json.msg
            });
            setTimeout(() => {
                this.setState({ msg: '' })
                window.location = '/';
            }, 3000);
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
                <Input type='email' placeholder='邮箱' {...getFieldProps('email') } required disabled/>
                <Input type='text' placeholder='验证码' {...getFieldProps('code') } required disabled/>
                <Input type='text' placeholder='昵称' {...getFieldProps('nickname') } required />
                <Input type='password' placeholder='密码' {...getFieldProps('password') } required />
                <Input type='password' placeholder='确认密码' {...getFieldProps('passwordConfirm') } required />
                <Button size="large" type="primary" disabled={!!msg} htmlType="submit">{msg || '提交'}</Button>
            </Form>
            {/*<small><a href='#'>忘记密码</a></small>*/}
        </div>
    }
});

Register = Form.create()(Register);

export default Register;