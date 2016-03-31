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
    handleDebugSignRequest(e) {
        e.preventDefault();
        let gameid = this.props.gameid;
        Dev.postDebugSign(gameid)
        .then(json => {
            this.componentDidMount();
            message.success(json.msg);
        })
        .catch(message.error);
    },
    handleDownload(content, filename) {
        return (e) => {
            e.preventDefault();
            let link = document.createElement('a');
            let blob = new Blob([content]);
            let event = document.createEvent('HTMLEvents');
            event.initEvent("click", false, false);
            link.download = filename;
            link.href = URL.createObjectURL(blob);
            link.dispatchEvent(event);
        }
    },
    render() {
        let signStatus;
        switch (this.state.signStatus) {
            case 'no': signStatus = <span>未申请<a onClick={this.handleApplySign}>申请</a></span>;break;
            case 'pending': signStatus = <span>申请中</span>;break;
            case 'rejected': signStatus = <span>申请被拒绝 <a onClick={this.handleApplySign}>再次申请</a></span>;break;
            case 'done': signStatus = <span>申请成功 <a href='#' onClick={this.handleDownload(this.state.cert, 'release.crt')}>下载</a> <a onClick={this.handleApplySign}>重新申请</a></span>;break;
            default: signStatus = <span>未申请 <a onClick={this.handleApplySign}>申请</a></span>;break;
        }
        let debugSign;
        let days = 24*3 - Math.floor((Date.now() - this.state.debugSignDate) / 3600000);
        if (this.state.debugSign && days > 0)
            debugSign = <span><a href='#' onClick={this.handleDownload(this.state.debugCert, 'debug.crt')}>下载</a><span style={{color: 'green'}}>（{days}小时后过期）</span><a href='#' onClick={this.handleDebugSignRequest}>重新申请</a></span>
        else if (this.state.debugSign)
            debugSign = <span><a href='#' onClick={this.handleDebugSignRequest}>重新申请</a><span style={{color: 'red'}}>（已过期）</span></span>
        else
            debugSign = <span><a href='#' onClick={this.handleDebugSignRequest}>申请</a></span>
            
        return <div className='GamePageBlock'>
            <h4>基本信息</h4>
            <Button type="ghost" style={{float: 'right'}} onClick={this.handleEdit}>编辑信息</Button>
            <p>名称：{this.state.name}</p>
            <p>别名：{this.state.alias}</p>
            <p>介绍：{this.state.intro}</p>
            <p>创建时间：{dateFormat(this.state.date) }</p>
            <p>GameID：<code>{this.state.id}</code></p>
            <p>发布签名：<code>{this.state.sign?(this.state.sign.slice(0, 20)+'...'):'无'}</code>{this.state.sign?<a href='#' onClick={this.handleDownload(this.state.sign, 'release.sig')}>下载</a>:null}</p>
            <p>发布证书：{signStatus}</p>
            <p>测试签名：<code>{this.state.debugSign?(this.state.debugSign.slice(0, 20)+'...'):'无'}</code>{this.state.debugSign?<a href='#' onClick={this.handleDownload(this.state.debugSign, 'debug.sig')}>下载</a>:null}</p>
            <p>测试证书：{debugSign}</p>
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