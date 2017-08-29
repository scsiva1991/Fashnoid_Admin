import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

export default class Alert extends Component {
  constructor(props){
    super(props);
    this.state = {
      delay: 2000
    }
  }

  static propTypes = {
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    hideAlert: PropTypes.func.isRequired
  }

  setTimer() {
    this.timer != null ? clearTimeout(this.timer) : null;
    this.timer = setTimeout(function() {
      this.timer = null;
      this.props.hideAlert();
    }.bind(this), 2000);
  }

  componentWillReceiveProps( nextProps ) {
    this.setTimer();
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    let { status, message } = this.props;

    if( status === 'FAILURE' && message != "") {
      return (
        <div className="alert alert-danger">{message}</div> 
      )
    }
    if( message != "" ) {
      return (
        <div className="alert alert-success">{message}</div>
      )
    }
    return <div></div>;
  }
}
