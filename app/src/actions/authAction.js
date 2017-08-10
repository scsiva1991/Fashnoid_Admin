'use strict';

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/actionTypes';
import * as constants from '../constants/messages';
import auth from '../api/auth';

export function loginSuccess( user ) {
  return {type: LOGIN_SUCCESS, user: result.data.user, message: constants.LOGIN_SUCCESS, status: constants.SUCCESS};
}

export function loginFailure( user ) {
  return {type: LOGIN_SUCCESS, user: result.data.user, message: constants.LOGIN_FAILURE, status: constants.FAILURE};
}

export const login = (user = {}) => {
  return dispatch => {
    return auth.loginUser(user).then(res => {
      console.log('###res', res)
      const token = res.data.token;
      localStorage.setItem('fashnoidSession', token);
    }).catch(error => {
      dispatch(loginFailure(error));
    });
  }
};
