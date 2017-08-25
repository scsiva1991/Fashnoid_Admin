import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authAction';
import Loader from '../components/Loader';
import { Redirect } from 'react-router-dom';
import * as constants from '../constants/messages';

class LoginContainer extends Component {

  //To update form input values to user model
  onChange = (e) => {
    this.props.actions.updateLoginForm(e.target.name, e.target.value);
  }

  //Validate and submit the login form
  onSubmit = (e) => {
    e.preventDefault();
    const credentials = this.props.credentials;
    console.log(this.props.credentials);

    if( credentials.email == '' ) {
      //this.props.actions.showAlert( constants.ERROR_EMAIL, constants.ERROR );
      this.props.actions.setMessage( constants.INVALID_EMAIL, constants.FAILURE );
      return;
    }

    if( credentials.password == '' ) {
      //this.props.actions.showAlert( constants.ERROR_PASSWORD, constants.ERROR );
      this.props.actions.setMessage( constants.INVALID_PASSWORD, constants.FAILURE );
      return;
    }

    this.props.actions.login( credentials );
  }

  componentWillMount() {
    const isAuthenticated = () => localStorage.getItem('fashnoidSession') != null ? true : false;
    if( isAuthenticated() ) {
      this.props.actions.setLoggedIn( true );
    }
  }

  render() {
    const { credentials, isLoading, status, message, isLoggedIn } = this.props

    if( isLoggedIn ) {
      return (<Redirect to="/dashboard" />)
    }

    return(
      <div className="login-container">
         { isLoading && <Loader/> }
        {message != "" && status == "FAILURE" && <div className="alert alert-danger">{message}</div>}
        {message != "" && status == "SUCCESS" && <div className="alert alert-success">{message}</div>}
        <LoginForm credentials={credentials} onSubmit={this.onSubmit} onChange={this.onChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  credentials: state.authReducer.credentials,
  isLoading: state.authReducer.isLoading,
  status: state.authReducer.status,
  message: state.authReducer.message,
  isLoggedIn: state.authReducer.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
