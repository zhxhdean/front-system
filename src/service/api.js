// axios 调用服务接口
import axios from 'axios';
import {TIMEOUT, TIMEOUT_MESSAGE, NETWORK_ERROR, NETWORK_ERROR_MESSAGE, METHOD_NOT_ALLOWED} from '../common/errcode';
import login from './login';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 300000;

function setToken (params) {
  let _params =  {token: login.get_token(), ...params};
  return _params;
}


function post(url, params, token = true) {
  const promise = axios
    .post(url, token ? setToken(params): params)
    .then(function (rsp) {
      if (rsp.status === 200 && rsp.statusText === 'OK') {
        return rsp.data;
      }
    })
    .catch(function (err) {
      if (err.message === NETWORK_ERROR_MESSAGE) {
        return {code: NETWORK_ERROR, msg: '接口错误!'}
      }
      if (err.code === TIMEOUT_MESSAGE) {
        return {code: TIMEOUT, msg: '网络超时,请重试!'}
      }
      if (err.response.status === METHOD_NOT_ALLOWED) {
        return {code: METHOD_NOT_ALLOWED, msg: '未允许的方法!'}
      }
      console.log(err);
    });
  return promise
}

function get(url, params, token = true) {
  const promise = axios
    .get(url, {params: (token ? setToken(params): params)})
    .then(function (rsp) {
      if (rsp.status === 200 && rsp.statusText === 'OK') {
        return rsp.data;
      }
    })
    .catch(function (err) {
      if (err.message === NETWORK_ERROR_MESSAGE) {
        return {code: NETWORK_ERROR, msg: '接口错误!'}
      }
      if (err.code === TIMEOUT_MESSAGE) {
        return {code: TIMEOUT, msg: '网络超时,请重试!'}
      }
      if (err.response.status === METHOD_NOT_ALLOWED) {
        return {code: METHOD_NOT_ALLOWED, msg: '未允许的方法!'}
      }
      console.log(err);
    });
  return promise
}

function deletes(url, params, token = true) {
  // const promise = axios.delete(url,)
}

export default {
  post,
  get,
  deletes
}
