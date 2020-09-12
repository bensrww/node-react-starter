import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { TEAM_NUMBER } from './constants';

const { TEAM_2, TEAM_3 } = TEAM_NUMBER;
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/t2">
          <App teamNumber={TEAM_2} />
        </Route>
        <Route exact path="/t3">
          <App teamNumber={TEAM_3} />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
