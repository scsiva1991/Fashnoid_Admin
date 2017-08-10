import axios from 'axios';

export default class auth {

  static loginUser( user ) {
    return axios.post('https://reqres.in/api/login', {
      email: user.email,
      password: user.password
    }).then(response => {
      console.log('-- response ---', response);
      return response;
    }).catch(error => {
      return error;
    });
  }
}
