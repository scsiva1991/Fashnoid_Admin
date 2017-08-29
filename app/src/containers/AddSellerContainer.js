import React, { Component } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import AddSellerDetails from '../components/AddSellerDetails';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/sellerAction';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { Redirect } from 'react-router-dom';
import * as constants from '../constants/messages';

class AddSellerContainer extends Component {

  constructor( props ) {
    super( props );
  }

  hideAlert = (e) => {
    this.props.actions.clearMessage();
  }

  onSubmit = ( sellerDetail, imageFile ) => {
    console.log(sellerDetail, imageFile);
    if( imageFile == null ) {
      this.props.actions.setMessage(" Please upload an image", 'FAILURE');
      return;
    }
    if( sellerDetail.sellerName == "" ) {
      this.props.actions.setMessage(" Seller Name is Required ", 'FAILURE');
      return;
    }
    this.props.actions.saveSellerDetails(sellerDetail, imageFile);
  }

  render() {

    const { sellerDetails, sellerProfileImg, isLoading, status, message, isLoggedIn } = this.props
    console.log(this.props.match.params.index, sellerDetails, message);

    let sellerDetail = {
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

    const index = this.props.match.params.index;

    if(  index > -1 ) {
      sellerDetail = sellerDetails[ index ];
    }

    if( !isLoggedIn ) {
      return (<Redirect to="/" />)
    }

    return(
      <div>
        <Header/>
        <ol className="breadcrumb">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li className="active">New Seller</li>
        </ol>
      { isLoading && <Loader/> }
      <Alert hideAlert={this.hideAlert} status={ status } message={ message }/>
      <AddSellerDetails sellerDetail={sellerDetail} onImageChange={this.onImageChange}
        onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  sellerDetails: state.sellerReducer.sellerDetails,
  sellerDetail: state.sellerReducer.sellerDetail,
  isLoading: state.sellerReducer.isLoading,
  status: state.sellerReducer.status,
  message: state.sellerReducer.message,
  isLoggedIn: state.sellerReducer.isLoggedIn,
  sellerProfileImg : state.sellerReducer.sellerProfileImg
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSellerContainer);
