// axios 调用服务接口
import axios from 'axios';
import {TIMEOUT, TIMEOUT_MESSAGE, NETWORK_ERROR, NETWORK_ERROR_MESSAGE} from '../common/errcode';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 3000;

function post(url, params) {
  const promise = axios
    .post(url, params)
    .then(function (rsp) {
      if (rsp.status === 200 && rsp.statusText === 'OK') {
        return rsp.data;
      }
    })
    .catch(function (err) {
      if(err.message === NETWORK_ERROR_MESSAGE){
        return {code: NETWORK_ERROR, msg: '接口错误!'}
      }
      if (err.code === TIMEOUT_MESSAGE) {
        return {code: TIMEOUT, msg: '网络超时,请重试!'}
      }
      console.log(err);
    });
  return promise
}

export default {
  post
}
