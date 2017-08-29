import axios from 'axios';
const getToken = () => localStorage.getItem('fashnoidSession');

export default class auth {

  static getOauthToken( user ) {
    const url = `https://www.fashnoid.com/oauth/token?grant_type=password&scope=read+write&client_id=sh&client_secret=secret&username=${user.email}&password=${user.password}`;
    return axios.post(url, {
    }).then(response => {
      console.log('-- response ---', response);
      return response;
    }).catch(error => {
      return error;
    });
  }

  static loginUser( user ) {
    const url = `https://www.fashnoid.com/rest/user/login?access_token=${getToken()}`;
    return axios.post(url, {
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
