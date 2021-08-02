module.exports = {
  // 环境，这里可以设置环来做区别判断
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  // 使用的扩展库
  extends: ['airbnb'],
  // // 解析器用于解析代码
  // parser: 'babel-eslint',
  // 解析器配置
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  // 可以全局使用变量
  globals: {
    Babel: true,
    React: true
  },
  // 第三方插件
  plugins: ['react'],
  // 规则配置
  rules: {
    'linebreak-style': [0, 'error', 'windows'], // 换行风格
    quotes: ['error', 'single'],
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    semi: ['error', 'never'],
    // 大括号不强制分行
    'object-curly-newline': 0,
    // {} 内部强制有空格
    'object-curly-spacing': ['error', 'always'],
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    camelcase: 0,
    // 对象中最后一行不使用逗号
    'comma-dangle': ['error', 'never'],
    // 禁止缩进错误
    indent: 0,
    'react/no-danger': 0,
    // 关闭不允许使用 no-tabs
    'no-tabs': 'off',
    'no-console': 1,
    // 设置不冲突 underscore 库
    'no-underscore-dangle': 0,
    // 箭头函数直接返回的时候不需要 大括号 {}
    'arrow-body-style': [2, 'as-needed'],
    'react/jsx-curly-newline': 0,
    'no-multi-spaces': 2,
    'no-confusing-arrow': 0,
    'function-paren-newline': 0,
    // 设置是否可以重新改变参数的值
    'no-param-reassign': 0,
    // 允许使用 for in
    'no-restricted-syntax': 0,
    'implicit-arrow-linebreak': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'guard-for-in': 0,
    // 不需要每次都有返回
    'consistent-return': 0,
    // 允许使用 arguments
    'prefer-rest-params': 0,
    // 允许返回 await
    'no-return-await': 0,
    // 不必在使用前定义 函数
    'no-use-before-define': 0,
    // 允许代码后面空白
    'no-trailing-spaces': 0,
    // 允许在 for 循环的最后一个表达式中使用 ++ 和 --
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // 有一些 event 的时候，不需要 role 属性，不需要其他解释
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    // 类成员之间空行问题
    'lines-between-class-members': 0,
    'import/prefer-default-export': 0,
    // 不区分是否在 dependencies
    'import/no-extraneous-dependencies': 0,
    // 引用时候根据根目录基础
    'import/no-unresolved': 0,

    // 允许在 .js 和 .jsx 文件中使用  jsx
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // jsx > 紧跟着属性
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    // 不区分是否是 无状态组件
    'react/prefer-stateless-function': 0,
    'react/jsx-wrap-multilines': 0,
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    // 换行符位置
    'operator-linebreak': 0,
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/media-has-caption': 0,
    'react/forbid-prop-types': [0],
    'jsx-a11y/control-has-associated-label': 0,
    'no-script-url': 0,
    'react/no-array-index-key': 0
  }
}
