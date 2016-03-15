import React from 'react';
import { Link } from 'react-router';

const Game = React.createClass({
    render() {
        return <div className='Game'>
            <Sidebar gameid={this.props.params.id}/>
            <div style={{backgroundColor: '#fff', height: '600px', width: '100%'}} />
        </div>
    }
});

const Sidebar = React.createClass({
    render() {
        return <nav className='Sidebar'>
            <ul>
                <li className='active'><Link to={`/game/${this.props.gameid}/index`}>概览</Link></li>
                <li><Link to={`/game/${this.props.gameid}/config`}>基本设置</Link></li>
                <li><Link to={`/game/${this.props.gameid}/update`}>更新</Link></li>
                <li><Link to={`/game/${this.props.gameid}/statistic`}>统计</Link></li>
            </ul>
        </nav>
    }
})

export default Game;