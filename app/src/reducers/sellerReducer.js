"use strict";

import * as types from '../constants/actionTypes';
import initialState from './initialState';
const sellerDetail = {
  "externalId": "",
  "description": "",
  "sellerName": "",
  "sellerProfile": "",
  "genderCategory": "MALE",
  "productCategory": "Shirt",
  "shopURL": "",
  "fbURL": "",
  "twitterURL": "",
  "instagramURL": "",
  "storeCategory": "ONLINE",
  "phone": "",
  "email": "",
  "address": "",
  "reviewCount": 0,
  "reviewValue": 0,
  "images": []
};

const seller = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SELLER_DETAILS_SUCCESS:
      console.log( action.sellerDetails )
      return {
        ...state,
          sellerDetails: action.sellerDetails,
        isLoading: false
      }
    case types.RESET_SELLER_DETAIL:
      return {
        ...state,
        sellerDetail: sellerDetail,
        isLoading: false
      }
    case types.ADD_SELLER_DETAIL_SUCCESS:
    case types.UPDATE_SELLER_DETAIL_SUCCESS:
      return { ...state,

                status: action.status,
                message: action.message,
                isLoading: false,
                sellerDetail: action.sellerDetail,
                sellerImagePreviewUrl: ''
             };
     case types.SAVE_SELLER_PRODUCT_SUCCESS:
       return { ...state,

                 status: action.status,
                 message: action.message,
                 isLoading: false,
                 sellerDetail: action.sellerDetail,
                 sellerImagePreviewUrl: ''
              };
     case types.UPDATE_SELLER_DETAIL_FAILURE:
     case types.SAVE_SELLER_PRODUCT_FAILURE:
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
    case types.DELETE_SELLER_DETAIL_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.status,
        isLoading: false
      }
    case types.DELETE_SELLER_DETAIL_SUCCESS:
      let sellerDetails = state.sellerDetails;
      let filteredSellerDetails = sellerDetails.filter( function(seller) {
        return seller.externalId != action.id;
      })
      return {
        ...state,
        message: action.message,
        status: action.status,
        isLoading: false,
        sellerDetails: filteredSellerDetails
      }
    default:
      return state;
  }
}

export default seller;
