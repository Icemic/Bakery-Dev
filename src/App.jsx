import React from 'react';
import {NavigationAuthed, NavigationUnauthed, NavigationGame} from './Components/Navigation';
import Footer from './Components/Footer';
import Auth from './Common/Auth';

const App = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            pathname: '',
            current: 'unauthed'
        }
    },
    componentWillMount() {
        this.switchCurrent();
    },
    componentDidUpdate(){
        this.switchCurrent()
    },
    switchCurrent() {
        let pathname = this.props.location.pathname;
        if (pathname === this.state.pathname)
            return true;
        if (pathname === '/login')
            this.setState({ current: 'unauthed', pathname: pathname});
        else if(pathname.startsWith('/game/'))
            this.setState({ current: 'game', pathname: pathname});
        else
            this.setState({ current: 'authed', pathname: pathname});
        return true;
    },
    render() {
        return <div className='App'>
            {this.state.current==='unauthed' ? 
                <NavigationUnauthed /> :
             this.state.current==='authed' ? 
                <NavigationAuthed /> :
                <NavigationGame name='test'/>
            }
            <div className='Container'>
            {this.props.children}
            </div>
            <Footer />
        </div>
    }
})

export default App;