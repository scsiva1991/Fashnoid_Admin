'use strict';

import * as types from '../constants/actionTypes';
import * as constants from '../constants/messages';
import seller from '../api/seller';

export function clearMessage() {
  return { type: types.CLEAR_MESSAGE};
}

export function setLoggedIn( isLoggedIn ) {
  return { type: types.SET_LOGGED_IN, isLoggedIn };
}

export function setMessage( message, status ) {
  return { type: types.SET_MESSAGE, message: message, status: status };
}

export function sellerRequest( ) {
  return { type: types.SELLER_DETAIL_REQUEST };
}

export function loginFailure( message ) {
  return {type: types.LOGIN_FAILURE, user: {}, message: message, status: constants.FAILURE};
}

export function updateSellerDetail(  key, value ) {
  return { type: types.UPDATE_SELLER_DETAIL, key, value };
}

export function updateSellerProfileImage( file,  url ) {
  return { type: types.UPDATE_SELLER_PROFILE_IMAGE, file, url };
}

export function saveSellerDetailSuccess( sellerDetail ) {
  return {type: types.ADD_SELLER_DETAIL_SUCCESS, sellerDetail: sellerDetail,
          message: constants.SAVE_SELLER_DETAIL_SUCCESS, status: constants.SUCCESS};
}

export function saveSellerDetailFailure() {
  return {type: types.ADD_SELLER_DETAIL_FAILURE,
      message: constants.SAVE_SELLER_DETAIL_FAILURE, status: constants.FAILURE};
}

export function getSellerListSuccess( data ) {
  return {type: types.GET_SELLER_DETAILS_SUCCESS, sellerDetails: data };
}

export function getSellerListFailure( ) {
  return {type: types.GET_SELLER_DETAILS_FAILURE, sellerDetails: [] };
}

export const saveSellerDetails = (sellerDetail, profileImage) => {
  return dispatch => {
    dispatch(sellerRequest());
    return seller.saveSellerDetail(sellerDetail, profileImage).then(res => {
      if( res.message === 'Network Error' ) {
        localStorage.removeItem('fashnoidSession');
        localStorage.removeItem('fashnoidUser');
        return dispatch(loginFailure('Session Expired'));
      }

      if( res.response && res.response.status == 500 ) {
        return dispatch(saveSellerDetailFailure());
      }
      dispatch(saveSellerDetailSuccess(res.data));
      setTimeout( function(){
        dispatch(clearMessage());
      }, 2000);
    }).catch(error => {

      console.log('---- errorres ----', error );
      dispatch(saveSellerDetailFailure());
    });
  }
};

export const getSellerList = ( page ) => {
  return dispatch => {
    dispatch(sellerRequest());
    return seller.getSellerList(page).then(res => {
      console.log(res.message);
      if( res.message == 'Network Error' ) {
        localStorage.removeItem('fashnoidSession');
        localStorage.removeItem('fashnoidUser');
        return dispatch(loginFailure('Session Expired'));
      }

      if( res.response && res.response.status == 500 ) {
        return dispatch(getSellerListFailure());
      }
      console.log( res.data );
      dispatch(getSellerListSuccess(res.data));
    }).catch(error => {

      console.log('---- errorres ----', error );
      dispatch(getSellerListFailure());
    });
  }
}
