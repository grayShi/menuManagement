/*
 * @Date: 2021-06-10 22:29:45
 * @LastEditTime: 2021-06-12 17:22:30
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  require('./router/admin')(app)
  require('./router/file')(app)
}
