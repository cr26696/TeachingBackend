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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'no-empty' : 'warn',
    'no-empty-function': 'warn',
    'no-extra-parens' : 'warn',
    'no-irregular-whitespace' : 'warn',
    'no-trailing-spaces':'warn',
    'key-spacing':'warn',
    'comma-spacing':'warn',
    'spaced-comment':'warn'
  }
}
