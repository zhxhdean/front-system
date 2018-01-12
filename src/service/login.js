import ajax from './api';
import {LOGIN, VALID_TOKEN} from '../common/interface';
import {SUCCESS, INCORRECT_PASSWORD, TOKEN_IMMINENT_TIMEOUT} from '../common/errcode';
import storage from '../common/localstorage';

// 登录
function login(username, password) {
  return ajax
    .post(LOGIN, {
    username: username,
    password: password
  })
    .then(rsp => {
      if (rsp.code === SUCCESS) {
        storage.set('token', rsp.token);
        rsp.msg = '登录成功!';
      } else if (rsp.code === INCORRECT_PASSWORD) {
        rsp.msg = '密码错误!';
      }
      return rsp;
    });
}

// 验证token
function valid_token() {
  const token = get_token();
  if (token === '') {
    return new Promise((resolve,reject) =>{
      resolve(false)
    });
  }
  return ajax
    .post(VALID_TOKEN, {token: token})
    .then(rsp => {
      if (rsp.code === TOKEN_IMMINENT_TIMEOUT || rsp.code === SUCCESS) {
        return true;
      }
      return false;
    })
}

// 获取token
function get_token() {
  return storage.get('token') || '';
}

export default {
  login,
  valid_token,
  get_token
}
