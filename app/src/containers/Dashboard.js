import React, { Component } from 'react';
import DataTable from '../components/DataTable';
import Header from '../components/Header';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/sellerAction';
import Loader from '../components/Loader';
import { Redirect } from 'react-router-dom';
import * as constants from '../constants/messages';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';

class Dashboard extends Component {

  constructor(props) {
    super( props );
    this.state = {
      limit: 10,
      page : 0
    }
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onNameClick = this.onNameClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind( this );
  }

  componentWillReceiveProps(nextProps) {
    console.log('= nextProps =', nextProps);
    if( !nextProps.isLoggedIn && nextProps.message === 'Session Expired') {
      this.props.history.push('/');
    }
  }

  componentWillMount() {
     const result = this.props.actions.setLoggedIn(true);
     let _this = this;
     setTimeout( function() {
       _this.props.actions.getSellerList(_this.state.page);
     }, 100);
  }

  onPrevClick(event) {
      const page = this.state.page - 10;
      this.props.actions.getSellerList(page);
      return this.setState({ page: page });
  }

  onNextClick(event) {
      const page = this.state.page + 10;
      this.props.actions.getSellerList(page);
      return this.setState({ page: page });
  }

  onNameClick( index ) {
    this.props.history.push('/seller/new/'+index);
  }

  onDeleteClick( id, index ) {
    this.props.actions.deleteSeller( id );
  }

  hideAlert = (e) => {
    this.props.actions.clearMessage();
  }

  render() {

    const { sellerDetails, isLoading, status, message, isLoggedIn } = this.props

    const { page } = this.state;

    console.log( '-- dashboard --',this.props );

    return(
      <div>
        <Header />
        <ol className="breadcrumb">
          <li className="active">Dashboard </li>
        </ol>
        { isLoading && <Loader/> }
        <Alert hideAlert={this.hideAlert} status={ status } message={ message }/>
        <DataTable rows={sellerDetails} page={ page }
        onPrevClick={this.onPrevClick} onNextClick={this.onNextClick}
        onNameClick={this.onNameClick} onDeleteClick={this.onDeleteClick}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  sellerDetails: state.sellerReducer.sellerDetails,
  isLoading: state.sellerReducer.isLoading,
  status: state.sellerReducer.status,
  message: state.sellerReducer.message,
  isLoggedIn: state.sellerReducer.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
