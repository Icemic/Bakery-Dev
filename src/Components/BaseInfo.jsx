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
            cert: '',
            key: '',
            signStatus: '',
            debugCert: '',
            debugKey: '',
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
                cert: game.cert,
                key: game.key,
                signStatus: game.signStatus,
                debugCert: game.debugCert,
                debugKey: game.debugKey,
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
                help: "只允许输入英文字母与数字的组合，且以字母开头。这将作为你的游戏包名的一部分。",
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
            case 'done': signStatus = <span><a href='#' onClick={this.handleDownload(this.state.cert, 'release.crt')}>下载</a> <a onClick={this.handleApplySign}>重新申请</a></span>;break;
            default: signStatus = <span>未申请 <a onClick={this.handleApplySign}>申请</a></span>;break;
        }
        let debugCert;
        let hours = 24*7 - Math.round((Date.now() - this.state.debugSignDate) / 3600000);
        let days = Math.floor(hours / 24);
        hours = hours % 24;
        if (this.state.debugCert && days > 0)
            debugCert = <span><a href='#' onClick={this.handleDownload(this.state.debugCert, 'debug.crt')}>下载</a><span style={{color: 'green'}}>（{days}天{hours||''}{hours?'小时':''}后过期）</span><a href='#' onClick={this.handleDebugSignRequest}>重新申请</a></span>
        else if (this.state.debugCert)
            debugCert = <span><a href='#' onClick={this.handleDebugSignRequest}>重新申请</a><span style={{color: 'red'}}>（已过期）</span></span>
        else
            debugCert = <span><a href='#' onClick={this.handleDebugSignRequest}>申请</a></span>

        return <div className='GamePageBlock'>
            <h3>基本信息</h3>
            <Button type="ghost" style={{float: 'right'}} onClick={this.handleEdit}>编辑信息</Button>
            <p>名称：{this.state.name}</p>
            <p>别名：{this.state.alias}</p>
            <p>介绍：{this.state.intro}</p>
            <p>创建时间：{dateFormat(this.state.date) }</p>
            <p>类型：{'同人贩售 VIP' }</p>
            <p>GameID：<code>{this.state.id}</code></p>
            <h4>测试</h4>
            <p>证书：{debugCert}</p>
            <p>密钥：{this.state.debugCert?<a href='#' onClick={this.handleDownload(this.state.debugKey, 'debug.key')}>下载</a>:'未申请'} <span style={{color: 'red'}}>请妥善保存密钥，不能将密钥透露给任何人</span></p>
            <h4>发布</h4>
            <p>证书：{signStatus}</p>
            <p>密钥：{this.state.cert?<a href='#' onClick={this.handleDownload(this.state.key, 'release.key')}>下载</a>:'未申请'} <span style={{color: 'red'}}>请妥善保存密钥，不能将密钥透露给任何人</span></p>
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
