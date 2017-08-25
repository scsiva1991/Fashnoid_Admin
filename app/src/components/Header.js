import React, { Component } from 'react';

export default class Header extends Component {

  
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Fashnoid</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <p className="navbar-text navbar-right">
              <i className="fa fa-sign-out"></i>
            </p>
          </div>
        </div>
      </nav>
    )
  }
}
