import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from './history'; 

import Login from '../components/Login';
import Dashboard from '../containers/Dashboard';

const isAuthenticated = () => localStorage.getItem('fashnoidSession') != null ? true : false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  )}/>
)

export default (
  <Router history={history}>
    <div>
      <Route exact component={ Login } path="/" />
      <PrivateRoute path="/dashboard" component={Dashboard}/>
    </div>
  </Router>
);
