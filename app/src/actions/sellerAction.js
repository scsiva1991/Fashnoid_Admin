'use strict';

import * as types from '../constants/actionTypes';
import * as constants from '../constants/messages';
import seller from '../api/seller';

export function clearMessage() {
  return { type: types.CLEAR_MESSAGE};
}

export function resetSellerDetail() {
  return { type: types.RESET_SELLER_DETAIL};
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

export function saveSellerProductSuccess( sellerDetail ) {
  return {type: types.SAVE_SELLER_PRODUCT_SUCCESS, sellerDetail: sellerDetail,
          message: constants.SAVE_SELLER_PRODUCT_SUCCESS, status: constants.SUCCESS};
}

export function saveSellerProductFailure() {
  return {type: types.SAVE_SELLER_PRODUCT_FAILURE,
      message: constants.SAVE_SELLER_PRODUCT_FAILURE, status: constants.FAILURE};
}

export function updateSellerDetailSuccess( sellerDetail ) {
  return {type: types.UPDATE_SELLER_DETAIL_SUCCESS, sellerDetail: sellerDetail,
          message: constants.UPDATE_SELLER_DETAIL_SUCCESS, status: constants.SUCCESS};
}

export function updateSellerDetailFailure() {
  return {type: types.UPDATE_SELLER_DETAIL_FAILURE,
      message: constants.UPDATE_SELLER_DETAIL_FAILURE, status: constants.FAILURE};
}

export function getSellerListSuccess( data ) {
  return {type: types.GET_SELLER_DETAILS_SUCCESS, sellerDetails: data };
}

export function getSellerListFailure( ) {
  return {type: types.GET_SELLER_DETAILS_FAILURE, sellerDetails: [] };
}

export function deleteSellerDetailSuccess(id) {
  return {type: types.DELETE_SELLER_DETAIL_SUCCESS, message: constants.DELETE_SELLER_DETAIL_SUCCESS,
    status: constants.SUCCESS , id: id };
}

export function deleteSellerDetailFailure( ) {
  return {type: types.DELETE_SELLER_DETAIL_FAILURE, status: constants.FAILURE,
  message: constants.DELETE_SELLER_DETAIL_FAILURE };
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

export const updateSellerDetails = (sellerDetail, profileImage) => {
  return dispatch => {
    dispatch(sellerRequest());
    return seller.updateSellerDetail(sellerDetail, profileImage).then(res => {
      if( res.message === 'Network Error' ) {
        localStorage.removeItem('fashnoidSession');
        localStorage.removeItem('fashnoidUser');
        return dispatch(loginFailure('Session Expired'));
      }

      if( res.response && res.response.status == 500 ) {
        return dispatch(updateSellerDetailFailure());
      }
      dispatch(updateSellerDetailSuccess(res.data));
      setTimeout( function(){
        dispatch(clearMessage());
      }, 2000);
    }).catch(error => {

      console.log('---- errorres ----', error );
      dispatch(updateSellerDetailFailure());
    });
  }
};

export const saveSellerProduct = (sellerDetailId, imageFile) => {
  return dispatch => {
    dispatch(sellerRequest());
    return seller.createSellerProduct(sellerDetailId, imageFile).then(res => {
      if( res.message === 'Network Error' ) {
        localStorage.removeItem('fashnoidSession');
        localStorage.removeItem('fashnoidUser');
        return dispatch(loginFailure('Session Expired'));
      }

      if( res.response && res.response.status == 500 ) {
        return dispatch(saveSellerProductFailure());
      }
      dispatch(saveSellerProductSuccess(res.data));
      setTimeout( function(){
        dispatch(clearMessage());
      }, 2000);
    }).catch(error => {

      console.log('---- errorres ----', error );
      dispatch(saveSellerProductFailure());
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

export const deleteSeller = ( id ) => {
  return dispatch => {
    dispatch(sellerRequest());
    return seller.deleteSeller(id).then(res => {
      console.log(res);
      if( res.message == 'Network Error' ) {
        localStorage.removeItem('fashnoidSession');
        localStorage.removeItem('fashnoidUser');
        return dispatch(loginFailure('Session Expired'));
      }

      if( res.response && res.response.status == 500 ) {
        return dispatch(deleteSellerDetailFailure());
      }
      console.log( res.data );
      dispatch(deleteSellerDetailSuccess(id));
    }).catch(error => {

      console.log('---- errorres ----', error );
      dispatch(deleteSellerDetailFailure());
    });
  }
}
