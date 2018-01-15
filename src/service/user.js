import api from './api';

import {GET_USER} from '../common/interface';

function get_user() {
  return api.get(GET_USER, {});
}

function set_user(user) {
  return api.post(GET_USER, {user: user})
}

export default {
  get_user,
  set_user
}
