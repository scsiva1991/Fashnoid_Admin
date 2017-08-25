import React, { Component } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import AddSellerDetails from '../components/AddSellerDetails';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/sellerAction';
import Loader from '../components/Loader';
import { Redirect } from 'react-router-dom';
import * as constants from '../constants/messages';

class AddSellerContainer extends Component {

  constructor( props ) {
    super( props );
  }

  onChange = (e) => {
    this.props.actions.updateSellerDetail(e.target.name, e.target.value);
  }

  componentWillMount() {
    const isAuthenticated = () => localStorage.getItem('fashnoidSession') != null ? true : false;
    if( isAuthenticated() ) {
      this.props.actions.setLoggedIn( true );
    }
  }

  onImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.props.actions.updateSellerProfileImage(file, reader.result);
    }

    reader.readAsDataURL(file)
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.sellerDetail);
    this.props.actions.saveSellerDetails(this.props.sellerDetail, this.props.sellerProfileImg.file);
  }

  render() {

    const { sellerDetail, sellerProfileImg, isLoading, status, message, isLoggedIn } = this.props
    console.log(this.props);

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

      <AddSellerDetails sellerDetail={sellerDetail} onImageChange={this.onImageChange}
       sellerImagePreviewUrl={sellerProfileImg.sellerImagePreviewUrl} onChange={this.onChange} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  sellerDetail: state.sellerReducer.sellerDetail,
  isLoading: state.sellerReducer.isLoading,
  status: state.sellerReducer.status,
  message: state.sellerReducer.message,
  isLoggedIn: state.sellerReducer.isLoggedIn,
  sellerProfileImg : state.sellerReducer.sellerProfileImg
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSellerContainer);
