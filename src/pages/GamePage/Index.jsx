import React from 'react';

import BaseInfo from '../../Components/BaseInfo';

const Index = React.createClass({
    displayName: 'GamePage.Index',
    render() {
        return <div className='GamePage'>
            <BaseInfo gameid={this.props.params.id}/>
        </div>
    }
});

export default Index;