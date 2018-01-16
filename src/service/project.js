import ajax from './api';
import {GET_PROJECT} from '../common/interface';
import {EMPTY_UID} from '../common/errcode';
import user from './user';


function get_project(params) {
  const uid = user.get_uid();
  if(!uid) {
    return Promise.resolve({
      code: EMPTY_UID
    })
  }
  const payload = {
    account_id: uid,
    ...params
  };
  return ajax.get(GET_PROJECT, payload);
}

function set_project(params) {
  const uid = user.get_uid();
  if(!uid) {
    return Promise.resolve({
      code: EMPTY_UID
    })
  }
  const payload = {
    project: {
    account_id: uid,
    ...params
  }};
  return ajax.post(GET_PROJECT, payload);
}
export default {
  get_project,
  set_project
}
