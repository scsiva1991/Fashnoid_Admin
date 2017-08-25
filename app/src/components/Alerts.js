import React, { Component } from 'react';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';

export default class Alerts extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }

  render() {
    return (
      
    )
  }
}
