require('babel-polyfill');
require('whatwg-fetch');
import './style/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

ReactDOM.render( <Routes />, document.getElementById('page'));
