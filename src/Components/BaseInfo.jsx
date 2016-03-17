import React from 'react';
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon, Modal } from 'antd';
const FormItem = Form.Item;
import Dev from '../Common/Dev';

const BaseInfo = React.createClass({
    getInitialState() {
        return {
            name: '',
            alias: '',
            intro: '',
            date: null,
            id: '',
            
            modalVisible: false
        }
    },
    componentDidMount() {
        Dev.getGame(this.props.gameid)
        .then((game) => {
            /* 没办法了，DOM操作就DOM操作吧……这貌似是唯一一处用得着Redux的地方 */
            document.getElementById('nav-gameName').textContent = game.name;
            this.setState({
                name: game.name,
                alias: game.alias,
                intro: game.intro,
                date: game.date,
                id: game._id,
                modalVisible: false
            })
        })
    },
    handleSuccess() {
        this.componentDidMount();
    },
    render() {
        return <div className='GamePageBlock'>
            <h4>基本信息</h4>
            <p>名称：{this.state.name}</p>
            <p>别名：{this.state.alias}</p>
            <p>介绍：{this.state.intro}</p>
            <p>创建时间：{dateFormat(this.state.date) }</p>
            <p>GameID：<code>{this.state.id}</code></p>
            <GameFormModal gameid={this.props.gameid} onSuccess={this.handleSuccess}/>
        </div>
    }
})


let GameFormModal = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            msg: null,
            modalVisible: false
        }
    },
    componentDidMount() {
        Dev.getGame(this.props.gameid)
        .then((game) => {
            this.props.form.setFieldsValue(game);
        })
    },
    showModal() {
        this.setState({
            modalVisible: true
        });
    },
    handleCancel() {
        this.setState({
            modalVisible: false
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        let json = this.props.form.getFieldsValue();
        json.id = this.props.gameid;
        Dev.patchGame(json)
            .then((json) => {
                this.setState({ msg: json.msg });
                setTimeout(() => {
                    this.props.onSuccess && this.props.onSuccess();
                    this.setState({
                        modalVisible: false,
                        msg: ''
                    })
                }, 500);
            })
            .catch((msg) => {
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
            <div>
            <Button type="ghost" onClick={this.showModal}>编辑信息</Button>
            <Modal title="对话框标题"
                visible={this.state.modalVisible}
                onCancel={this.handleCancel}
                footer={null}>
                <Form horizontal onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <FormItem
                        {...formItemLayout}
                        label='名称：'>
                        <Input type="text" placeholder="游戏名" {...getFieldProps('name') } required />
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
                            <Button type="primary" htmlType="submit" disabled={!!msg} style={{width: '100%'}}>{msg || '确定'}</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            </div>
        );
    }
});

GameFormModal = Form.create()(GameFormModal);

function dateFormat(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes();
    return `${year}-${padStart(month)}-${padStart(day)} ${padStart(hour)}:${padStart(minute)}`;
}

function padStart(value) {
    if (value < 10)
        return `0${value}`;
    return `${value}`;
}

export default BaseInfo;