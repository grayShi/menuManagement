/*
 * @Date: 2021-06-10 22:29:45
 * @LastEditTime: 2021-06-12 15:28:26
 */
exports.success = (obj) => {
  return {
    success: true,
    data: obj
  }
}

exports.fail = (str) => {
  return {
    success: false,
    message: typeof str === 'object' ? JSON.stringify(str) : str
  }
}

exports.notLogin = () => {
  return {
    notLogin: true,
    message: '由于长时间未操作页面，请重新登录'
  }
}
