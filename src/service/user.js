
function get_user() {
  return Promise.resolve({
    userName: '张三',
    email: 'zhxhdean@hotmail.com',
    phone: '13900001111',
    company: '本来生活',
    job: 'FE'
  })
}

export default {
  get_user
}
