import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import HomePage from './containers/HomePage';
import WarPage from './containers/Warpage';

const Root = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomePage} />
      <Route path='/war' component={WarPage} />
    </Router>
  )
}

export default Root
