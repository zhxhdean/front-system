// 工具类

const validate = {
  phone: function(str) {
    const reg = /^1[3456789]\d{9}$/;
    if(str.match(reg)) {
      return true;
    }
    return false;
  }
}

export default {
  validate
}