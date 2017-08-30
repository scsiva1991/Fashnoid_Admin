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

    if( sellerDetail.externalId == "" && imageFile == null ) {
      this.props.actions.setMessage(" Please upload an image", 'FAILURE');
      return;
    }
    if( sellerDetail.sellerName == "" ) {
      this.props.actions.setMessage(" Seller Name is Required ", 'FAILURE');
      return;
    }
    if( sellerDetail.externalId != "") {
      this.props.actions.updateSellerDetails( sellerDetail, imageFile );
      return;
    }
    this.props.actions.saveSellerDetails(sellerDetail, imageFile);
  }

  onPdtImgSubmit = ( sellerDetail, pdtImages ) => {
    console.log( sellerDetail, pdtImages );
    let imageFiles = [];
    if( pdtImages.imageFile0 != null ) {
      imageFiles.push( pdtImages.imageFile0 );
      this.props.actions.saveSellerProduct(sellerDetail.externalId, pdtImages.imageFile0);
    }
    
    if( pdtImages.imageFile1 != null ) {
      imageFiles.push( pdtImages.imageFile1 );
      this.props.actions.saveSellerProduct(sellerDetail.externalId, pdtImages.imageFile1);
    }

    if( pdtImages.imageFile2 != null ) {
      this.props.actions.saveSellerProduct(sellerDetail.externalId, pdtImages.imageFile2);
    }

    if( pdtImages.imageFile3 != null ) {
      this.props.actions.saveSellerProduct(sellerDetail.externalId, pdtImages.imageFile3);
    }

    if( imageFiles.length === 0 ) {
      this.props.actions.setMessage(" Please upload an image", 'FAILURE');
      return;
    }

  }

  render() {

    let { sellerDetails, sellerDetail, sellerProfileImg, isLoading, status, message, isLoggedIn } = this.props

    const index = this.props.match.params.index;
    let updatePdt = false;

    if(  index > -1 ) {
      sellerDetail = sellerDetails[ index ];
      updatePdt = true;
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
        onSubmit={this.onSubmit} message={message} updatePdt={updatePdt} onPdtImgSubmit={this.onPdtImgSubmit}/>
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
