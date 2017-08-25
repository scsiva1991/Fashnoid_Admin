"use strict";

import * as types from '../constants/actionTypes';
import initialState from './initialState';

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, user: action.user, status: action.status, message: action.message, isLoading: false, isLoggedIn: true };
    case types.LOGIN_FAILURE:
      return {...state, message: action.message, status: action.status, isLoading: false };
    case types.SET_LOGGED_IN:
      return {...state, isLoggedIn: action.isLoggedIn, isLoading: false };
    case types.UPDATE_LOGIN_FORM:
      return {
        ...state,
        credentials : Object.assign({},state.credentials, {[action.key]: action.value})
      };
    case types.CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        status: ''
      }
    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.message,
        status: action.status
      }
    case types.LOGIN_REQUEST:
      return  {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

export default auth;
