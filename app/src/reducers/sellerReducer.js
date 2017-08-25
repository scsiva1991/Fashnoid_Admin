"use strict";

import * as types from '../constants/actionTypes';
import initialState from './initialState';

const seller = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SELLER_DETAILS_SUCCESS:
      console.log( action.sellerDetails )
      return {
        ...state,
          sellerDetails: action.sellerDetails,
        isLoading: false
      }
    case types.ADD_SELLER_DETAIL_SUCCESS:
      return { ...state,

                status: action.status,
                message: action.message,
                isLoading: false,
                sellerDetail: initialState.sellerDetail,
                sellerImagePreviewUrl: ''
             };
     case types.ADD_SELLER_DETAIL_FAILURE:
       return { ...state,
                 status: action.status,
                 message: action.message,
                 isLoading: false
              };
    case types.UPDATE_SELLER_DETAIL:
      return {
        ...state,
        sellerDetail : Object.assign({},state.sellerDetail, {[action.key]: action.value})
      };
    case types.UPDATE_SELLER_PROFILE_IMAGE:
      return {
        ...state,
        sellerProfileImg : Object.assign({},state.sellerDetail, {sellerImagePreviewUrl: action.url, file: action.file})
      };
    case types.LOGIN_FAILURE:
      return {...state, message: action.message, status: action.status, isLoading: false, isLoggedIn: false };
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
    case types.SELLER_DETAIL_REQUEST:
      return  {
        ...state,
        isLoading: true
      };
    case types.SET_LOGGED_IN:
      return {...state, isLoggedIn: action.isLoggedIn, isLoading: false };
    default:
      return state;
  }
}

export default seller;
