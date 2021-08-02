/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-18 21:30:31
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:7001',
      changeOrigin: true
    })
  )
}
