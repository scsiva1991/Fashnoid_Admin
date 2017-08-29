import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from './history';

import LoginContainer from '../containers/LoginContainer';
import Dashboard from '../containers/Dashboard';
import SellerDetailContainer from '../containers/SellerDetailContainer';
import AddSellerContainer from '../containers/AddSellerContainer';

const isAuthenticated = () => localStorage.getItem('fashnoidSession') != null ? true : false;
console.log('@#', isAuthenticated());

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
  <Router history={history} >
    <div>
      <Route exact component={ LoginContainer } path="/" />
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <PrivateRoute path="/seller/new/:index" component={AddSellerContainer}/>
      <PrivateRoute path="/seller:id" component={SellerDetailContainer}/>
    </div>
  </Router>
);
