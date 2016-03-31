import React from 'react';
import { message, Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon, Modal } from 'antd';
const FormItem = Form.Item;
import Dev from '../Common/Dev';
import FormModal from './FormModal';

const BaseInfo = React.createClass({
    getInitialState() {
        return {
            name: '',
            alias: '',
            intro: '',
            date: null,
            id: '',
            sign: '',
            cert: '',
            signStatus: '',
            debugSign: '',
            debugCert: '',
            debugSignDate: 0,
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
                sign: game.sign,
                cert: game.cert,
                signStatus: game.signStatus,
                debugSign: game.debugSign,
                debugCert: game.debugCert,
                debugSignDate: game.debugSignDate,
                modalVisible: false
            })
        })
    },
    handleEdit(e) {
        e.preventDefault();
        let gameid = this.props.gameid;
        FormModal({
            fields: [{
                label: '名称：',
                type: 'text',
                placeholder: '游戏名',
                name: 'name',
                required: true
            }, {
                label: '别名：',
                type: 'text',
                placeholder: '游戏别名',
                name: 'alias',
                required: true
            }, {
                label: '介绍：',
                type: 'textarea',
                placeholder: '随便写',
                name: 'intro',
                required: false
            }],
            defaultData: {
                name: this.state.name,
                alias: this.state.alias,
                intro: this.state.intro
            },
            onOk: (error, close, json) => {
                Dev.patchGame({
                    gameid: gameid,
                    ...json
                })
                .then((json) => {
                    close();
                    this.componentDidMount();
                })
                .catch(msg => error(msg));
            }
        })
    },
    handleApplySign(e) {
        e.preventDefault();
        let gameid = this.props.gameid;
        let requestSign = () => {
            Dev.postSign(gameid)
            .then(json => {
                this.componentDidMount();
                message.success(json.msg);
            })
            .catch(message.error);
        }
        if (this.state.signStatus==='done') 
            Modal.confirm({
                title: '确认',
                content: '仅建议您在小组别名或游戏别名发生改变时重新申请，确认继续吗？',
                onOk(close) {
                    requestSign();
                    close();
                }
            })
        else
            requestSign();
    },
    handleDebugSignDownload(e) {
        e.preventDefault();
        let gameid = this.props.gameid;
        Dev.postDebugSign(gameid)
        .then(json => {
            this.componentDidMount();
            message.success(json.msg);
        })
        .catch(message.error);
    },
    render() {
        let signStatus;
        switch (this.state.signStatus) {
            case 'no': signStatus = <span>未申请<a onClick={this.handleApplySign}>申请</a></span>;break;
            case 'pending': signStatus = <span>申请中</span>;break;
            case 'rejected': signStatus = <span>申请被拒绝'<a onClick={this.handleApplySign}>再次申请</a></span>;break;
            case 'done': signStatus = <span>申请成功'<a onClick={this.handleApplySign}>重新申请</a></span>;break;
            default: signStatus = <span>未申请<a onClick={this.handleApplySign}>申请</a></span>;break;
        }
        let debugSign;
        let days = 24*3 - Math.floor((Date.now() - this.state.debugSignDate) / 3600000);
        if (this.state.debugSign && days > 0)
            debugSign = <a href='#' onClick={this.handleDebugSignDownload}>下载<span style={{color: 'green'}}>{days}小时后过期</span></a>
        else if (this.state.debugSign)
            debugSign = <a href='#' onClick={this.handleDebugSignDownload}>重新申请<span style={{color: 'red'}}>已过期</span></a>
        else
            debugSign = <a href='#' onClick={this.handleDebugSignDownload}>申请</a>
            
        return <div className='GamePageBlock'>
            <h4>基本信息</h4>
            <p>名称：{this.state.name}</p>
            <p>别名：{this.state.alias}</p>
            <p>介绍：{this.state.intro}</p>
            <p>创建时间：{dateFormat(this.state.date) }</p>
            <p>GameID：<code>{this.state.id}</code></p>
            <p>签名数据：<code>{this.state.sign || '无'}</code></p>
            <p>发布证书：{signStatus}</p>
            <p>测试签名：<code>{this.state.debugSign || '无'}</code></p>
            <p>测试证书：{debugSign}</p>
            <Button type="ghost" onClick={this.handleEdit}>编辑信息</Button>
        </div>
    }
});

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