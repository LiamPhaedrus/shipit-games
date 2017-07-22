import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import HomePage from './containers/HomePage';

const Root = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomePage} />
    </Router>
  )
}

export default Root
