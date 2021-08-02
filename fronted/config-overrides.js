/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-11 00:39:08
 */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  // disableEsLint,
  addWebpackPlugin,
  removeModuleScopePlugin
} = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const path = require('path')
const themeConfig = require('./themeConfig')

// react-script@4 重写disableEslint，customize-cra@1.0.0
const disableEsLint = () => (config) => {
  const eslintRules = config.module.rules.filter(
    (r) =>
      r.use && r.use.some((u) => u.options && u.options.useEslintrc !== void 0)
  )
  eslintRules.forEach((rule) => {
    config.module.rules = config.module.rules.filter((r) => r !== rule)
  })
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
  )
  return config
}

module.exports = override(
  disableEsLint(),
  removeModuleScopePlugin(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: themeConfig
    }
  }),
  addWebpackAlias({
    '@style': path.resolve(__dirname, 'src/static/style'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@containers': path.resolve(__dirname, 'src/components/containers'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@routers': path.resolve(__dirname, 'src/routers')
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  (config) => {
    config.devServer = {}
    return config
  }
)
