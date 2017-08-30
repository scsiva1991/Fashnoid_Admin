import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput';
import { Link } from 'react-router-dom';

export default class DataTable extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      filteredRows: [],
      searchText: ''
    }
  }

  render() {

    let columns = ['Seller Name', 'Seller Dp', 'Gender', 'Product Categories',
                   'Shop Link', 'Shop Category', 'Phone', 'Email', 'Address', 'Action'];
    let columnsView = columns.map(function(column, index){
      return (<th key={index} >{column}</th>);
    });


    let { rows, page, onNextClick, onPrevClick, onNameClick, onDeleteClick } = this.props;

    let rowsView = rows.map( function( row, index ) {
      return (
        <tr key={index}>
          <td><a className="link" onClick={() => onNameClick(index)}>{row.sellerName}</a></td>
          <td>{row.sellerProfile != '' ? <img src={row.sellerProfile} className="seller-profile"/> : <i className="fa fa-user"/> }</td>
          <td>{row.genderCategory}</td>
          <td>{row.productCategory}</td>
          <td><a href={row.shopURL} target="_blank">{row.shopURL}</a></td>
          <td>{row.storeCategory}</td>
          <td>{row.phone}</td>
          <td>{row.email}</td>
          <td>{row.address}</td>
          <td><span onClick={() => onDeleteClick(row.externalId, index)}><i className="fa fa-trash" aria-hidden="true"></i></span></td>
        </tr>
      );
    });

    return (
      <div className="table-wrapper">
       <div className="col-xs-4">

       </div>
       <div className="col-xs-4"></div>
       <div className="col-xs-4 ">
          <Link to="/seller/new/-1" className="btn btn-primary pull-right btn-add"><i className="fa fa-plus btn-add-icon"/>Add</Link>
       </div>

       <table>
         <thead>
           <tr>
             {columnsView}
           </tr>
         </thead>
         <tbody>
            { rowsView }
         </tbody>
       </table>

       <div className="col-xs-4">
         <button type="button" className="btn btn-primary mg-t-10" aria-label="Left Align"
          disabled={page == 0} onClick={onPrevClick}>
            <span className="fa fa-long-arrow-left" aria-hidden="true"></span> Prev
         </button>
       </div>
       <div className="col-xs-4"></div>
       <div className="col-xs-4 ">
       <button type="button" className="btn btn-primary pull-right mg-t-10"
       aria-label="Left Align" disabled={rows.length == 0} onClick={onNextClick}>
          <span className="fa fa-long-arrow-right" aria-hidden="true"></span> Next
       </button>
       </div>
     </div>
    )
  }
}
