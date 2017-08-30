import axios from 'axios';

const getToken = () => localStorage.getItem('fashnoidSession');

export default class seller {

  static saveSellerDetail( sellerDetail, profileImage ) {
    const url = `https://www.fashnoid.com/rest/sellerDetail/create?access_token=${getToken()}`;
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

  static updateSellerDetail( sellerDetail, profileImage ) {
    const url = `https://www.fashnoid.com/rest/sellerDetail/update?access_token=${getToken()}`;
    const formData = new FormData();
    formData.append('sellerDetail',JSON.stringify(sellerDetail));
    if( profileImage != null ) {
      formData.append('files', profileImage);
    }

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

  static createSellerProduct( sellerDetailId, imageFile ) {
    const url = `https://www.fashnoid.com/rest/sellerDetail/createSellerProduct?access_token=${getToken()}`;
    const formData = new FormData();
    formData.append('sellerDetailId',sellerDetailId);
    formData.append('files', imageFile);
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
    console.log(' getSellerList ', getToken());
    const url = `https://www.fashnoid.com/rest/sellerDetail/getSellerDetails/10/${page}?access_token=${getToken()}`;
    return axios.get( url ).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static deleteSeller( id ) {
    const url = `https://www.fashnoid.com/rest/sellerDetail/delete/${id}?access_token=${getToken()}`;
    return axios.post( url ).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }
}
