import React from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory} from 'react-router';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Config from './components/Config';
import Auth from './Common/Auth';
import User from './Common/User';

const Routes = React.createClass({
    getInitialState() {
        return {
            
        }
    },
    handleDashboardEnter(nextState, replace, callback) {
        Auth.check()
        .then((userid) => {
            if (!userid){
                replace('/login');
                callback();
                return
            }
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
        });
    },
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App} onEnter={this.handleDashboardEnter}>
                    <IndexRedirect to="dashboard" />
                    <Route path="login" component={Login} />
                    <Route path="dashboard" component={Dashboard} />
                    <Route path='config' component={Config} />
                </Route>
            </Router>
        );
    }
});

export default Routes;