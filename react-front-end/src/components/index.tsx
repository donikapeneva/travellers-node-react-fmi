import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import { Router } from 'react-router-dom';
import { routingHistory } from '../history';

ReactDOM.render(
  <Router history={routingHistory}>
    <App />
  </Router>,
  document.getElementById('app')
);
