import ajax from './api';
import {LOGIN} from '../common/interface';
import {SUCCESS, INCORRECT_PASSWORD} from '../common/errcode';
function login(username, password) {
  return ajax.post(LOGIN, {username: username, password: password}).then(
    rsp => {
      if (rsp.code === SUCCESS) {
        rsp.msg = '登录成功!';
      } else if (rsp.code === INCORRECT_PASSWORD) {
        rsp.msg = '密码错误!';
      }
      return rsp;
    }
  );
}

export default {
  login
}
