import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sellerReducer from './sellerReducer';

const rootReducer = combineReducers({
  authReducer,
  sellerReducer
})

export default rootReducer
