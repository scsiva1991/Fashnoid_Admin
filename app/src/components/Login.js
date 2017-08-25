"use strict";

import React, { PropTypes, Component } from 'react';
import TextInput from './TextInput';
import { connect } from 'react-redux';
import { login } from '../actions/authAction';
import { withRouter, Link, Redirect } from 'react-router-dom';
import Loader from './Loader';
import Alert from 'react-s-alert';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authAction';

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
          credentials: {
              email: '',
              password: ''
          },
          errors: {},
          isLoading: false,
          isLoggedIn : false,
          message: '',
          status: ''
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    const isAuthenticated = () => localStorage.getItem('fashnoidSession') != null ? true : false;
    if( isAuthenticated() ) {
      this.setState({ isLoggedIn: true });
    }
  }

  onChange(event) {
      const credentials = this.state.credentials;
      credentials[event.target.name] = event.target.value;
      return this.setState({ credentials: credentials });
  }

  onSave(event) {

      event.preventDefault();
      this.setState({isLoading: true});
      this.props.login(this.state.credentials)
          .then((res) => {
              console.log('!!!!!!!!!!', res);
              setTimeout(function() {
                this.setState({ isLoggedIn: true, isLoading: false, });
              }.bind(this), 3000);
              Alert.success('Logged In Successfully', {
                 position: 'top',
                 effect: 'bouncyflip'
              });
          }, (err) => {
            console.log('&&&!!!', err);
             this.setState({isLoading: false, message: 'error', status: 'ERROR'});
              Alert.error('Error', {
                     position: 'top',
                     effect: 'bouncyflip'
                 });
          });
      return false;
  }

  render() {
      console.log('!!',this.props);
      const { errors, email, password, isLoading, isLoggedIn } = this.state;

      if( isLoggedIn ) {
        return (
          <Redirect to={'/dashboard'} />
        )
      }
      return (
          <div>
            <Alert stack={true} timeout={2000} />
            { isLoading && <Loader/> }
            <div className="wrapper col-md-4 col-md-offset-4">
                <form className="form-signin" onSubmit={this.onSave}>
                    <h1 className="form-signin-heading">FASHNOID</h1>
                    {errors && errors.msg && <div className="alert alert-danger">{errors.msg}</div>}
                    <TextInput
                        name="email"
                        label="Email"
                        type="email"
                        value={this.state.credentials.email}
                        error={errors.email && errors.email.msg}
                        placeholder="Eg rob@gmail.com"
                        onChange={this.onChange} />

                    <TextInput
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.credentials.password}
                        placeholder="Password"
                        error={errors.password && errors.password.msg}
                        onChange={this.onChange} />

                    <input
                        type="submit"
                        className="btn btn-lg btn-primary btn-block" />
                </form>
            </div>
          </div>
        );

  }

}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  status: state.authReducer.status
})

export default withRouter(connect(mapStateToProps, { login })(Login));
