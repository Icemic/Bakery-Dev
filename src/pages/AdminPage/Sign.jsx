import React from 'react';
import { Table, Modal, Button, Popconfirm, message } from 'antd';
import FormModal from '../../Components/FormModal';
import Admin from '../../Common/Admin';

const Sign = React.createClass({
    render() {
        return <div className='GamePage'>
            <SignList gameid={this.props.params.id} />
        </div>
    }
})

function columns(self) {
    return ([{
        title: '游戏',
        dataIndex: 'game',
        key: 'game',
        width: 200
    }, {
        title: '作者',
        dataIndex: 'user',
        key: 'user'
    }, {
        title: '小组',
        dataIndex: 'group',
        key: 'group',
    }, {
        title: '小组别名',
        dataIndex: 'groupAlias',
        key: 'groupAlias'
    }, {
        title: '游戏别名',
        dataIndex: 'gameAlias',
        key: 'gameAlias'
    }, {
        title: '状态',
        // dataIndex: 'enabled',
        key: 'status',
        filters: [{
            text: '无签名',
            value: 'no'
        }, {
            text: '申请中',
            value: 'pending'
        }, {
            text: '已签名',
            value: 'done'
        }, {
            text: '已拒绝',
            value: 'rejected'
        }],
        onFilter: (value, record) => {
            return value === record.status;
        },
        render(text, record) {
            let ret;
            switch (record.status) {
                case 'no': ret = <span>无签名</span>;break;
                case 'pending': ret = <span style={{color: 'yellow'}}>申请中</span>;break;
                case 'rejected': ret = <span style={{color: 'red'}}>已拒绝</span>;break;
                case 'done': ret = <span style={{color: 'green'}}>已签名</span>;break;
                default: ret = <span style={{color: 'purple'}}>喵喵喵？</span>;break;
            }
            return ret;
        }
    }, {
        title: '操作',
        key: 'op',
        render(text, record) {
            return (
                <span data-version={record.version} data-gameid={record._id} data-enabled={record.enabled}>
                    <Popconfirm title="确定签发发布证书吗？" onConfirm={() => self.handleSign(record._id)} >
                        <a href="#">签名</a>
                    </Popconfirm>
                    <span className="ant-divider"></span>
                    <Popconfirm title="确定拒绝吗？" onConfirm={() => self.handleReject(record._id)}>
                        <a href="#">拒绝</a>
                    </Popconfirm>
                    <span className="ant-divider"></span>
                    <Popconfirm title="确定重置为未签名的状态吗？" onConfirm={() => self.handleReset(record._id)} >
                        <a href="#">重置</a>
                    </Popconfirm>
                </span>
            );
        }
    }])
}



const SignList = React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: []
        }
    },
    componentDidMount() {
        this.setState({ loading: true });
        Admin.getSignList()
        .then((json) => {
            this.setState({
                loading: false,
                data: json.list
            })
        })
        .catch((msg) => {
            console.warn(msg);
            // this.setState({
            //     loading: false
            // })
        })
    },
    handleSign(gameid) {
        Admin.postSignConfirm(gameid)
        .then(json => {
            this.componentDidMount();
            message.success(json.msg);
        })
        .catch(msg => message.error(msg));
    },
    handleReject(gameid) {
        Admin.postSignReject(gameid)
        .then(json => {
            this.componentDidMount();
            message.success(json.msg);
        })
        .catch(msg => message.error(msg));
    },
    handleReset(gameid) {
        Admin.postSignReset(gameid)
        .then(json => {
            this.componentDidMount();
            message.success(json.msg);
        })
        .catch(msg => message.error(msg));
    },
    render() {
        return <div className='GamePageBlock'>
            <h4>游戏证书签发及签名生成</h4>
            <Table columns={columns(this)} dataSource={this.state.data} 
            rowKey={record => record._id} size="middle" 
            locale={{emptyText: '不用看了是空的_(:з」∠)_'}}
            loading={this.state.loading} />
        </div>
    }
})



export default Sign;