import React from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory} from 'react-router';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterConfirm from './pages/RegisterConfirm';
import Dashboard from './pages/Dashboard';
import Config from './pages/Config';
import MobileConfig from './pages/MobileConfig';
import AddGame from './pages/AddGame';

import Game from './pages/Game';
import GameIndex from './pages/GamePage/Index';
import GameUpdate from './pages/GamePage/Update';
import GamePackage from './pages/GamePage/Package';

import Admin from './pages/Admin';
import AdminIndex from './pages/AdminPage/Index';
import AdminSign from './pages/AdminPage/Sign';

import Auth from './Common/Auth';
import User from './Common/User';
import API from './Common/API';

const Routes = React.createClass({
    getInitialState() {
        return {

        }
    },
    needConfig(nextState, replace, callback) {
        User.load()
        .then(async () => {
            let { name } = User.getConfig();
            if (!name && nextState.location.pathname !== '/config') {
                replace('/config');
                callback();
            }
            else {
                let json = await API.json('GET', API.Dev.mobileConfig);
                if (!json.mobile && nextState.location.pathname !== '/config/mobile') {
                    replace('/config/mobile');
                    callback();
                }
                else {
                    callback();
                }
            }
        })
    },
    needLogin(nextState, replace, callback) {
        Auth.check()
        .then((userid) => {
            if (!userid && nextState.location.pathname !== '/login'){
                replace('/login');
            }
            callback();
        });
    },
    needAdmin(nextState, replace, callback) {
        Auth.checkAdmin()
        .then(() => callback())
        .catch(() => {
            replace('/');
            callback();
        });
    },
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App} onEnter={this.needLogin} >
                    <IndexRedirect to="dashboard" />
                    <Route path="login" component={Login} />
                    <Route path='config' component={Config} onEnter={(a,b,cb) => User.load().then(cb)}/>
                    <Route path='config/mobile' component={MobileConfig} onEnter={null}/>
                    <Route path='addGame' component={AddGame} onEnter={this.needConfig} />
                    <Route path="dashboard" component={Dashboard} onEnter={this.needConfig} />
                    <Route path='/game/:id' component={Game} onEnter={this.needConfig} >
                        <IndexRedirect to='index' />
                        <Route path='index' component={GameIndex} />
                        <Route path='update' component={GameUpdate} />
                        <Route path='package' component={GamePackage} />
                    </Route>
                    <Route path='/admin' component={Admin} onEnter={this.needAdmin} >
                        <IndexRedirect to='index' />
                        <Route path='index' component={AdminIndex} />
                        <Route path='sign' component={AdminSign} />
                    </Route>
                </Route>
                <Route path="register" component={Register} />
                <Route path="register/:key" component={RegisterConfirm} />
            </Router>
        );
    }
});

export default Routes;
