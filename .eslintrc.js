module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'indent': ['error', 'tab'],
		'no-tabs': 0,
		'comma-dangle': ['error', 'never'],
		'semi': [2, 'never'],
		'line-break-style': 0,
		'global-require': 0,
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }]

	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
