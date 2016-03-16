import React from 'react';
import User from '../Common/User';
import Dev from '../Common/Dev';
import {NavigationAuthed} from '../Components/Navigation';
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const AddGame = React.createClass({
    componentWillMount() {

    },
    render() {
        return <div className='AddGame singlePage'>
            <h3 style={{ textAlign: 'center', marginBottom: '25px' }}>添加游戏</h3>
            <GameForm />
        </div>
    }
});


let GameForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            msg: null
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        Dev.postGame(this.props.form.getFieldsValue())
        .then((json) => {
            this.setState({ msg: json.msg });
            setTimeout(() => this.context.router.replace(`/game/${json.gameid}`), 500);
        })
        .catch((msg) => {
            console.log(msg)
            this.setState({ msg: msg })
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
        const { msg } = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <FormItem
                    {...formItemLayout}
                    label='名称：'>
                    <Input type="text" placeholder="游戏名" {...getFieldProps('name')} required />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="别名："
                    help="只允许输入英文字母与数字的组合，且以字母开头。这将作为你的游戏包名的一部分。">
                    <Input type="text" placeholder="游戏别名" {...getFieldProps('alias') } required />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="介绍：">
                    <Input type="textarea" placeholder="随便写" {...getFieldProps('intro') } />
                </FormItem>
                <Row>
                    <Col span="14" offset="6">
                        <Button type="primary" htmlType="submit" disabled={!!msg} style={{ marginTop: '15px', width: '100%' }}>{msg || '确定'}</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
});

GameForm = Form.create()(GameForm);

export default AddGame;