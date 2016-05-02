import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal, Button, Icon, message, Progress, Tooltip } from 'antd';
const ProgressLine = Progress.Line;
import FormModal from '../../Components/FormModal';
import Dev from '../../Common/Dev';

import API from '../../Common/API';

const Package = React.createClass({
    getInitialState() {
        return {
            iconExist: true,
            iconUrl: '',
            arcExist: false
        }
    },
    componentWillMount() {
        API.json('GET', API.Dev.Package.info, {
            gameid: this.props.params.id
        })
        .then(json => this.setState(json.data))
        .catch(message.success)
    },
    handleResetIcon(e) {
        e.preventDefault();
        API.json('DELETE', API.Dev.Package.icon, {
            gameid: this.props.params.id
        })
        .then(json => {
            message.success(json.msg);
            this.componentWillMount();
        })
        .catch(message.success)
    },
    handleResetArc(e) {
        e.preventDefault();
        API.json('DELETE', API.Dev.Package.arc, {
            gameid: this.props.params.id
        })
        .then(json => {
            message.success(json.msg);
            this.componentWillMount();
        })
        .catch(message.success)
    },
    render() {
        return <div className='GamePage'>
            <div className='GamePageBlock'>
                <h3>游戏打包</h3>
                <p>生成各个平台的执行文件或App包，分为测试版本（用于内部测试）和发布版本（公测或正式发布）。</p>
                <div>游戏图标：
                    { this.state.iconExist ?
                        <span>已上传 <Tooltip title={<img src={this.state.iconUrl} style={{width: 96,height: 96}}/>} trigger="hover">
                            <a>查看</a>
                        </Tooltip> <a onClick={this.handleResetIcon}>重新上传</a></span>
                        : <Uploader name='icon' accept='image/*' gameid={this.props.params.id} policy={API.Dev.Package.icon} onSuccess={() => this.componentWillMount()}/>
                    }
                </div>
                <div>游戏资源：
                    { this.state.arcExist ?
                        <span>已上传 （MD5：{this.state.arcMd5}） <a onClick={this.handleResetArc}>重新上传</a></span>
                        : <Uploader name='arc' accept='image/*' gameid={this.props.params.id} policy={API.Dev.Package.arc} onSuccess={() => this.componentWillMount()}/>
                    }
                </div>
            </div>
        </div>
    }
});


const UploaderStyle = {
    display: 'flex',
    width: '100%'
}

const Uploader = React.createClass({
    getInitialState() {
        return {
            progress: 0,
            status: 'normal'    //exception
        }
    },
    handleSelect(e) {
        let input = ReactDOM.findDOMNode(this.refs.uploader);
        input.click();
    },
    handleFiles(e) {
        if (e.target.files && e.target.files.length) {
            let file = e.target.files[0];

            API.json('GET', this.props.policy, { gameid: this.props.gameid })
                .then(json => json.data)    //获取到的header数据
                .then(data => {
                    let formData = new FormData();
                    formData.append('OSSAccessKeyId', data.accessid);
                    formData.append('key', data.key);
                    formData.append('policy', data.policy);
                    formData.append('success_action_status', 200);
                    formData.append('signature', data.signature);
                    formData.append('file', file);
                    return new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest();
                        xhr.open('POST', window.location.protocol + '//' + data.host, true);
                        xhr.responseType = "document";
                        xhr.onload = (e) => {
                            switch (xhr.status) {
                                case 400: reject('文件大小超过限制'); break;
                                case 0: reject('上传被取消'); break;
                                case 200: resolve('上传成功'); break;
                                default: reject('未知错误');
                            }
                        }
                        xhr.onerror = (e) => {
                            reject('上传过程遇到问题');
                        }
                        xhr.upload.onprogress = (e) => {
                            this.setState({
                                status: 'active',
                                progress: Math.floor(e.loaded / e.total * 100)
                            })
                        }
                        xhr.send(formData);
                    })
                    // API.formData('POST', 'http://'+data.host, formData, false);
                })
                .then(msg => {
                    message.success(msg);
                    this.props.onSuccess && setTimeout(this.props.onSuccess, 800);
                })
                .catch(msg => {
                    this.setState({
                        progress: 70,
                        status: 'exception'
                    });
                    message.error(msg);
                })
        }
    },
    render() {
        return <span style={{ display: 'inline-block', width: 250 }}>
            <input type="file" name={this.props.name} ref='uploader' style={{ display: 'none' }}
                accept={this.props.accept} onChange={this.handleFiles}/>
            <a onClick={this.handleSelect} style={{ display: 'inline-block', width: 60, textAlign: 'center' }}>
                {(this.state.status === 'normal') ? '上传' : '上传中'}
            </a>
            <ProgressLine style={{ display: 'inline-block', width: 180, position: 'relative', left: 0 }} percent={this.state.progress} strokeWidth={5} status={this.state.status} />
        </span>
    }
});

export default Package;