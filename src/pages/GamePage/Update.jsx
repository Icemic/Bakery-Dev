import React from 'react';
import { Table, Modal, Button } from 'antd';
import FormModal from '../../Components/FormModal';
import Dev from '../../Common/Dev';

const Update = React.createClass({
    render() {
        return <div className='GamePage'>
            <UpdateList gameid={this.props.params.id} />
        </div>
    }
})

function columns(self) {
    return ([{
        title: '标题',
        dataIndex: 'title',
        key: 'title'
    }, {
        title: '版本号',
        dataIndex: 'version',
        key: 'version'
    }, {
        title: '发布时间',
        key: 'date',
        render(text, record) {
            return record.date.toString().replace(/^(.+?)T(.+?)\.\d+Z$/, '$1 $2')
        }
    }, {
        title: '已请求次数',
        dataIndex: 'checkTimes',
        key: 'checkTimes'
    }, {
        title: '状态',
        // dataIndex: 'enabled',
        key: 'enabled',
        render(text, record) {
            return record.enabled?<span style={{color: 'green'}}>启用</span>:<span style={{color: 'red'}}>停用</span>
        }
    }, {
        title: '操作',
        key: 'op',
        render(text, record) {
            return (
                <span data-version={record.version} data-updateid={record._id} data-enabled={record.enabled}>
                    <a href="#" onClick={self.handleEnable}>{record.enabled?'停用':'启用'}</a>
                    <span className="ant-divider"></span>
                    <a href="#" onClick={self.handleEdit}>编辑</a>
                    <span className="ant-divider"></span>
                    <a href="#" onClick={self.handleDelete}>删除</a>
                </span>
            );
        }
    }])
}



const UpdateList = React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: []
        }
    },
    componentDidMount() {
        this.setState({ loading: true });
        Dev.getUpdates(this.props.gameid)
        .then((json) => {
            this.setState({
                loading: false,
                data: json.updates
            })
        })
        .catch((msg) => {
            console.warn(msg);
            // this.setState({
            //     loading: false
            // })
        })
    },
    handleEnable(e) {
        e.preventDefault();
        let enabled = e.target.parentNode.getAttribute('data-enabled') === 'true';
        let updateid = e.target.parentNode.getAttribute('data-updateid');
        Modal.confirm({
            title: `${enabled?'停用':'启用'}更新：版本号 ${e.target.parentNode.getAttribute('data-version')}`,
            content: `${enabled?'此更新的后续更新将一同停用':'此更新的历史更新将会一同启用'}，确定操作吗？`,
            onOk: (close) => {
                Dev.patchUpdate({
                    gameid: this.props.gameid,
                    updateid: updateid,
                    enabled: !enabled
                })
                .then((json) => {
                    this.componentDidMount();
                    close();
                })
                .catch(() => close());
            }
        })
    },
    handleEdit(e) {
        e.preventDefault();
        let updateid = e.target.parentNode.getAttribute('data-updateid');
        Dev.getUpdate(this.props.gameid, updateid)
        .then((json) => {
            FormModal({
                fields: [{
                    label: '标题：',
                    type: 'text',
                    placeholder: '标题',
                    name: 'title',
                    required: true
                }, {
                    label: '介绍：',
                    type: 'textarea',
                    placeholder: '详细填写更新内容',
                    name: 'intro',
                    required: false
                }, {
                    label: '直链地址：',
                    type: 'url',
                    placeholder: '可供游戏内直接下载的文件外链',
                    name: 'url',
                    required: true
                }, {
                    label: '手动下载：',
                    type: 'url',
                    placeholder: '弹出的下载页面链接地址',
                    name: 'fallback',
                    required: false
                }],
                defaultData: json.update,
                onOk: (error, close, json) => {
                    Dev.patchUpdate({
                        gameid: this.props.gameid,
                        updateid: updateid,
                        ...json
                    })
                    .then((json) => {
                        close();
                        this.componentDidMount();
                    })
                    .catch(msg => error(msg));
                }
            });
        })
        

    },
    handleDelete(e) {
        e.preventDefault();
        let updateid = e.target.parentNode.getAttribute('data-updateid');
        Modal.confirm({
            title: `删除更新：版本号 ${e.target.parentNode.getAttribute('data-version')}`,
            content: `此更新的后续更新将一同删除，确定操作吗？`,
            onOk: (close) => {
                Dev.deleteUpdate({
                    gameid: this.props.gameid,
                    updateid: updateid,
                })
                .then((json) => {
                    this.componentDidMount();
                    close();
                })
                .catch(() => close());
            }
        })
    },
    render() {
        return <div className='GamePageBlock'>
            <h4>游戏更新</h4>
            <Button type='ghost' style={{float: 'right'}}>添加更新</Button>
            <p>游戏更新方式为迭代更新，当某个版本的更新停用时，其后续更新也会自动停用；当某个版本的更新启用时，其历史版本也会自动启用。</p>
            <Table columns={columns(this)} dataSource={this.state.data} 
            rowKey={record => record._id} expandedRowRender={record => <p>{record.intro}</p>}
            locale={{emptyText: '还没有添加更新_(:з」∠)_'}}
            loading={this.state.loading} />
        </div>
    }
})



export default Update;