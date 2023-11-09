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
    // 开发模式
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 空内容允许
    'no-empty': 'warn',
    'no-empty-function': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    // 空格格式
    'no-extra-parens': 'off',
    'space-before-function-paren': 'off',
    'no-irregular-whitespace': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multi-spaces': 'warn',
    'key-spacing': 'warn',
    'spaced-comment': 'warn',
    'space-before-blocks': 'warn',
    // 结尾符号
    semi: 'off',
    quotes: 'off',
    'comma-spacing': 'off',
    'comma-dangle': 'off',
    // 命名规范
    camelcase: "warn",
    'vue/multi-word-component-names': 'warn'
  }
}
