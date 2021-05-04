module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['airbnb', 'eslint-config-prettier', 'prettier/react'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'jsx-a11y'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.jsx', '.js'],
			},
		],
		'import/prefer-default-export': 'off',
		'react/state-in-constructor': 'off',
		'no-console': 'off',
		'no-param-reassign': 'off',
		'no-underscore-dangle': 'off',
		camelcase: 'off',
		'react/jsx-one-expression-per-line': 'off',
		'global-require': 'off',
		'react/jsx-props-no-spreading': 'off',
		'jsx-a11y/label-has-associated-control': [
			2,
			{
				labelComponents: ['CustomInputLabel'],
				labelAttributes: ['label'],
				controlComponents: ['CustomInput'],
				depth: 3,
			},
		],
		eqeqeq: 'off',
		curly: ['error', 'multi'],
		quotes: ['error', 'single'],
		'no-unused-expressions': 'off',
		'no-alert': 'off',
		'react/prop-types': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'consistent-return': 'off',
		'func-names': ['error', 'never'],
		'no-unused-vars': ['error', { args: 'none' }],
	},
	settings: {
		'import/resolver': {
			'babel-plugin-root-import': {
				rootPathSuffix: 'src',
			},
		},
	},
};
