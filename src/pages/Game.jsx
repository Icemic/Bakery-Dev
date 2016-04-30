import React from 'react';
import { Link } from 'react-router';

const Game = React.createClass({
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
            <Sidebar gameid={this.props.params.id} currentTab={this.state.currentTab} />
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
                <Link to={`/game/${this.props.gameid}/index`}><li className={currentTab==='index'?'active':null}>概览</li></Link>
                <Link to={`/game/${this.props.gameid}/update`}><li className={currentTab==='update'?'active':null}>更新</li></Link>
                <Link to={`/game/${this.props.gameid}/package`}><li className={currentTab==='package'?'active':null}>打包</li></Link>
                <Link to={`/game/${this.props.gameid}/#statistic`}><li className={currentTab==='statistic'?'active':null}>统计</li></Link>
            </ul>
        </nav>
    }
})

export default Game;