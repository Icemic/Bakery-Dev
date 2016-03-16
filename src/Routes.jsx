import React from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory} from 'react-router';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Config from './pages/Config';
import AddGame from './pages/AddGame';
import Game from './pages/Game';
import Auth from './Common/Auth';
import User from './Common/User';

const Routes = React.createClass({
    getInitialState() {
        return {
            
        }
    },
    needConfig(nextState, replace, callback) {
        User.load()
        .then(() => {
            let { name } = User.getConfig();
            if (!name && nextState.location.pathname !== '/config') {
                replace('/config');
                callback();
            }
            else
                callback();
        });
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
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App} onEnter={this.needLogin} >
                    <IndexRedirect to="dashboard" />
                    <Route path="login" component={Login} />
                    <Route path='config' component={Config} />
                    <Route path='addGame' component={AddGame} onEnter={this.needConfig} />
                    <Route path="dashboard" component={Dashboard} onEnter={this.needConfig} />
                    <Route path='/game/:id' component={Game} onEnter={this.needConfig} />
                </Route>
            </Router>
        );
    }
});

export default Routes;