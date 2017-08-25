'use strict';

import * as types from '../constants/actionTypes';
import * as constants from '../constants/messages';
import auth from '../api/auth';

export function loginSuccess( user ) {
  return {type: types.LOGIN_SUCCESS, user: user, message: constants.LOGIN_SUCCESS, status: constants.SUCCESS};
}

export function loginFailure( message ) {
  return {type: types.LOGIN_FAILURE, user: {}, message: message, status: constants.FAILURE};
}

export function updateLoginForm( key, value ) {
  return { type: types.UPDATE_LOGIN_FORM, key, value };
}

export function setLoggedIn( isLoggedIn ) {
  return { type: types.SET_LOGGED_IN, isLoggedIn };
}

export function loginRequest( ) {
  return { type: types.LOGIN_REQUEST };
}

export function clearMessage() {
  return { type: types.CLEAR_MESSAGE};
}

export function setMessage( message, status ) {
  return { type: types.SET_MESSAGE, message: message, status: status };
}

export const setUser = (credentials = {}) => {
  return dispatch => {
    return auth.loginUser(credentials).then(res => {
      if( res.response && res.response.status === 500 ) {
        return dispatch(loginFailure(res.response.data.message ));
      }
      localStorage.setItem('fashnoidUser', JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
    }).catch(error => {
      dispatch(loginFailure(error));
    });
  }
};

export const login = (credentials = {}) => {
  return dispatch => {
    dispatch(loginRequest());
    return auth.getOauthToken(credentials).then(res => {
      console.log(res, res.response)

      if( res.response && res.response.status == 400 ) {
        return dispatch(loginFailure('Invalid credentials'));
      }
      const token = res.data.access_token;
      localStorage.setItem('fashnoidSession', token);
      dispatch(setUser(credentials));
    }).catch(error => {
      dispatch(loginFailure(error));
    });
  }
};
