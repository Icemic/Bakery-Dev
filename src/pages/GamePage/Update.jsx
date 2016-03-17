import React from 'react';
import { Table } from 'antd';
import Dev from '../../Common/Dev';

const Update = React.createClass({
    render() {
        return <div className='GamePage'>
            <UpdateList gameid={this.props.params.id} />
        </div>
    }
})

const columns = [{
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
        return record.enabled?'启用':'未启用'
    }
}, {
    title: '操作',
    key: 'op',
    render(text, record) {
        return (
            <span>
                <a href="#">{record.enabled?'停用':'启用'}</a>
                <span className="ant-divider"></span>
                <a href="#">编辑</a>
                <span className="ant-divider"></span>
                <a href="#">删除</a>
            </span>
        );
    }
}]

const UpdateList = React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: []
        }
    },
    componentDidMount() {
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
    render() {
        return <div className='GamePageBlock'>
            <h4>游戏更新</h4>
            <p>游戏更新方式为迭代更新，当某个版本的更新停用时，其后续更新也会自动停用；当某个版本启用时，其之前版本也会自动启用。</p>
            <Table columns={columns} dataSource={this.state.data} 
            rowKey={record => record._id} expandedRowRender={record => <p>{record.intro}</p>}
            locale={{emptyText: '(空)'}}
            loading={this.state.loading} />
        </div>
}
})

export default Update;