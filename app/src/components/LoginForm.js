import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';

export default class LoginForm extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log('%%%%%%%');
  }

  static propTypes = {
    credentials: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    let {credentials, onChange, onSubmit} = this.props;
    return(
        <div className="wrapper col-md-4 col-md-offset-4">
          <form className="form-signin" onSubmit={onSubmit}>
            <h1 className="form-signin-heading">FASHNOID</h1>
            <TextInput
                name="email"
                label="Email"
                type="email"
                value={credentials.email}
                error=""
                placeholder="Eg admin@gmail.com"
                onChange={onChange} />
            <TextInput
                name="password"
                label="Password"
                type="password"
                value={credentials.password}
                placeholder="Password"
                error=""
                onChange={onChange} />
            <input
                type="submit"
                className="btn btn-lg btn-primary btn-block" value="LOGIN"/>
          </form>
        </div>
    )
  }
}
