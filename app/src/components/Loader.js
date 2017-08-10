import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div id="overlay" >
        <div id="loader"></div>
      </div>
    )
  }
}
