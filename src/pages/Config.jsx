import React from 'react';
import User from '../Common/User';
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Config = React.createClass({
    componentWillMount() {

    },
    render() {
        return <div className='Config'>
            <h3 style={{textAlign: 'center', marginBottom: '25px'}}>开发者设置</h3>
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
        this.props.form.setFieldsValue(User.getConfig());
    },
    handleSubmit(e) {
        e.preventDefault();
        User.patchConfig(this.props.form.getFieldsValue())
        .then((json) => {
            if (json.success){
                this.setState({ msg: json.msg });
                setTimeout(() => window.location = '/', 500);
            }
            else
                this.setState({ msg: json.msg })
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
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { email } = User.getConfig();
        const { msg } = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <FormItem
                    {...formItemLayout}
                    label="邮箱：">
                    <p className="ant-form-text" id="email" name="email">{email}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="当前密码：">
                    <Input type="password" {...getFieldProps('password') } placeholder="请输入密码" required />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='小组名：'>
                    <Input type="text" placeholder="小组名" {...getFieldProps('name') } required />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="小组别名："
                    help="只允许输入英文字母与数字的组合，且以字母开头。这将作为你的游戏包名的一部分。">
                    <Input type="text" placeholder="小组别名" {...getFieldProps('alias') } required />
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

export default Config;