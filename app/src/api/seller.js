import axios from 'axios';
import * as token from './token';

export default class seller {

  static saveSellerDetail( sellerDetail, profileImage ) {
    console.log('$$$$$$$$', token.access_token);
    const url = `https://www.fashnoid.com/rest/sellerDetail/create?access_token=${token.access_token}`;
    const formData = new FormData();
    formData.append('sellerDetail',JSON.stringify(sellerDetail));
    formData.append('files', profileImage);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config).then(response => {
      console.log('-- saveSellerDetail response ---', response);
      return response;
    }).catch(error => {
      return error;
    });
  }

  static getSellerList( page ) {
    console.log(' getSellerList ', token.access_token);
    const url = `https://www.fashnoid.com/rest/sellerDetail/getSellerDetails/10/${page}?access_token=${token.access_token}`;
    return axios.get( url ).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }
}
