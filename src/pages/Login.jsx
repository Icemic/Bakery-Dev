import React from 'react';
import '../style/Login.less';
import { Form, Button, Row, Col, Input } from 'antd';
import Auth from '../Common/Auth';

let Login = React.createClass({
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
        return <div className='bk-login'>
            <h3>登录</h3>
            <Form horizontal onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Input size="large" type='text' placeholder='用户名 / 邮箱' {...getFieldProps('username')}/>
                <Input size="large" type='password' placeholder='密码' {...getFieldProps('password')}/>
                
                <Button size="large" type="primary" disabled={!!msg} htmlType="submit">{msg || '登录'}</Button>
            </Form>
            {/*<small><a href='#'>忘记密码</a></small>*/}
        </div>
    }
});

Login = Form.create()(Login);

export default Login;