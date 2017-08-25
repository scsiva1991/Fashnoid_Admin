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

class Dashboard extends Component {

  constructor(props) {
    super( props );
    this.state = {
      limit: 10,
      page : 0
    }
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {
     const result = this.props.actions.setLoggedIn(true);
     if( result.isLoggedIn ) {
       this.props.actions.getSellerList(this.state.page);
     }
  }

  onPrevClick(event) {
      const page = this.state.page - 1;
      this.props.actions.getSellerList(page);
      return this.setState({ page: page });
  }

  onNextClick(event) {
      const page = this.state.page + 1;
      this.props.actions.getSellerList(page);
      return this.setState({ page: page });

  }

  render() {

    const { sellerDetails, isLoading, status, message, isLoggedIn } = this.props

    const { page } = this.state;

    console.log( '-- dashboard --',this.props );

    /*if( !isLoggedIn ) {
      return (<Redirect to="/" />)
    }*/

    return(
      <div>
        <Header />

        <ol className="breadcrumb">
          <li className="active">Dashboard </li>
        </ol>
        { isLoading && <Loader/> }
        <DataTable rows={sellerDetails} page={ page }
        onPrevClick={this.onPrevClick} onNextClick={this.onNextClick}/>
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
