"use strict";

import * as types from '../constants/actionTypes';
import initialState from './initialState';

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign(state, action.user);
    default:
      return state;
  }
}

export default auth;
