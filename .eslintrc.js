module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
  //开发模式
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //空内容允许
  'no-empty':'warn',
  'no-empty-function':'warn',
  'no-multiple-empty-lines':'warn',
  //空格格式
  'no-extra-parens':'warn',
  'space-before-function-paren':'warn',
  'no-irregular-whitespace':'warn',
  'no-trailing-spaces':'warn',
  'key-spacing':'warn',
  'comma-spacing':'warn',
  'spaced-comment':'warn',
  'space-before-blocks':'warn',
  //命名规范
  'vue/multi-word-component-names':'warn' 
  }
}
