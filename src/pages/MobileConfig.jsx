import React from 'react';
import ReactDOM from 'react-dom';
import API from '../Common/API';
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

const MobileConfig = React.createClass({
    componentWillMount() {

    },
    render() {
        return <div className='Config'>
            <h3 style={{textAlign: 'center', marginBottom: '25px'}}>绑定手机</h3>
            <ConfigForm />
        </div>
    }
});


let ConfigForm = React.createClass({
    getInitialState() {
        return {
            msg: null
        }
    },
    componentDidMount() {
        API.json('get', API.Dev.mobileConfig)
        .then((json) => {
            this.props.form.setFieldsValue(json.data);
        })
    },
    handleSubmit(e) {
        e.preventDefault();
        API.json('patch', API.Dev.mobileConfig, this.props.form.getFieldsValue())
        .then((json) => {
            this.setState({ msg: json.msg });
            setTimeout(() => window.location = '/', 500);
        })
        .catch(msg => this.setState({ msg: msg }))
    },
    handleCode(e) {
        e.preventDefault();
        let mobile = this.props.form.getFieldValue('mobile') || '';
        let match = mobile.match(/[0-9+]+/);
        if (match && match[0]===mobile && mobile.length>8) {
            API.json('PUT', API.Dev.mobileCode, {
                mobile: mobile
            })
            .then(json => {
                let button = ReactDOM.findDOMNode(this.refs.requestCode);
                let originText = button.innerText;
                button.disabled = true;
                let i = 90;
                let interval = setInterval(() => {
                    button.innerText = `${i--}秒后重新获取`;
                    if (i < 0) {
                        button.innerText = originText;
                        button.disabled = false;
                        clearInterval(interval);
                    }
                }, 1000);
                message.success(json.msg);
            })
            .catch(message.error)
        }
        else {
            this.setState({
                msg: '请输入正确的手机号码'
            })
        }
    },
    handleChange(e) {
        if (this.state.msg)
            this.setState({
                msg: ''
            })
    },
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { msg } = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <FormItem
                    {...formItemLayout}
                    label="当前密码：">
                    <Input type="password" {...getFieldProps('password') } placeholder="请输入密码" required />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='手机：'
                    help="非中国大陆地区请添加国家代码，以 + 开头">
                    <Input type="tel" placeholder="手机号码" {...getFieldProps('mobile') } pattern='[0-9+]+' required />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='验证码：'>
                    <Input type="text" placeholder="" {...getFieldProps('code') } style={{ width: '55%', marginRight: 8 }} required />
                    <Button ref='requestCode' onClick={this.handleCode} style={{width: '42%', height: 35, float: 'right'}}>获取验证码</Button>
                </FormItem>
                <Row>
                    <Col span="14" offset="6">
                        <Button type="primary" htmlType="submit" disabled={!!msg} style={{marginTop: '15px', width: '100%'}}>{msg || '确定'}</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
});

ConfigForm = Form.create()(ConfigForm);

export default MobileConfig;
