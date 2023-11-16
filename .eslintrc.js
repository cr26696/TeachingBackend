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
		'no-undef': 'warn',
		'prefer-const': 'warn',
		'no-useless-return': 'warn',
		// 空格格式
		indent: ['off','tab'],
		'no-tabs': 'off',
		'no-extra-parens': 'off',
		'space-before-function-paren': 'off',
		'no-irregular-whitespace': 'warn',
		'no-trailing-spaces': 'off',
		'no-multi-spaces': 'warn',
		'key-spacing': 'off',
		'spaced-comment': 'off',
		'space-before-blocks': 'warn',
		'object-curly-spacing': 'off',
		'padded-blocks': 'off',
		'space-in-parens': 'warn',
		'arrow-spacing': 'warn',
		'keyword-spacing': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
		'semi-spacing': 'warn',
		'block-spacing': 'warn',
		// 结尾符号
		semi: 'off',
		quotes: 'off',
		'comma-spacing': 'off',
		'comma-dangle': 'off',
		'object-property-newline': 'off',
		'object-curly-newline': 'off',
		'brace-style': 'off',
		// 命名规范
		camelcase: "warn",
		'vue/multi-word-component-names': 'warn',
		'quote-props': 'warn'
	}
}
