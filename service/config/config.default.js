/*
 * @Date: 2021-06-10 22:29:45
 * @LastEditTime: 2021-06-12 15:58:05
 */
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577439016178_746'

  // add your middleware config here
  config.middleware = ['basicMiddleware']

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // egg-mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456asd',
      // database
      database: 'menu'
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  }

  // egg csrf默认安全机制 关闭
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*'] // 所有
  }

  config.cors = {
    // origin: 'http://localhost:3000',
    origin: '*', // 所有域名可以跨域访问
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' // 允许哪些方法
  }

  config.session = {
    key: 'SESSION_ID',
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
    encrypt: true, // 加密
    sameSite: 'None',
    secure: false,
    renew: true // 最大时间范围内，刷新，自动增加最大时间
  }

  // config.cookies = {
  //   sameSite: 'None',
  //   secure: true
  // }

  return {
    ...config,
    ...userConfig
  }
}
