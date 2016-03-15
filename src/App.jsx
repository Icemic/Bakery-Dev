import React from 'react';
import {Navigation, SubNavigation} from './Components/Navigation';
import Footer from './Components/Footer';
import Auth from './Common/Auth';

const App = React.createClass({
    getInitialState() {
        return {
            authed: Auth.isAuthed()
        }
    },
    render() {
        return <div>
            {this.state.authed ? 
                <SubNavigation /> :
                <Navigation />
            }
            {this.props.children}
            <Footer />
        </div>
    }
})

export default App;