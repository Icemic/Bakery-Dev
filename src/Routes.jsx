import React from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, hashHistory} from 'react-router';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Routes = React.createClass({
    getInitialState() {
        return {
            loggedIn: false
        }
    },
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App} >
                    {this.state.loggedIn ? 
                        <IndexRedirect to="dashboard" /> :      
                        <IndexRedirect to="login" />
                    }
                    <Route path="login" component={Login} />
                    <Route path="dashboard" component={Dashboard} />
                </Route>
            </Router>
        );
    }
});

export default Routes;