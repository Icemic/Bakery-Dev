import React from 'react';
import { Link } from 'react-router'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Auth from '../Common/Auth';
import User from '../Common/User';

/**
 * 登录前的导航栏
 */
export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'index'
        }
    }
    render() {
        return (
            <Menu onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                theme={this.state.theme}
                mode="horizontal">
                <Menu.Item key="alipay"><Icon type="appstore" /></Menu.Item>
                <Menu.Item key="login" className='float-right'><Link to='/login'>登录</Link></Menu.Item>
                <Menu.Item key="register" className='float-right'>注册</Menu.Item>
            </Menu>
        )
    }
}

/**
 * 登录后的导航栏
 */
export class SubNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'index',
            email: User.getConfig().email
        }
    }
    handleClick(item) {
        if (item.key === 'logout')
            Auth.logout()
            .then(() => window.location = '/');
    }
    render() {
        let { email } = this.state;
        return (
            <Menu onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                theme={this.state.theme}
                mode="horizontal">
                <Menu.Item key="alipay"><Icon type="appstore" /></Menu.Item>
                <Menu.Item key="dashboard">面板</Menu.Item>
                <Menu.Item key="help">帮助</Menu.Item>
                <SubMenu title={<span><Icon type="user" />{email || '啊哈哈'}</span>} className='float-right'>
                    <Menu.Item key="config"><Link to='/config'><Icon type="setting" />设置</Link></Menu.Item>
                    <Menu.Item key="logout"><Icon type="logout" />登出</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}