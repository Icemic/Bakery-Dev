import React from 'react';
import { Link } from 'react-router';

const Admin = React.createClass({
    getInitialState() {
        return {
            currentTab: 'index'
        }
    },
    componentDidMount() {
        this.componentDidUpdate()
    },
    componentDidUpdate() {
        let pathname = this.props.location.pathname;
        let currentTab = pathname.slice(pathname.lastIndexOf('/')+1);
        if (currentTab !== this.state.currentTab)
            this.setState({ currentTab: currentTab })
    },
    render() {
        return <div className='Game'>
            <Sidebar currentTab={this.state.currentTab} />
            <div style={{width: '100%'}}>
                {this.props.children}
            </div>
        </div>
    }
});

const Sidebar = React.createClass({
    render() {
        let { currentTab } = this.props;
        return <nav className='Sidebar'>
            <ul>
                <Link to={`/admin/index`}><li className={currentTab==='index'?'active':null}>概览</li></Link>
                <Link to={`/admin/sign`}><li className={currentTab==='sign'?'active':null}>证书申请</li></Link>
            </ul>
        </nav>
    }
})

export default Admin;