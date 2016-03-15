import React from 'react';
import { Link } from 'react-router';
import Auth from '../Common/Auth';
import Dev from '../Common/Dev';


const Dashboard = React.createClass({
    getInitialState() {
        return {
            games: []
        }
    },
    componentDidMount() {
        Dev.getGames()
        .then((games) => {
            this.setState({ games: games })
        });
    },
    render() {
        return <div>
            <GameContainer>
                {this.state.games.map((game, index) => {
                    return <Link to={'/game/'+game._id} key={index}><GameItem {...game}/></Link>
                })}
            </GameContainer>
        </div>
    }
});

const GameContainer = React.createClass({
    render() {
        return <div className='GameContainer'>
            {this.props.children}
        </div>
    }
})

const GameItem = React.createClass({
    render() {
        let date = new Date(this.props.date);
        let dateString = `${date.getFullYear()}.${padStart(date.getUTCMonth()+1, 2, '0')}.${padStart(date.getDate(), 2, '0')}`;
        return <div className="GameItem">
            <h4>{this.props.name}</h4>
            <p>点击查看详细</p>
            <small>{dateString}</small>
        </div>
    }
})


function padStart(string, num, char) {
    string = '' + string;
    if (string.length < num)
        string = char.repeat((num - string.length)/char.length) + string;
    return string;
}
export default Dashboard;