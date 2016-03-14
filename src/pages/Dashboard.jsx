import React from 'react';
import Auth from '../Common/Auth';


const Dashboard = React.createClass({
    getInitialState() {
        return {
            authed: Auth.isAuthed()
        }
    },
    componentDidUpdate() {
        this.setState({
            authed: Auth.isAuthed()
        })
    },
    render() {
        return <div>
            {this.props.children}
        </div>
    }
})

export default Dashboard;